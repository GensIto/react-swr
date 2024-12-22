import useSWR from "swr";
import { AxiosRequestConfig, AxiosError } from "axios";
import { createAxiosInstance } from "./axios";
import useSWRMutation from "swr/mutation";

export const useQuery = <
  Request extends object = object,
  Response extends object = object
>(
  url: string,
  params?: Request,
  axiosConfig?: AxiosRequestConfig
) => {
  const key = [url, JSON.stringify(params)];

  return useSWR<Response, AxiosError>(key, () =>
    createAxiosInstance
      .request({
        url,
        method: "GET",
        params,
        ...axiosConfig,
      })
      .then((res) => res.data)
  );
};

export const useMutation = <
  Request extends object = object,
  Response extends object = object,
  UrlParams extends Record<string, string> = Record<string, string>
>(
  url: string,
  axiosConfig?: AxiosRequestConfig
) => {
  const mapUrlParams = (url: string, urlParams?: Record<string, string>) => {
    if (urlParams) {
      return url.replace(/{([^}]+)}/g, (_, p1) => urlParams[p1]);
    }
    console.log("url", url);
    return url;
  };

  return useSWRMutation<
    Response,
    AxiosError,
    string,
    Request & { urlParams?: UrlParams }
  >(url, async (url, fetcherOptions) => {
    const {
      arg: { urlParams, ...restParams },
    } = fetcherOptions;
    const mappedUrl = mapUrlParams(url, urlParams);

    const res = await createAxiosInstance.request({
      url: mappedUrl,
      data: restParams,
      ...axiosConfig,
    });
    return res.data;
  });
};
