import axios, { AxiosError, AxiosResponse } from 'axios';

const apiURL: string | undefined = process.env.NEXT_PUBLIC_REACT_API_URL;
export const apiKey: string | undefined = process.env.NEXT_PUBLIC_REACT_API_KEY;

export const api = axios.create({
    baseURL: apiURL,
  headers: { 'Content-Type': 'application/json' },
});

export const getResponseData = <T>(resp: AxiosResponse<T>): T => resp?.data;

export const escalateError = (err: unknown): never => {
  let errorFromResponse: string | undefined;

  if (err instanceof AxiosError && err.response?.data?.error) {
    errorFromResponse = err.response.data.error.toString();
  }

  const typeError =
    typeof err === 'string'
      ? err
      : err instanceof Error
      ? err.message || err.toString()
      : 'Error Inesperado';

  const newErr = new Error(errorFromResponse || typeError);

  if (err instanceof AxiosError && err.response?.data) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (newErr as object | any).data = err.response.data;
  }

  throw newErr;
};