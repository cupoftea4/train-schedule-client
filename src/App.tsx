import { useEffect, useState } from 'react';
import Schedule from './components/Schedule';
import Options from './components/Options';
import RouteModal from './components/RouteModal';

import { getRoutes, getAllRoutes, getStations } from './util/api';
import { Route, ScheduleOptions, TrainStation } from './util/types';
import { toClientRoute } from './util/helpers';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {
  const [schedule, setSchedule] = useState<Route[]>([]);
  const [stations, setStations] = useState<TrainStation[]>([]);
  const [selectedOptions, setOptions] = useState<ScheduleOptions>(
    {origin: "", destination: "", departureTime: (new Date()).toISOString().slice(0, 10)}
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const abortController = new AbortController();
    getAllRoutes().then(data => data.map(apiRoute => toClientRoute(apiRoute))).then(setSchedule);
    getStations(abortController).then(setStations);
    return () => abortController.abort();
  }, []);

  function findRoutes() {
    getRoutes(selectedOptions)
      .then(data => data.map(apiRoute => toClientRoute(apiRoute)))
      .then(setSchedule)
  }

  return (
    <main>
      <h1>Welcome to Imaginary Train Station</h1>
      <Options selectedOptionsState={[selectedOptions, setOptions]} stations={stations}/>
      <button onClick={findRoutes} className='primary-btn find'>Find</button>

      <Schedule schedule={schedule}/>
      <button onClick={() => setIsModalOpen(true)}>+ Create route</button>
      { isModalOpen && <RouteModal stations={stations} closeModal={() => setIsModalOpen(false)} />}
      <ToastContainer />
    </main>
  )
};

export default App;
