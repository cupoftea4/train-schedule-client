import { useEffect, useMemo, useState } from 'react';
import Schedule from './components/Schedule';
import VirtualizedDataList from './components/VirtualizedDatalist';
import { getStations, getRoutes } from './util/api';
import { TrainStation, DatalistOption, Route, ScheduleOptions } from './util/types';
import { toClientRoute, toDataListOption } from './util/helpers';
import './App.css';

function App() {
  const [stations, setStations] = useState<TrainStation[]>([]);
  const [selectedOptions, setOptions] = useState<ScheduleOptions>({origin: "", destination: "", departureTime: Date.now()});
  const [schedule, setSchedule] = useState<Route[]>([]);

  const cityOptions = useMemo(() => 
    Array.from(new Set(stations.map(({city}) => city))).map(city => toDataListOption(city)), [stations]
  );

  useEffect(() => {
    const abortController = new AbortController();
    getStations(abortController).then(setStations);
    return () => abortController.abort();
  }, []);

  function onOriginSelect(item: DatalistOption) {
    setOptions({...selectedOptions, origin: item.id});
  }

  function onDestinationSelect(item: DatalistOption) {
    setOptions({...selectedOptions, destination: item.id});
  }

  return (
    <main>
      <h1>Welcome to Imaginary Train Station</h1>
      <VirtualizedDataList 
        autoFocus 
        options={cityOptions.filter(option => option.id !== selectedOptions.destination.toString())} 
        onSelect={onOriginSelect}
      />
      <VirtualizedDataList 
        options={cityOptions.filter(option => option.id !== selectedOptions.origin.toString())} 
        onSelect={onDestinationSelect}
      />
      <button 
        onClick={() => {
          getRoutes(selectedOptions).then(data => data.map(apiRoute => toClientRoute(apiRoute)))
            .then(schedule => {
              setSchedule(schedule);
              console.log(schedule);
            })
        }}
        className='primary-btn'
      >Find</button>
      <Schedule schedule={schedule}/>
    </main>
  )
};

export default App;
