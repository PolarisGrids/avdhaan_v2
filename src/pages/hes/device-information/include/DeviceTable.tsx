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
import { DeviceInfoRecord } from "@/store/hes/types/records/device-management";


const DeviceInformation = () => {

  const { search } = useLocation();
  const [pageCursor, setPageCursor] = useState('');

  const {
    data: response, isLoading,
    isFetching, isError, error, refetch
  } = useGetDeviceInfoQuery({
    searchQuery: `${search}${pageCursor}`
  });

  const cursor = response?.data?.cursor || { after: null, before: null };

  const getNewRecords = useCallback(
    (val: string | null | undefined) => {
      if (!val) return;
      setPageCursor(`afterCursor=${val}`);
    },
    [setPageCursor]
  );

  const getOldRecords = useCallback(
    (val: string | null | undefined) => {
      if (!val) return;
      setPageCursor(`beforeCursor=${val}`);
    },
    [setPageCursor]
  );

  const deviceActions: ActionType<DeviceInfoRecord>[] = [
    {
      element: UpdateDevice,
      actionCb: refetch,
    }
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
    </div>
  )
}

export default DeviceInformation