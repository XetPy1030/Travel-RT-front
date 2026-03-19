import axios from "axios";
import { Configuration, LocationsApi, NewsApi, PlacesApi, RoutersApi } from "./generated";

type UploadableFile = File | Blob;

export type RouteGenerateRequest = {
  user_text: string;
  district_id?: number | null;
  settlement_id?: number | null;
};

export type RouteGenerateStatus = {
  status: "pending" | "processing" | "completed" | "failed";
  router_id: number | null;
  error_message: string | null;
};

export type AggregatedApi = {
  apiNewsList: NewsApi["newsList"];
  apiNewsRetrieve: NewsApi["newsRetrieve"];
  apiPlacesList: PlacesApi["placesList"];
  apiPlacesRetrieve: PlacesApi["placesRetrieve"];
  apiRoutersList: RoutersApi["routersList"];
  apiRoutersRetrieve: RoutersApi["routersRetrieve"];
  apiLocationsDistrictsList: LocationsApi["locationsDistrictsList"];
  apiLocationsSettlementsList: LocationsApi["locationsSettlementsList"];
  apiRoutersGenerate: (body: RouteGenerateRequest) => Promise<{ data: { task_id: string } }>;
  apiRoutersGenerateStatus: (taskId: string) => Promise<{ data: RouteGenerateStatus }>;
};

export const createApiClient = (basePath: string) => {
  const config = new Configuration({
    basePath
  });
  const newsApi = new NewsApi(config);
  const placesApi = new PlacesApi(config);
  const routersApi = new RoutersApi(config);
  const locationsApi = new LocationsApi(config);

  const http = axios.create({
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
        locationsApi.locationsSettlementsList(...args),
      apiRoutersGenerate: (body: RouteGenerateRequest) =>
        http.post<{ task_id: string }>("/api/routers/generate/", body),
      apiRoutersGenerateStatus: (taskId: string) =>
        http.get<RouteGenerateStatus>(`/api/routers/generate/${taskId}/`)
    } as AggregatedApi,
    uploadImage: (file: UploadableFile) => {
      const formData = new FormData();
      formData.append("file", file);
      return http.post("/upload", formData);
    }
  };
};