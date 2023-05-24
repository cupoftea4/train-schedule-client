import { ChangeEvent, FC, useMemo, useState } from "react";
import SwapIcon from "../assets/SwapIcon";
import VirtualizedDataList from "./VirtualizedDatalist";
import { DatalistOption, ScheduleOptions, TrainStation } from "../util/types";
import { toDataListOption } from "../util/helpers";

type OwnProps = {
  selectedOptionsState: [ScheduleOptions, React.Dispatch<React.SetStateAction<ScheduleOptions>>];
  stations: TrainStation[];
}

const Options: FC<OwnProps> = ({selectedOptionsState, stations}) => {
  const [options, setOptions] = selectedOptionsState;
  const [outerSelectValue, setOuterSelectValue] = useState<[string, string]>(["", ""]);

  const cityOptions = useMemo(() => 
    Array.from(new Set(stations.map(({city}) => city))).map(city => toDataListOption(city)), [stations]
  );


  function swapOptions() {
    setOptions(selectedOptions => ({...selectedOptions, origin: selectedOptions.destination, destination: selectedOptions.origin}));
    setOuterSelectValue([options.destination.toString(), options.origin.toString()]);
  }

  function onOriginSelect(item: DatalistOption) {
    setOptions(selectedOptions => ({...selectedOptions, origin: item.id}));
  }

  function onDestinationSelect(item: DatalistOption) {
    setOptions(selectedOptions => ({...selectedOptions, destination: item.id}));
  }

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setOptions(selectedOptions => ({...selectedOptions, departureTime: event.target.value}));
  };
  
  return (
    <>
      <div className="options">
        <div className="options__selects">
          <VirtualizedDataList 
            autoFocus 
            outerValue={outerSelectValue[0]}
            options={cityOptions.filter(option => option.id !== options.destination.toString())} 
            onSelect={onOriginSelect}
          />
          <VirtualizedDataList 
            outerValue={outerSelectValue[1]}
            options={cityOptions.filter(option => option.id !== options.origin.toString())} 
            onSelect={onDestinationSelect}
          />
        </div>
        <button onClick={swapOptions}>
          <SwapIcon/>
        </button>
      </div>
      <input className="options__date" type="date" value={options.departureTime} onChange={handleInputChange}/>
    </>
   
  )
};

export default Options;