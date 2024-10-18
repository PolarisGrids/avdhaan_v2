
export type RestorationOccuranceMetricsRecord = {
  name: string;
  occurenceCount: number;
  restorationCount: number;
  restorationPercentage: number;
};

export type AlarmsQueryParams = {
  after_cursor?: string;
  before_cursor?: string;
  to?: string;
  from?: string;
  sub_category?: number;
};

export type AlarmEventsRecord = {
  deviceIdentifier: string,
  eventTime: string,
  eventCode: number,
  eventName: string,
  status: string,
  noOfdaysFromOpenedStatus: number
}

export interface AlarmEventsGraphRecord {
  [key: string]: number; 
}

export interface GraphData {
  categories: string[];
  series: ApexAxisChartSeries;
}