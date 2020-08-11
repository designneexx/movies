import axios from 'axios';

const { REACT_APP_BASE_URL, REACT_APP_API_KEY, REACT_APP_API_VERSION } = process.env;

const withApiKey = (url: string) => {
  const queryStrIdx = url.indexOf('?');
  return queryStrIdx === -1
    ? `${url}?api_key=${REACT_APP_API_KEY}`
    : url.replace('?', `?api_key=${REACT_APP_API_KEY}&`);
};

const { REACT_APP_BASE_IMAGE_URL, REACT_APP_BASE_IMAGE_SIZE } = process.env;

export const IMAGE_SERVER = `${REACT_APP_BASE_IMAGE_URL}/${REACT_APP_BASE_IMAGE_SIZE}`;

export const http = axios.create({
  baseURL: `${REACT_APP_BASE_URL}${REACT_APP_API_VERSION}`,
});

const defaultConfig = {
  headers: {
    'Content-Type': 'application/json',
  },
};

export type ConfigT = typeof defaultConfig;
export type HeadersT = typeof defaultConfig.headers;

export const getReq = async <T>(url: string, config = defaultConfig): Promise<T> => {
  const { data } = await http.get(withApiKey(url), config);
  return data;
};

export const postReq = async <T, K>(
  url: string,
  payload: T,
  config = defaultConfig,
): Promise<K> => {
  const { data } = await http.post(withApiKey(url), payload, config);
  return data;
};

export const putReq = async <T, K>(url: string, payload: T, config = defaultConfig): Promise<K> => {
  const { data } = await http.put(withApiKey(url), payload, config);
  return data;
};

export const deleteReq = async <T>(url: string, config: any = defaultConfig): Promise<T> => {
  const { data } = await http.delete(withApiKey(url), config);
  return data;
};
