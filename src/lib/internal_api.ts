import axios from 'axios';

const baseURL = 'https://hmg-api.orquestraerp.com/api/v1';

export const internal_api = axios.create({
  baseURL,
});

internal_api.interceptors.request.use(async request => {
  const token = await axios
    .post(
      `${baseURL}/seguranca/tokens`,
      {
        email: 'paulo.henrique@devexsolucoes.com.br',
        password: '12345!',
      },
      {
        headers: {
          tenant: 'fiea',
        },
      }
    )
    .then(response => response.data.token);

  if (token) {
    request.headers = {
      ...request.headers,
      Authorization: `Bearer ${token}`,
    };
  }

  return request;
});
