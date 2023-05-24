import { ApiRoute, TrainStation, ScheduleOptions } from "./types";

const SERVER_ORIGIN = "https://frank-quarter-production.up.railway.app";

export function getStations(controller: AbortController): Promise<TrainStation[]> {
  return fetch(`${SERVER_ORIGIN}/stations`, { signal: controller.signal }).then(res => res.json());
}

export function getRoutes(options: ScheduleOptions): Promise<ApiRoute[]> {
  const { origin, destination, departureTime } = options;

  const url = new URL(`${SERVER_ORIGIN}/routes/q`);
  url.searchParams.append("src", origin);
  url.searchParams.append("dest", destination);
  if (departureTime) {
    url.searchParams.append("date", departureTime);
  }

  return fetch(url.toString()).then(res => res.json());
}

type PostRoute = Omit<ApiRoute, 'id' | 'originStation' | 'destinationStation'> & {originStationId: number, destinationStationId: number};

export function createRoute(route: PostRoute): Promise<ApiRoute> {
  return fetch(`${SERVER_ORIGIN}/routes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(route),
  }).then(res => {
    if (!res.ok) throw new Error(res.statusText);
    return res.json()
  });
}

export function getAllRoutes(): Promise<ApiRoute[]> {
  return fetch(`${SERVER_ORIGIN}/routes`).then(res => res.json());
}