import 'dotenv/config';
import {afterAll, beforeAll, describe, expect, test} from '@jest/globals';
import personController, { PersonBody, PersonRequest } from '../src/controllers/person.controller';
import { Response } from 'express';
import httpMocks from 'node-mocks-http';
import dbService from '../src/services/db.service';

const masterData: PersonBody = {
  personType: "PF",
  document: "093.171.090-12",
  // doc_responsible: "",
  name: "Fulano de Tal",
  cellphone: "12345678909",
  phone: "(11) 99999-1111",
  email: "fulano@test.NET",
  email_confirmation: "fulano@test.net",
  address_zip: "12345678",
  address_street: "Rua Tal",
  address_number: "123",
  address_complement: "Apto 123",
  address_neighborhood: "Bairro Tal",
  address_city: "São Paulo",
  address_state: "SP",
  acceptance: true,
};

describe('Person Route', () => {
  beforeAll(async () => {
    await dbService.startTransaction();
  });

  afterAll(async () => {
    await dbService.rollback();
    await dbService.close();
  });

  test('should create a new person', async () => {
    const req = httpMocks.createRequest<PersonRequest>({
      method: 'POST',
      url: '/person',
      body: masterData,
    });

    const res = httpMocks.createResponse<Response>();

    await personController.create(req, res);

    expect(res.statusCode).toBe(200);
  });

  test('should error on create a person with invalid data', async () => {
    let req = httpMocks.createRequest<PersonRequest>({
      method: 'POST',
      url: '/person',
      body: {
        ...masterData,
        email: 'invalid-email',
      },
    });

    const res = httpMocks.createResponse<Response>();

    await personController.create(req, res);

    expect(res.statusCode).toBe(400);

    req = httpMocks.createRequest<PersonRequest>({
      method: 'POST',
      url: '/person',
      body: {
        ...masterData,
        personType: 'invalid-type',
      },
    });

    await personController.create(req, res);

    expect(res.statusCode).toBe(400);

    req = httpMocks.createRequest<PersonRequest>({
      method: 'POST',
      url: '/person',
      body: {
        ...masterData,
        document: '093.171.090-11',
      },
    });

    await personController.create(req, res);

    expect(res.statusCode).toBe(400);
  });
});
