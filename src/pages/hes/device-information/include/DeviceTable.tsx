import EmptyScreen from "@/components/customUI/EmptyScreen";
import ErrorScreen from "@/components/customUI/ErrorScreen";
import FullScreen from "@/components/customUI/Loaders/FullScreen";
import useGetTableColumns, { ActionType } from "@/hooks/useGetTableColumns";
import { useLocation } from "react-router-dom";
import { useGetDeviceInfoQuery } from "@/store/hes/hesApi";
import DataTable from "@/components/customUI/DataTable";
import Spinner from "@/components/customUI/Loaders/Spinner";
import { useCallback, useState } from "react";
import Button from "@/components/ui/button";
import CaretLeft from "@/components/svg/CaretLeft";
import CaretRight from "@/components/svg/CaretRight";
import UpdateDevice from "./UpdateDevice";
import { DeviceDetailRecord } from "@/store/hes/types/records/device-information";
import { useCallback, useEffect, useState } from "react";
import UpdateDevice from "./UpdateDevice";
import { DeviceDetailRecord } from "@/store/hes/types/records/device-information";
import CursorPagination from "@/components/customUI/CursorPagination";
import { useSelector } from "@/store";

const DeviceInformation = () => {

  const { search } = useLocation();
  const [pageCursor, setPageCursor] = useState('');
  const searchQuery = `${search ? `${search}&` : "?" }${pageCursor}`;
  const mainFilterLoading = useSelector(state => state.hes.mainFilterLoading);

  const {
    data: response, isLoading,
    isFetching, isError, error, refetch
  } = useGetDeviceInfoQuery({
    searchQuery: searchQuery
  }, { skip: mainFilterLoading });

  const cursor = response?.data?.cursor || { after: null, before: null };

  useEffect(() => {
    if(mainFilterLoading){
      setPageCursor("")
    }
  }, [ mainFilterLoading, setPageCursor ])

  const getNewRecords = useCallback(
    (val: string | null | undefined) => {
      if (!val) return;
      setPageCursor(`before_cursor=${val}`);
    },
    [setPageCursor]
  );

  const getOldRecords = useCallback(
    (val: string | null | undefined) => {
      if (!val) return;
      setPageCursor(`after_cursor=${val}`);
    },
    [setPageCursor]
  );

  const deviceActions: ActionType<DeviceDetailRecord>[] = [
    {
      element: UpdateDevice, actionCb: refetch,
    }
    { element: UpdateDevice, actionCb: refetch }
  ]

  const columns = useGetTableColumns({
    cols: response?.data?.records || [],
    query: ["deviceCategory", "simInformation", "connectionInfo", "deviceSubCategory"],
    action: deviceActions
  })

  if (isLoading) return <FullScreen hasSpinner={true} />;
  if (isError) return <ErrorScreen error={error} />
  if (!response) return <EmptyScreen title="No Device Information found" />;

  return (
    <div className="flex-1 flex flex-col w-full">
      <div className="flex flex-col min-h-[60vh]">
        {
          !isFetching ?
            <>
              <DataTable columns={columns} data={response?.data?.records} />
            </>
            :
            <div className='min-h-[80vh] flex items-center justify-center'>
              <Spinner />
            </div>
        }
        {!isError && (
          <div className="self-end">
            <Button
              variant="ghost"
              disabled={!cursor.before}
              onClick={() => getOldRecords(cursor.before)}
            >
              <CaretLeft />
            </Button>
            <Button
              variant="ghost"
              disabled={!cursor.after}
              onClick={() => getNewRecords(cursor.after)}
            >
              <CaretRight />
            </Button>
          </div>
        )}

      </div>
        {!isFetching && !isError && (
          <CursorPagination
            afterCursor={response.data.cursor.after}
            beforeCursor={response.data.cursor.before}
            disabled={isFetching}
            customCss="self-end"
            getOldRecords={getOldRecords}
            getNewRecords={getNewRecords}
          />
        )}
    </div>
  )
}

export default DeviceInformation