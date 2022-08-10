export const getAPIEnvironment = (app_url: string) => {
  if (app_url.includes('localhost') || app_url.includes('hmg')) {
    return 'hmg';
  }

  if (app_url.includes('dev-orc')) {
    return 'dev';
  }

  return 'prod';
};
