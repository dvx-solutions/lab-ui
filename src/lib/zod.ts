import { jsonStringifyReplacer, z } from 'zod';

export const customErrorMap: z.ZodErrorMap = (issue, ctx) => {
  let message = '';

  switch (issue.code) {
    case z.ZodIssueCode.invalid_type:
      if (
        issue.received === z.ZodParsedType.undefined ||
        issue.received === z.ZodParsedType.nan ||
        (issue.received === z.ZodParsedType.string &&
          issue.expected === z.ZodParsedType.number) ||
        (issue.received === z.ZodParsedType.string &&
          issue.expected === z.ZodParsedType.date)
      ) {
        message = 'Campo obrigatório';
      } else {
        message = `Esperado ${issue.expected}, recebido ${issue.received}`;
      }
      break;

    case z.ZodIssueCode.invalid_literal:
      message = `Valor inválido, esperado ${JSON.stringify(
        issue.expected,
        jsonStringifyReplacer
      )}`;
      break;

    case z.ZodIssueCode.invalid_date:
      message = `Data inválida`;
      break;

    case z.ZodIssueCode.invalid_string:
      if (typeof issue.validation === 'object') {
        if ('startsWith' in issue.validation) {
          message = `Valor inválido: must start with "${issue.validation.startsWith}"`;
        } else if ('endsWith' in issue.validation) {
          message = `Valor inválido: must end with "${issue.validation.endsWith}"`;
        }
      } else if (issue.validation !== 'regex') {
        message = `Invalid ${issue.validation}`;
      } else {
        message = 'Valor inválido';
      }
      break;

    case z.ZodIssueCode.too_small:
      if (issue.type === 'array')
        message = `Array must contain ${
          issue.inclusive ? `at least` : `more than`
        } ${issue.minimum} element(s)`;
      else if (issue.type === 'string')
        message = `Campo deve conter ${
          issue.inclusive ? `no mínimo` : `over`
        } ${issue.minimum} caractere(s)`;
      else if (issue.type === 'number')
        message = `O número deve ser maior que ${
          issue.inclusive ? `ou igual à ` : ``
        }${issue.minimum}`;
      else if (issue.type === 'date')
        message = `A data deve ser maior que ${
          issue.inclusive ? `ou igual à ` : ``
        }${new Date(issue.minimum)}`;
      else message = 'Valor inválido';
      break;

    case z.ZodIssueCode.too_big:
      if (issue.type === 'array')
        message = `Array must contain ${
          issue.inclusive ? `at most` : `less than`
        } ${issue.maximum} element(s)`;
      else if (issue.type === 'string')
        message = `Campo deve conter ${issue.inclusive ? `at most` : `under`} ${
          issue.maximum
        } character(s)`;
      else if (issue.type === 'number')
        message = `O número deve ser menor que ${
          issue.inclusive ? `ou igual à ` : ``
        }${issue.maximum}`;
      else if (issue.type === 'date')
        message = `A data deve ser menor que ${
          issue.inclusive ? `ou igual à ` : ``
        }${new Date(issue.maximum)}`;
      else message = 'Valor inválido';
      break;

    case z.ZodIssueCode.custom:
      message = `Valor inválido`;
      break;

    case z.ZodIssueCode.invalid_intersection_types:
      message = `Intersection results could not be merged`;
      break;

    case z.ZodIssueCode.not_multiple_of:
      message = `Number must be a multiple of ${issue.multipleOf}`;
      break;

    default:
      message = ctx.defaultError;
  }

  return { message };
};
