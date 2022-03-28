/* eslint-disable no-param-reassign */

const AUTH_TOKEN = 'oor-jwt';

const extractAuthTokenFromResponse = (response) => {
  const authToken = response.data.token;

  if (authToken) {
    localStorage.setItem(AUTH_TOKEN, authToken);
  }

  return response;
};

const appendAuthTokenToRequest = (config) => {
  // eslint-disable-next-line no-console
  console.log(config);
  const authToken = localStorage.getItem(AUTH_TOKEN);
  if (authToken) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${localStorage.getItem(AUTH_TOKEN)}`,
    };
  }

  return config;
};

const addAuth = (instance) => {
  instance.interceptors.request.use(appendAuthTokenToRequest);
  instance.interceptors.response.use(extractAuthTokenFromResponse);
};

export default addAuth;
