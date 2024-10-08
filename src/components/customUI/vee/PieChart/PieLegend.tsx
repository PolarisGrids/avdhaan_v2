import { FC } from "react";

interface PieLegendProps {
    value: number;
    name: string;
    color: string;
}

const PieLegend: FC<PieLegendProps> = ({ value, name, color }) => {
    if(!value) return null;
    return (
        <div className="flex items-center gap-x-6">
            <div className={"w-[10px] h-[10px] rounded-full"} style={{ backgroundColor: color }} />
            <span className="capitalize text-sm">{name}: {value.toFixed(2)}%</span>
        </div>
    )
}

export default PieLegend