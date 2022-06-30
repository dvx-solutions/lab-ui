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
