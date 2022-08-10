import { NextResponse, type NextRequest } from 'next/server';

interface IDvxMiddlewareProps {
  request: NextRequest;
  homePagePath: string;
}

export const dvxMiddleware = ({
  homePagePath,
  request,
}: IDvxMiddlewareProps) => {
  const url = request.nextUrl.clone();

  const isNotFileInPublicFolder = !url.pathname.includes('.');
  const isSignPage = url.pathname === '/';
  const token = request.cookies.get('@dvx-security:accessToken');

  if (isNotFileInPublicFolder) {
    if (token) {
      if (isSignPage) {
        url.pathname = homePagePath;
        return NextResponse.redirect(url);
      }

      return NextResponse.next();
    }

    if (!isSignPage) {
      url.pathname = '/';
      const response = NextResponse.redirect(url);
      return response;
    }
  }

  return NextResponse.next();
};
