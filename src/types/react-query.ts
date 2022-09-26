import { QueryClient, UseMutationOptions } from 'react-query';
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

export interface IMutationParams<T> extends UseMutationOptions {
  axiosInstance: AxiosInstance;
  queryClient: QueryClient;
  values: T;
}
