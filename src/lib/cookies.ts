import { destroyCookie, setCookie } from 'nookies';

import { ILoggedUser, IJWTDecoded } from '../types';

interface ISetAuthCookies {
  APIResponse: ILoggedUser & IJWTDecoded;
  isProductionEnvironment: boolean;
  tenant: string;
}

interface IDestroyAllCookies {
  isProductionEnvironment: ISetAuthCookies['isProductionEnvironment'];
}

export const destroyAllCookies = ({
  isProductionEnvironment,
}: IDestroyAllCookies) => {
  const cookiesToDestroy = [
    '@dvx-security:accessToken',
    '@dvx-security:refreshToken',
    '@dvx-security:refreshTokenExpiryTime',
    '@dvx-security:tenant',
    '@dvx-security:userID',
  ];

  cookiesToDestroy.forEach(key => {
    destroyCookie(null, key, {
      path: '/',
      domain: isProductionEnvironment && '.orquestraerp.com',
    });
  });
};

export const setAuthCookies = ({
  APIResponse,
  isProductionEnvironment,
  tenant,
}: ISetAuthCookies) => {
  const cookiesToSet = [
    { key: '@dvx-security:accessToken', value: APIResponse.token },
    { key: '@dvx-security:refreshToken', value: APIResponse.refreshToken },
    { key: '@dvx-security:tenant', value: tenant },
    {
      key: '@dvx-security:refreshTokenExpiryTime',
      value: APIResponse.refreshTokenExpiryTime,
    },
    {
      key: '@dvx-security:userID',
      value:
        APIResponse[
          'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'
        ],
    },
  ];

  cookiesToSet.forEach(({ key, value }) => {
    setCookie(null, key, value ?? '', {
      maxAge: 604800,
      path: '/',
      domain: isProductionEnvironment && '.orquestraerp.com',
    });
  });
};
