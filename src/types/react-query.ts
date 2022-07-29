import { AxiosInstance } from 'axios';

import { IBodyRequest } from '+/types/axios';

export interface IQueryParams<T> {
  advancedSearch?: IBodyRequest<T>['advancedSearch'];
  API_Instance: AxiosInstance;
  keyword?: string;
  orderBy?: T[];
  pageNumber?: IBodyRequest['pageNumber'];
  pageSize?: IBodyRequest['pageSize'];
}
