import { IEmpresaAnoFiscal } from './models/empresarial';

export * from './axios';
export * from './enums';
export * from './models-enums';
export * from './models';
export * from './react-query';

export type TSelectOption = {
  value: string | number;
  text: string;
};

export interface IJWTDecoded {
  fullName: string;
  'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress': string;
  'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier': string;
  image_url: string;
}

export interface ILoggedUser extends IJWTDecoded {
  token: string;
  refreshToken: string;
  refreshTokenExpiryTime: string;
}

export interface ISignInCredentials {
  email: string;
  password: string;
  tenant: string;
}

export type TAppConfig = {
  empresaId: number;
  empresaAnoFiscal: IEmpresaAnoFiscal;
};

export type TDTOSimples = {
  codigo: string;
  id: number;
  nome: string;
};

export type TabelaBasicaType = {
  ativo: boolean;
  codigo: string;
  id: number;
  inicioValidade: string;
  nome: string;
  terminoValidade: string;
};
