import { useQuery } from 'react-query';
import { AxiosInstance } from 'axios';

import { convertAdvancedSearchToReactQueryKeys } from '+/lib/formatters';
import { TSelectOption } from '+/types';
import { IAPIPaginatedResponse, IBodyRequest } from '+/types/axios';
import { IPlano } from '+/types/models/empresarial';

export interface IUsePlano {
  advancedSearch?: IBodyRequest<keyof IPlano>['advancedSearch'];
  API_Instance: AxiosInstance;
  pageNumber?: IBodyRequest['pageNumber'];
  pageSize?: IBodyRequest['pageSize'];
  tipoPlano?: IPlano['tipoPlano'];
}

export const usePlanos = ({
  advancedSearch,
  API_Instance,
  pageNumber = 1,
  pageSize = 25,
  tipoPlano,
}: IUsePlano) => {
  return useQuery(
    [
      'planos',
      `tipo-plano-${tipoPlano}`,
      convertAdvancedSearchToReactQueryKeys(advancedSearch),
    ],
    async () => {
      const { data } = await API_Instance.post<IAPIPaginatedResponse<IPlano[]>>(
        'empresarial/planos/listar',
        {
          advancedSearch,
          pageNumber,
          pageSize,
          tipoPlano,
        } as IBodyRequest<keyof IPlano>
      );

      const options: TSelectOption[] = data.data.map(x => ({
        text: `${x.nome}`,
        value: x.id,
      }));

      return { ...data, options };
    }
  );
};
