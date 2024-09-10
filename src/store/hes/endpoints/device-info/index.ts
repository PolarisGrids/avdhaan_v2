import { EndpointBuilder } from "@reduxjs/toolkit/query";
import { FetchArgs, FetchBaseQueryError, FetchBaseQueryMeta } from "@reduxjs/toolkit/query";
import { BaseQueryFn } from "@reduxjs/toolkit/query";
import { CACHING_TIME } from "@/store/utils";
import { DeviceDataResponse } from "../../types";

export const DeviceInfoEndpoints = (
  builder: EndpointBuilder<
    BaseQueryFn<
      string | FetchArgs,
      unknown,
      FetchBaseQueryError,
      NonNullable<unknown>,
      FetchBaseQueryMeta
    >,
    string,
    "hesApi"
  >
) => ({
  getDeviceInfo: builder.query<DeviceDataResponse , { searchQuery: string }>({
    query: ({ searchQuery }) => ({
      url: `device-management/device-info${searchQuery}`,
      method: "GET",
    }),
    providesTags: ["Device"],
    keepUnusedDataFor: CACHING_TIME,
  }),
});
