// import { IAPIPaginatedResponse } from '@dvx-solutions/lab-ui';
// import { api } from 'lib/api';
// import { getApiDataAsSelectOptions } from 'lib/getApiDataAsSelectOptions';
// import { useQuery } from 'react-query';

// export interface ICodigoTributacaoMunicipio {
//   aliquota: number;
//   ativo: boolean;
//   codigo: string;
//   codigoServicoMunicipioId: number;
//   descricao: string;
//   id: number;
//   nome: string;
// }

// export const useCodigoTributacaoMunicipios = () =>
//   useQuery(['codigo-tributacao-municipios'], () =>
//     api
//       .post<IAPIPaginatedResponse<ICodigoTributacaoMunicipio[]>>(
//         'tabelas/codigo-tributacao-municipios/listar',
//         {
//           pageSize: 100000,
//         }
//       )
//       .then(({ data }) => {
//         return {
//           data: data.data,
//           options: getApiDataAsSelectOptions(data.data),
//         };
//       })
//   );
import { useQuery } from 'react-query';

import { getApiDataAsSelectOptions } from '+/lib/getDataAsSelectOptions';
import { IAPIPaginatedResponse, IQueryByIdParams } from '+/types';

export interface ICodigoTributacaoMunicipio {
  aliquota: number;
  ativo: boolean;
  codigo: string;
  codigoServicoMunicipioId: number;
  descricao: string;
  id: number;
  nome: string;
}

export const useCodigoTributacaoMunicipios = ({
  axiosInstance,
}: IQueryByIdParams) =>
  useQuery(['codigo-tributacao-municipios'], () =>
    axiosInstance
      .post<IAPIPaginatedResponse<ICodigoTributacaoMunicipio[]>>(
        'tabelas/codigo-tributacao-municipios/listar',
        {
          pageSize: 100000,
        }
      )
      .then(({ data }) => {
        return {
          data: data.data,
          options: getApiDataAsSelectOptions(data.data),
        };
      })
  );
