import { AxiosInstance } from 'axios';
import { useQuery } from 'react-query';

import { TSelectOption } from '+/types';
import { IAPIPaginatedResponse, IBodyRequest } from '+/types/axios';
import { IEmpresa } from '+/types/models/empresarial';

interface IUseEmpresasProps {
  API_Instance: AxiosInstance;
}

export const useEmpresas = ({ API_Instance }: IUseEmpresasProps) =>
  useQuery(
    'empresas',
    async () => {
      const payload = {
        pageNumber: 1,
        pageSize: 9999,
      } as IBodyRequest;

      const { data } = await API_Instance.post<
        IAPIPaginatedResponse<IEmpresa[]>
      >('empresarial/empresas/listar', payload);

      const options: TSelectOption[] = data.data.map(x => ({
        text: `${x.codigo} - ${x.nome}`,
        value: x.id,
      }));

      return { ...data, options };
    },
    {
      refetchIntervalInBackground: true,
      refetchOnWindowFocus: true,
      keepPreviousData: true,
    }
  );
