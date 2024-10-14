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
      validate(value: any, helpers: any, _args: any, _options: any) {
        if (!cpf.isValid(value)) {
          return helpers.error('string.cpf');
        }

        return value
      }
    },
    cnpj: {
      validate(value: any, helpers: any, _args: any, _options: any) {
        if (!cnpj.isValid(value)) {
          return helpers.error('string.cnpj');
        }

        return value
      }
    }
  }
});

export default validator;
