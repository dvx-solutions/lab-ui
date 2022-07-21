import { AxiosInstance } from 'axios';
import { useQuery } from 'react-query';

import { convertAdvancedSearchToReactQueryKeys } from '+/lib';
import { INaturezaOrcamento, TSelectOption } from '+/types';
import { IAPIPaginatedResponse, IBodyRequest } from '+/types/axios';

interface IUseNaturezaOrcamento {
  advancedSearch?: IBodyRequest<keyof INaturezaOrcamento>['advancedSearch'];
  API_Instance: AxiosInstance;
  pageNumber?: IBodyRequest['pageNumber'];
  pageSize?: IBodyRequest['pageSize'];
}

export const useNaturezaOrcamento = async ({
  API_Instance,
  advancedSearch,
  pageNumber = 1,
  pageSize = 25,
}: IUseNaturezaOrcamento) => {
  return useQuery(
    [
      'naturezas-orcamentos',
      convertAdvancedSearchToReactQueryKeys(advancedSearch),
      `page-${pageNumber}-size-${pageSize}`,
    ],
    async () => {
      const payload: IBodyRequest<keyof INaturezaOrcamento> = {
        advancedSearch,
        pageNumber,
        pageSize,
      };

      const { data } = await API_Instance.post<
        IAPIPaginatedResponse<INaturezaOrcamento[]>
      >('orcamentos/naturezas-orcamentos/listar', payload);

      const options: TSelectOption[] = data.data.map(x => ({
        text: `${x.codigo} - ${x.nome}`,
        value: x.id,
      }));

      return { ...data, options };
    }
  );
};
