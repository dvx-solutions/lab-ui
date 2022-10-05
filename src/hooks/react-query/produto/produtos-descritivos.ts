import { useQuery } from 'react-query';

import {
  IAPIPaginatedResponse,
  INaturezasProdutosTiposDescritivos,
  IQueryByIdParams,
} from '+/types';

export const useProdutosDescritivos = ({
  axiosInstance,
  id,
}: IQueryByIdParams) =>
  useQuery(
    ['produtos-descritivos', `produtoId-${id}`],
    () =>
      axiosInstance
        .post<IAPIPaginatedResponse<INaturezasProdutosTiposDescritivos[]>>(
          'produtos/produtos-descritivos/listar',
          {
            pageSize: 100000,
            id,
          }
        )
        .then(({ data }) => data.data.filter(x => x.id === id)),
    { enabled: id > 0 }
  );
