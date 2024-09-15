import {
  DeviceInfoRecord,
  LocationHierarchyRecord,
  DeviceMetaInfoMetricsRecord,
  DeviceSubCategoryRecord
} from './records/device-management';
import { LiveDataMetricsRecord } from './records/meter-profile/meter-profile-data-metrics';
import { PeriodicPushRecord } from './records/meter-profile/periodic-push';

export type ResponseBase<T> = {
  data: {
    records: T extends null ? null : T[];
    count: number;
    cursor: {
      after: string | null;
      before: string | null;
    };
  };
};

export type ResponseBaseWithOutPagination<T> = {
  data: {
    records: T[];
    count: number;
  };
};

export interface DeviceSimInfo {
  tspName: string;
  simNo: string;
  imsiNumber: string;
  iccid: string;
  ipv6Address: string;
  port: number;
}

 export type UpdateDevicePayload = {
  simDetails: {
    primarySimInfo?: DeviceSimInfo | null;
    secondarySimInfo?: DeviceSimInfo | null;
  };
  communicationProtocol?: string; // Should be "TAP" or "DLMS"
  deviceIdentifier: string;
};

export type DeviceMetaInfoMetricsResponse =
  ResponseBaseWithOutPagination<DeviceMetaInfoMetricsRecord>;
export type LocationHierarchyResponse =
  ResponseBaseWithOutPagination<LocationHierarchyRecord>;
export type DeviceInfoResponse =
  ResponseBaseWithOutPagination<DeviceInfoRecord>;
export type LiveDataMetricsResponse =
  ResponseBaseWithOutPagination<LiveDataMetricsRecord>;

export type DeviceSubCategoryResponse =
  ResponseBaseWithOutPagination<DeviceSubCategoryRecord>;

export type PeriodicPushResponse = ResponseBase<PeriodicPushRecord>;

export type DeviceDataResponse = ResponseBase<DeviceInfoRecord>;

export type DeviceDetailResponse = ResponseBaseWithOutPagination<DeviceInfoRecord>;

export interface CustomAPIError {
  description?: string;
  // Define other properties if needed
}
