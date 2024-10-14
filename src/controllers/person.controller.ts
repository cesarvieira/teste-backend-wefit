import { Request, Response } from "express";
import Joi from "joi";
import cpfCnpjValidation from "../utils/cpfCnpjValidation.util";
import * as cpf from '@fnando/cpf';
import * as cnpj from '@fnando/cnpj';
import { Person } from "../types/person.type";
import personModel from "../models/person.model";

export interface PersonBody extends Person {
  email_confirmation: string;
  acceptance: boolean;
}

export interface PersonRequest extends Request {
  body: PersonBody;
}

const joi = Joi.extend(cpfCnpjValidation);

async function get(_req: Request, res: Response) {
  return res.send("not implemented");
}

async function create(req: PersonRequest, res: Response) {
  const data = req.body;

  const schema = joi.object({
    personType: joi.string().valid("PF", "PJ").required(),
    document: joi.string().when("personType", {
      is: "PF",
      then: joi.string().cpf().required(),
      otherwise: joi.string().cnpj().required(),
    }),
    doc_responsible: joi.string().when("personType", {
      is: "PJ",
      then: joi.string().cpf().required(),
      otherwise: joi.optional(),
    }),
    name: joi.string().required(),
    cellphone: joi.string().optional(),
    phone: joi.string().optional(),
    email: joi.string().email().trim().lowercase().required(),
    email_confirmation: joi.string().email().trim().lowercase().equal(joi.ref("email")).required(),
    address_zip: joi.string().required(),
    address_street: joi.string().required(),
    address_number: joi.string().required(),
    address_complement: joi.string().optional(),
    address_neighborhood: joi.string().required(),
    address_city: joi.string().required(),
    address_state: joi.string().required(),
    acceptance: joi.boolean().valid(true).required(),
  });

  const { error } = schema.validate(data);

  if (error) {
    return res.status(400).send(error.details);
  }

  const newPerson: Person = {
    personType: data.personType,
    document: cnpj.strip(data.document),
    doc_responsible: data.doc_responsible ? cpf.strip(data.doc_responsible) : undefined,
    name: data.name,
    cellphone: data.cellphone?.replace(/\D/g, ""),
    phone: data.phone?.replace(/\D/g, ""),
    email: data.email,
    address_zip: data.address_zip?.replace(/\D/g, ""),
    address_street: data.address_street,
    address_number: data.address_number,
    address_complement: data.address_complement,
    address_neighborhood: data.address_neighborhood,
    address_city: data.address_city,
    address_state: data.address_state,
  };

  try {
    await personModel.create(newPerson);
  } catch (e) {
    const error = e as Error & { code: string };
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(400).send({
        message: "Document already exists",
        success: false,
      });
    }

    console.error('Error on create person', error);

    return res.status(500).send({
      message: "Error on create person",
      success: false,
    });
  }
  
  return res.send({
    message: "Person created successfully",
    success: true,
  });
}

async function update(_req: Request, res: Response) {
  return res.send("not implemented");
}

async function remove(_req: Request, res: Response) {
  return res.send("not implemented");
}

export default {
  get,
  create,
  update,
  remove,
};
