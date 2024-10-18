import { EndpointBuilder } from '@reduxjs/toolkit/query';
import {
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta
} from '@reduxjs/toolkit/query';
import { BaseQueryFn } from '@reduxjs/toolkit/query';
import { AlarmEventsGraphRecord, RestorationOccuranceMetricsRecord } from '../../types/records/alarms';
import { AlarmEventsGraphResponse, AlarmEventsResponse, RestorationOccuranceMetricsResponse } from '../../types';
import { CACHING_TIME } from '@/store/utils';

export const alarmsEndPoints = (
  builder: EndpointBuilder<
    BaseQueryFn<
      string | FetchArgs,
      unknown,
      FetchBaseQueryError,
      NonNullable<unknown>,
      FetchBaseQueryMeta
    >,
    string,
    'hesApi'
  >
) => ({
  getRestorationOccuranceMetrics: builder.query<
    RestorationOccuranceMetricsRecord[],
    { searchQuery: string }
  >({
    query: ({ searchQuery }) => ({
      url: `push-data/pull-events/restoration-occurence-metrics${searchQuery}`
    }),
    transformResponse: (
      response: RestorationOccuranceMetricsResponse
    ): RestorationOccuranceMetricsRecord[] => {
      const data = response.data.records;
      return data;
    }
  }),
  
  getAlarmsEventDetails: builder.query<AlarmEventsResponse, { searchQuery: string }>({
    query: ({ searchQuery }) => ({
      url: `push-data/pull-events/list-view${searchQuery}`,
      method: "GET",
    }),
    providesTags: ["AlarmEvents"],
    keepUnusedDataFor: CACHING_TIME,
  }),

  getAlarmsEventGraphs: builder.query<AlarmEventsGraphResponse, { searchQuery: string }>({
    query: ({ searchQuery }) => ({
      url: `push-data/pull-events/piechart-view${searchQuery}`,
      method: "GET",
    }),  
  }),

});