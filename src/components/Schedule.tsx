import { FC, useMemo } from "react";
import { Route } from "../util/types";
import { calculateMinuteDifference, formatDate, formatTime, sortByDepartureTime } from "../util/helpers";

type OwnProps = {
  schedule: Route[];
}

const Schedule: FC<OwnProps> = ({ schedule }) => {
  const routesByDate = useMemo(() => createMapByDate(schedule), [schedule]);

  function createMapByDate(schedule: Route[]) {
    const sortedSchedule = sortByDepartureTime(schedule);
    const map: Record<string, Route[]> = {};
    sortedSchedule.forEach(route => {
      const date = new Date(route.departureTime).toDateString();
      if (map[date]) {
        map[date].push(route);
      }
      else {
        map[date] = [route];
      }
    });
    return map;
  }

  return (
    <ul className="schedule">
      { schedule.length === 0 && <li>No routes found</li>}
      {Object.keys(routesByDate).map(date => {
          return (
            <li key={date}>
              <h2>{formatDate(date)}</h2>
              <ul className="schedule">
                {
                  routesByDate[date].map(route => {
                    const { originStation, destinationStation, departureTime, arrivalTime, price } = route;
                    const duration = calculateMinuteDifference(arrivalTime, departureTime);
                    return (
                      <li key={route.id} className="route">
                        <div>
                          <h3>{originStation.name} to {destinationStation.name}</h3>
                          <p>Departure: {formatTime(departureTime)}</p>
                          <p>Arrival: {formatTime(arrivalTime)}</p>
                        </div>
                        <div>
                          <p>Duration: {duration} minutes</p>
                          <p>Price: {price}$ </p>
                        </div>
                      </li>
                    )
                  })
                }
              </ul>
            </li>
          )
        })
      }
    </ul>
  )
};

export default Schedule;