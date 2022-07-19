import { destroyCookie, setCookie } from 'nookies';

import { ILoggedUser, IJWTDecoded } from '../types';

interface ISetAuthCookies {
  APIResponse: ILoggedUser & IJWTDecoded;
  tenant: string;
}

export const destroyAllCookies = () => {
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
      domain:
        process.env.NEXT_PUBLIC_COOKIE_DOMAIN !== 'empty' &&
        '.orquestraerp.com',
    });
  });
};

export const setAuthCookies = ({ APIResponse, tenant }: ISetAuthCookies) => {
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
      domain:
        process.env.NEXT_PUBLIC_COOKIE_DOMAIN !== 'empty' &&
        '.orquestraerp.com',
    });
  });
};
