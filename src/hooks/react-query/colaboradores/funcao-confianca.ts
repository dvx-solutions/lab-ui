import { AxiosInstance } from 'axios';
import { useQuery } from 'react-query';

import { convertAdvancedSearchToReactQueryKeys } from '+/lib';
import { TSelectOption } from '+/types';
import { IAPIPaginatedResponse, IBodyRequest } from '+/types/axios';
import { IFuncaoConfianca } from '+/types/models/colaboradores';

interface IUseFuncaoConfianca {
  advancedSearch?: IBodyRequest<keyof IFuncaoConfianca>['advancedSearch'];
  API_Instance: AxiosInstance;
  empresaId: number;
  pageNumber?: number;
  pageSize?: number;
}

export const useFuncaoConfianca = ({
  advancedSearch,
  API_Instance,
  empresaId,
  pageNumber = 1,
  pageSize = 25,
}: IUseFuncaoConfianca) => {
  return useQuery(
    [
      'funcao-confianca',
      `empresa-${empresaId}`,
      convertAdvancedSearchToReactQueryKeys(advancedSearch),
    ],
    async () => {
      const { data } = await API_Instance.post<
        IAPIPaginatedResponse<IFuncaoConfianca[]>
      >('colaboradores/funcoes-confiancas/listar', {
        advancedSearch,
        empresaId,
        pageNumber,
        pageSize,
      } as IBodyRequest<keyof IFuncaoConfianca>);

      const options: TSelectOption[] = data.data.map(x => ({
        text: x.nome,
        value: x.id,
      }));

      return { ...data, options };
    }
  );
};
