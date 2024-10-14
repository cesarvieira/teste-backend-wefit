import * as cpf from '@fnando/cpf';
import * as cnpj from '@fnando/cnpj';
import Joi from "joi";

export const validator = (joi: Joi.Root) => ({
  type: 'string',
  base: joi.string(),
  messages: {
    'string.cpf': 'CPF inválido',
    'string.cnpj': 'CNPJ inválido'
  },
  rules: {
    cpf: {
      validate(value: string, helpers: Joi.ExternalHelpers) {
        if (!cpf.isValid(value)) {
          return helpers.error('string.cpf');
        }

        return value
      }
    },
    cnpj: {
      validate(value: string, helpers: Joi.ExternalHelpers) {
        if (!cnpj.isValid(value)) {
          return helpers.error('string.cnpj');
        }

        return value
      }
    }
  }
});

export default validator;
