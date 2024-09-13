import UpdateDeviceForm from '@/components/customUI/Forms/updateDeviceInformation';
import Spinner from '@/components/customUI/Loaders/Spinner';
import BaseModal from '@/components/customUI/Modals';
import { DeviceInfoRecord } from '@/store/hes/types/records/device-management';
import { FC, useCallback, useState, lazy, Suspense } from 'react'

interface UpdateDeviceProps {
    data: DeviceInfoRecord;
    cb?: () => void
}

const ButtonLogo = () => {
    return <img
        src="/public/assets/images/other/edit.png"
        alt="" height="auto"
        style={{ maxWidth: 20 }}
    />
};

const UpdateDevice: FC<UpdateDeviceProps> = ({ data, cb }) => {
    const [open, setOpen] = useState(false);

    const handleSubmit = useCallback(() => {
        setOpen(false);
        if (cb) cb();
    }, [cb, setOpen])


    return (
        <BaseModal
            open={open}
            setOpen={setOpen}
            dialogTitle={`Device Serial No : - ${data.deviceSerial}`}
            buttonClass="primary-vee-btn flex items-center justify-center w-[35px]"
            ButtonLogo={ButtonLogo}
        >
            <Suspense fallback={
                <div className='h-[50vh] flex items-center justify-center'>
                    <Spinner />
                </div>
            }>
                <UpdateDeviceForm
                 deviceInfo={data}
                 onSubmitCb={handleSubmit}
                 />
            </Suspense>
        </BaseModal>
    )
}

export default UpdateDevice