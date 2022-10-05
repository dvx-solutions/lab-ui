import { useQuery } from 'react-query';

import {
  convertAdvancedSearchToReactQueryKeys,
  getReactQueryPaginationKeys,
} from '+/lib';
import { getDataAsSelectOptions } from '+/lib/getDataAsSelectOptions';
import {
  IAPIPaginatedResponse,
  IAPIResponse,
  IContaContabil,
  IQueryParams,
} from '+/types';

interface UseContasContabeisPorIdProps
  extends IQueryParams<keyof IContaContabil> {
  id: number;
}

export const useContasContabeis = ({
  API_Instance,
  advancedSearch,
  keyword,
  orderBy,
  pageNumber = 1,
  pageSize = 25,
}: IQueryParams<keyof IContaContabil>) => {
  return useQuery(
    [
      // `planoContaContabilId-${appConfig?.empresaAnoFiscal.planoContaContabilId}`,
      'contas-contabeis',
      convertAdvancedSearchToReactQueryKeys(advancedSearch),
      getReactQueryPaginationKeys(pageNumber, pageSize),
    ],
    async () => {
      const payload = {
        advancedSearch,
        keyword,
        orderBy,
        pageNumber,
        pageSize,
      };

      const { data } = await API_Instance.post<
        IAPIPaginatedResponse<IContaContabil[]>
      >('financas/contas-contabeis/listar', payload);

      const options = getDataAsSelectOptions(data);

      return { ...data, options };
    }
  );
};

export const useContasContabeisPorId = ({
  API_Instance,
  id,
}: UseContasContabeisPorIdProps) => {
  return useQuery(['contas-contabeis', `id-${id}`], async () => {
    const { data } = await API_Instance.get<IAPIResponse<IContaContabil>>(
      `financas/contas-fluxos/${id}`
    );

    return data;
  });
};

//   api
//     .post<IAPIPaginatedResponse<IContaContabil[]>>(
//       'empresarial/contas-contabeis/listar',
//       { pageSize: 100000 }
//     )
//     .then(({ data }) => {
//       data.data = data.data.filter(
//         x =>
//           x.planoId ===
//           Number(appConfig?.empresaAnoFiscal.planoContaContabilId)
//       );

//       return {
//         data: data.data,
//         options: getApiDataAsSelectOptions(data.data),
//       };
//     }),
// {
//   enabled: !!appConfig?.empresaAnoFiscal.planoContaContabilId,
