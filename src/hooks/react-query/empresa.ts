import { useQuery } from 'react-query';
import { AxiosInstance } from 'axios';

import { IAPIPaginatedResponse, IBodyRequest } from '+/types/axios';
import { IEmpresa } from '+/types/models/empresarial';

interface IUseEmpresasProps {
  API_Instance: AxiosInstance;
}

export const useEmpresas = ({ API_Instance }: IUseEmpresasProps) =>
  useQuery(
    'empresas',
    async () => {
      const { data } = await API_Instance.post<
        IAPIPaginatedResponse<IEmpresa[]>
      >('empresarial/empresas/listar', {
        pageNumber: 1,
        pageSize: 9999,
      } as IBodyRequest);

      return data;
    },
    {
      refetchIntervalInBackground: true,
      refetchOnWindowFocus: true,
      keepPreviousData: true,
    }
  );
