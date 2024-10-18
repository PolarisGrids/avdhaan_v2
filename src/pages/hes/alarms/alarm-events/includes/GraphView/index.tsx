import EmptyScreen from '@/components/customUI/EmptyScreen';
import ErrorScreen from '@/components/customUI/ErrorScreen';
import Graph from '@/components/customUI/Graph';
import FullScreen from '@/components/customUI/Loaders/FullScreen';
import { useGetAlarmsEventGraphsQuery } from '@/store/hes/hesApi';
import { AlarmEventsGraphRecord } from '@/store/hes/types/records/alarms';
import { ApexOptions } from 'apexcharts';
import React, { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';

interface GraphType {
    series: number[]; 
    options: ApexOptions; 
  }
type QueryType = {
    from: string;
    to: string;
}
interface AlarmEventsGraphProps {
    dataType: string; 
    title: string;
  }

const transformAlarmEventsDataToPieChart = (record: AlarmEventsGraphRecord | null): GraphType  | null=> {
    if (!record) return null;  
    const categories = Object.keys(record); 
    const series = Object.values(record);  
  
    return {
      series: series as number[],
      options: {
        chart: {
          type: 'pie',
        },
        labels: categories,
        legend: {
          position: 'right',
        },
        tooltip: {
          y: {
            formatter: (value: number) => `${value}%`,
          },
        },
      },
    };
  };

const AlarmEventsGraph: React.FC<AlarmEventsGraphProps> = ({ dataType, title }) => {
    const { search } = useLocation();
  const [query, setQuery] = useState<QueryType>({from: "", to: "" });

  const urlSearchParam = useMemo(() => {
      let newSearchParam = search ? `${search}&` : "?";
      newSearchParam += `data_type=${dataType}`;
      if (query.from) newSearchParam += `from=${query.from}&`
      if (query.to) newSearchParam += `to=${query.to}&`
      return newSearchParam
  }, [query, search, dataType]);

  const { data: apiData, isSuccess, isFetching, isError, error,isLoading, refetch } = useGetAlarmsEventGraphsQuery({ searchQuery: urlSearchParam });

  const [graphDataList, setGraphDataList] = useState<GraphType[]>([]);

  useEffect(() => {
    if (isFetching && apiData?.data?.records && apiData.data.records.length > 0) {
        const transformedDataList = apiData.data.records
          .map((record) => transformAlarmEventsDataToPieChart(record))
          .filter((data) => data !== null) as GraphType[]; 
        setGraphDataList(transformedDataList);
      } else {
        setGraphDataList([]); 
      }
    }, [apiData, isFetching]);

    if (isLoading) return <FullScreen hasSpinner={true} />;
    if (isError) return <ErrorScreen error={error} />
    if (!apiData && graphDataList.length > 0 )  return (<EmptyScreen title={`${title} not available`} />)

  return (
    <div className="mt-8">
   {graphDataList.length > 0 ? (
        graphDataList.map((graphData, index) => (
          <div key={index} className="mb-6">
            {graphData ? (
              <Graph data={graphData} title={`Power Failure - Chart ${index + 1}`} type="pie" />
            ) : (
              <div>No data for this record</div>
            )}
          </div>
        ))
      ) : (
        <div><EmptyScreen title={`${title} Graph Data not available`} /></div> 
      )}
  </div>
  );
};

export default AlarmEventsGraph;