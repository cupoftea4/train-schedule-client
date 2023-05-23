import { ApiRoute, TrainStation, ScheduleOptions } from "./types";

const SERVER_ORIGIN = "http://127.0.0.1:3001";

export function getStations(controller: AbortController): Promise<TrainStation[]> {
  return fetch(`${SERVER_ORIGIN}/stations`, { signal: controller.signal }).then(res => res.json());
}

export function getRoutes(options: ScheduleOptions): Promise<ApiRoute[]> {
  const { origin, destination } = options;

  const url = new URL(`${SERVER_ORIGIN}/routes/q`);
  url.searchParams.append("src", origin);
  url.searchParams.append("dest", destination);

  return fetch(url.toString()).then(res => res.json());
}
