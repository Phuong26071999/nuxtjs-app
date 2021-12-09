/* eslint-disable camelcase */
import { axiosImage } from "./config";

export function callApiImage(params: {
  client_id: string,
  per_page: number,
  query: string,
  page: number,
}) {
  return axiosImage.get(`/search/photos`, {params});
}

export function callApiImageRelated(
  client_id: string,
  name: string
) {
  return axiosImage.get(`/users/${name}/photos?client_id=${client_id}&per_page=40`);
}
