import { useToast } from "@/components/ui/use-toast";
import { useUpdateDeviceInfoMutation } from "@/store/hes/hesApi";
import { FC, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import SubmitButton from "../../Button/SubmitButton";
import { Input } from "@/components/ui/input";
import Checkbox from "@/components/ui/checkbox";
import { CustomAPIError, DeviceDataResponse, UpdateDevicePayload } from "@/store/hes/types";
import { DeviceInfoRecord } from "@/store/hes/types/records/device-management";
import FormCheckbox from "./FormCheckbox";

interface UpdateDeviceFormProps {
  deviceInfo: DeviceInfoRecord;
  formCss?: string;
  onSubmitCb?: () => void;
}

const UpdateDeviceForm: FC<UpdateDeviceFormProps> = ({ deviceInfo, formCss, onSubmitCb }) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [updateDeviceInfo, { isLoading }] = useUpdateDeviceInfoMutation();

  const [isPrimarySimChecked, setIsPrimarySimChecked] = useState(true);
  const [isSecondarySimChecked, setIsSecondarySimChecked] = useState(true);

  const [primarySimInfo, setPrimarySimInfo] = useState({
    ipv6Address: "FC10:0:298:176C::2",
    simNo: "SIM_NO_HERE",
  });

  const [secondarySimInfo, setSecondarySimInfo] = useState({
    ipv6Address: "SECONDARY_IPV6_HERE",
    simNo: "SIM_NO_HERE",
  });

  const handleCheckboxChange = (simType: "primary" | "secondary") => {
    console.log(simType,'st');
    if (simType === "primary") {
      setIsPrimarySimChecked((prev) => !prev);
      console.log(isPrimarySimChecked,'i');
    } else {
      setIsSecondarySimChecked((prev) => !prev);
    }
  };

  const handleSimInfoChange = (e: React.ChangeEvent<HTMLInputElement>, simType: "primary" | "secondary", field: string) => {
    const { value } = e.target;
    if (simType === "primary") {
      setPrimarySimInfo((prev) => ({ ...prev, [field]: value }));
    } else {
      setSecondarySimInfo((prev) => ({ ...prev, [field]: value }));
    }
  };


  const handleUpdateDevice = useCallback(async (apiPayload: UpdateDevicePayload) => {
    try {
      await updateDeviceInfo(apiPayload);
      toast({ variant: "default", description: "Device updated successfully" });
      if (onSubmitCb) return onSubmitCb();
      navigate('/device-management');
    } catch (error) {
      const errorMsg = error as CustomAPIError;
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: errorMsg?.description || "Failed to update rule",
      })
    }
  }, [updateDeviceInfo, toast, onSubmitCb, navigate])

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
  
      const updatePayload: UpdateDevicePayload = {
        simDetails: {
          primarySimInfo: isPrimarySimChecked
            ? {
                tspName: "TSP_NAME_HERE",
                simNo: primarySimInfo.simNo,
                imsiNumber: "IMSI_NUMBER_HERE",
                iccid: "ICCID_HERE",
                ipv6Address: primarySimInfo.ipv6Address,
                port: 4059,
              }
            : undefined,
          secondarySimInfo: isSecondarySimChecked
            ? {
                tspName: "SECONDARY_TSP_NAME_HERE",
                simNo: secondarySimInfo.simNo,
                imsiNumber: "SECONDARY_IMSI_NUMBER_HERE",
                iccid: "SECONDARY_ICCID_HERE",
                ipv6Address: secondarySimInfo.ipv6Address,
                port: 5432,
              }
            : undefined,
        },
        communicationProtocol: "TAP", 
        deviceIdentifier: "POL99987709",
      };

  
      handleUpdateDevice(updatePayload);
    },
    [isPrimarySimChecked, primarySimInfo, isSecondarySimChecked, secondarySimInfo, handleUpdateDevice]

  );
  return (

    <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4">
    <FormCheckbox
    label="Primary SIM"  
      checked={isPrimarySimChecked}
      onChange={() => handleCheckboxChange("primary")}
    />
    {isPrimarySimChecked && (
      <div className="grid grid-cols-2 gap-4">
        <Input
          placeholder="Primary SIM IPv6 Address"
          value={primarySimInfo.ipv6Address}
          onChange={(e) => handleSimInfoChange(e, "primary", "ipv6Address")}
          disabled={!isPrimarySimChecked}
        />
        <Input
          placeholder="Primary SIM Serial No."
          value={primarySimInfo.simNo}
          onChange={(e) => handleSimInfoChange(e, "primary", "simNo")}
          disabled={!isPrimarySimChecked}
        />
      </div>
    )}

    <FormCheckbox
    label="Secondary SIM "
      checked={isSecondarySimChecked}
      onChange={() => handleCheckboxChange("secondary")}
    />
    {isSecondarySimChecked && (
      <div className="grid grid-cols-2 gap-4">
        <Input
          placeholder="Secondary SIM IPv6 Address"
          value={secondarySimInfo.ipv6Address}
          onChange={(e) => handleSimInfoChange(e, "secondary", "ipv6Address")}
          disabled={!isSecondarySimChecked} 
        />
        <Input
          placeholder="Secondary SIM Serial No."
          value={secondarySimInfo.simNo}
          onChange={(e) => handleSimInfoChange(e, "secondary", "simNo")}
          disabled={!isSecondarySimChecked} 
        />
      </div>
    )}

    <SubmitButton title="Update" disabled={isLoading} />
  </form>
);
};

export default UpdateDeviceForm
