import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import qs from 'qs';

export enum Methods {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export const request = <T>(method: Methods, opts: AxiosRequestConfig) =>
  axios.request<unknown, AxiosResponse<T>>({
    ...opts,
    params: { ...opts.params, key: process.env.NEXT_PUBLIC_API_KEY },
    paramsSerializer: (params) => qs.stringify(params),
    method,
    baseURL: process.env.NEXT_PUBLIC_API_URL,
  });

export const externalRequest = <T>(externalUrl: string, opts: AxiosRequestConfig) =>
  axios.request<T>({ url: externalUrl, ...opts });
