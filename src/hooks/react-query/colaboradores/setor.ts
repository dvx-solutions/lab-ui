import { AxiosInstance } from 'axios';
import { useQuery } from 'react-query';

import {
  convertAdvancedSearchToReactQueryKeys,
  getReactQueryPaginationKeys,
} from '+/lib';
import {
  IAPIPaginatedResponse,
  IBodyRequest,
  ISetor,
  TSelectOption,
} from '+/types';

interface IProps {
  advancedSearch?: IBodyRequest<keyof ISetor>['advancedSearch'];
  API_Instance: AxiosInstance;
  empresaId: number;
  pageNumber?: IBodyRequest['pageNumber'];
  pageSize?: IBodyRequest['pageSize'];
}

export const useSetor = ({
  advancedSearch,
  API_Instance,
  empresaId,
  pageNumber = 1,
  pageSize = 25,
}: IProps) => {
  return useQuery(
    [
      'setor',
      `empresaId-${empresaId}`,
      convertAdvancedSearchToReactQueryKeys(advancedSearch),
      getReactQueryPaginationKeys(pageNumber, pageSize),
    ],
    async () => {
      const payload: IBodyRequest & { empresaId: number } = {
        advancedSearch,
        empresaId,
        pageNumber,
        pageSize,
      };

      const { data } = await API_Instance.post<IAPIPaginatedResponse<ISetor[]>>(
        'colaboradores/setores/listar',
        payload
      );

      const options: TSelectOption[] = data.data.map(x => ({
        text: `${x.codigo} - ${x.nome}`,
        value: x.id,
      }));

      return { ...data, options };
    }
  );
};
