import axios from 'axios';
import decode from 'jwt-decode';
import { setCookie } from 'nookies';

import { getRequestErrorToast } from '+/lib/getRequestErrorToast';
import { IJWTDecoded, ILoggedUser, ISignInCredentials } from '+/types';

interface GetTenantValidityProps {
  apiEnviroment: string;
  isProductionEnvironment: boolean;
  tenant: string;
}

interface SignInOnAPIProps {
  credentials: ISignInCredentials;
  tenant: string;
  url: string;
}

export const getTenantValidity = async ({
  apiEnviroment,
  isProductionEnvironment,
  tenant,
}: GetTenantValidityProps) => {
  return axios
    .get<{
      urlApi: string;
    }>(`https://license.orquestraerp.com/Tenants/${apiEnviroment}/${tenant}`)
    .then(({ data: { urlApi } }) => {
      setCookie(null, '@dvx-security:api-url', urlApi, {
        path: '/',
        domain: isProductionEnvironment && '.orquestraerp.com',
      });

      return urlApi;
    })
    .catch(getRequestErrorToast);
};

export const signInOnAPI = async ({
  credentials,
  tenant,
  url,
}: SignInOnAPIProps): Promise<ILoggedUser | void> => {
  const payload = { ...credentials, tenant };
  return axios
    .post<ILoggedUser>(`${url}/api/v1/seguranca/tokens`, payload, {
      headers: {
        tenant,
      },
    })
    .then(({ data }) => ({
      ...data,
      ...(decode(data.token) as IJWTDecoded),
    }))
    .catch(getRequestErrorToast);
};
