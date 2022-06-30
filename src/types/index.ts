export type TSelectOption = {
  value: string | number;
  text: string;
};

export type TAdvancedSearch<T = string> = {
  fields: T[];
  keyword: string;
}[];

export interface IBodyRequest<T = string> {
  advancedSearch?: TAdvancedSearch<T>;
  keyword?: string;
  pageNumber: number;
  pageSize: number;
  orderBy?: T[];
  type?: "get";
}

export interface IAPIResponse<T> {
  currentPage: number;
  data: T;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  pageSize: number;
  totalCount: number;
  totalPages: number;
}

export interface IJWTDecoded {
  fullName: string;
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress": string;
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier": string;
  image_url: string;
}

export interface ILoggedUser {
  token: string;
  refreshToken: string;
  refreshTokenExpiryTime: string;
}

export interface ISignInCredentials {
  email: string;
  password: string;
  tenant: string;
}

export * from "./models";
