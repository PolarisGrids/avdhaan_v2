import { useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ToggleView from '@/components/customUI/ToggleView';
import HesFilters from '@/components/customUI/hes/HesFilters';
import { useGetAlarmsEventDetailsQuery } from '@/store/hes/hesApi';
import EmptyScreen from '@/components/customUI/EmptyScreen';
import ErrorScreen from '@/components/customUI/ErrorScreen';
import FullScreen from '@/components/customUI/Loaders/FullScreen';
import Spinner from '@/components/customUI/Loaders/Spinner';
import DataTable from '@/components/customUI/DataTable';
import useGetTableColumns from '@/hooks/useGetTableColumns';
import DateFilters from '@/pages/hes/scheduled-reads/includes/DateFilter.tsx';
import GraphView from './GraphView';

export type QueryType = {
    from: string;
    to: string;
}

type EventPageProps = {
    dataType: string;  
    title: string;   
}

const AlarmEvents = ({ dataType, title }: EventPageProps) => {

    const { search } = useLocation();

    const [view, setView] = useState<"graph" | "table">('table');
    const [query, setQuery] = useState<QueryType>({from: "", to: "" });

    const urlSearchParam = useMemo(() => {
        let newSearchParam = search ? `${search}&` : "?";
        newSearchParam += `data_type=${dataType}`;
        if (query.from) newSearchParam += `from=${query.from}&`
        if (query.to) newSearchParam += `to=${query.to}&`
        return newSearchParam
    }, [query, search, dataType]);

    const {
        data: response, isLoading,
        isFetching, isError, error, refetch
    } = useGetAlarmsEventDetailsQuery({ searchQuery: urlSearchParam });

    const tableData = response?.data?.records || []
    const columns = useGetTableColumns({
        cols: tableData,
        query: ["totalCommands"]
    });

    if (isLoading) return <FullScreen hasSpinner={true} />;
    if (isError) return <ErrorScreen error={error} />
    if (!response) return (<EmptyScreen title={`${title} not available`} />)

    return (
        <div className="px-5 w-full">
            <div className="flex relative flex-col mt-8">
                <div className="flex justify-between items-center mb-2 ">
                    <h1 className="capitalize secondary-title lg:main-title">
                        <span className="font-bold text-[#0A3690]">{title}</span>
                    </h1>
                    <ToggleView view={view} setView={setView} />
                </div>
                <HesFilters />
                <DateFilters setQuery={setQuery} refresh={refetch} />
                {
                    !isFetching ?
                        <div className="mt-8">
                             {view === 'table' && 
                            <DataTable
                                columns={columns}
                                data={tableData}
                            />
                            }
               {view === 'graph' && <GraphView dataType = {dataType} title = {title}/>} 
                        </div> :
                        <div className='min-h-[80vh] flex items-center justify-center'>
                            <Spinner />
                        </div>
                }
            </div>
        </div>
    )
};

export default AlarmEvents;
