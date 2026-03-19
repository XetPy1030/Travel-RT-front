import axios from "axios";
import { Configuration, LocationsApi, NewsApi, PlacesApi, RoutersApi } from "./generated";

type UploadableFile = File | Blob;

export type AggregatedApi = {
  apiNewsList: NewsApi["newsList"];
  apiNewsRetrieve: NewsApi["newsRetrieve"];
  apiPlacesList: PlacesApi["placesList"];
  apiPlacesRetrieve: PlacesApi["placesRetrieve"];
  apiRoutersList: RoutersApi["routersList"];
  apiRoutersRetrieve: RoutersApi["routersRetrieve"];
  apiLocationsDistrictsList: LocationsApi["locationsDistrictsList"];
  apiLocationsSettlementsList: LocationsApi["locationsSettlementsList"];
};

export const createApiClient = (basePath: string) => {
  const config = new Configuration({
    basePath
  });
  const newsApi = new NewsApi(config);
  const placesApi = new PlacesApi(config);
  const routersApi = new RoutersApi(config);
  const locationsApi = new LocationsApi(config);

  const uploadHttp = axios.create({
    baseURL: basePath
  });

  return {
    api: {
      apiNewsList: (...args: Parameters<NewsApi["newsList"]>) => newsApi.newsList(...args),
      apiNewsRetrieve: (...args: Parameters<NewsApi["newsRetrieve"]>) => newsApi.newsRetrieve(...args),
      apiPlacesList: (...args: Parameters<PlacesApi["placesList"]>) => placesApi.placesList(...args),
      apiPlacesRetrieve: (...args: Parameters<PlacesApi["placesRetrieve"]>) => placesApi.placesRetrieve(...args),
      apiRoutersList: (...args: Parameters<RoutersApi["routersList"]>) => routersApi.routersList(...args),
      apiRoutersRetrieve: (...args: Parameters<RoutersApi["routersRetrieve"]>) => routersApi.routersRetrieve(...args),
      apiLocationsDistrictsList: (...args: Parameters<LocationsApi["locationsDistrictsList"]>) =>
        locationsApi.locationsDistrictsList(...args),
      apiLocationsSettlementsList: (...args: Parameters<LocationsApi["locationsSettlementsList"]>) =>
        locationsApi.locationsSettlementsList(...args)
    } as AggregatedApi,
    uploadImage: (file: UploadableFile) => {
      const formData = new FormData();
      formData.append("file", file);
      return uploadHttp.post("/upload", formData);
    }
  };
};