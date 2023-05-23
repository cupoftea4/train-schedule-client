import { ApiRoute, DatalistOption, Route } from "./types";

export function toClientRoute(apiRoute: ApiRoute): Route {
  return {
    ...apiRoute,
    departureTime: new Date(apiRoute.departureTime),
    arrivalTime: new Date(apiRoute.arrivalTime),
  }
}

export function toDataListOption<T extends { id: string | number }, K extends keyof T>(obj: T | string, valueKey?: K): DatalistOption {
  if (typeof obj === 'string') {
    return {
      id: obj,
      value: obj,
    }
  }
  return {
    id: obj.id.toString(),
    value: valueKey ? obj[valueKey] as unknown as string : obj.id.toString(),
  };
}

export function formatTime(date: Date) : string {
  return date.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
}

export function calculateMinuteDifference(startDate: Date, endDate: Date): number {
  const millisecondsPerMinute = 60000; // 1000 milliseconds * 60 seconds
  return Math.abs(Math.floor((endDate.getTime() - startDate.getTime()) / millisecondsPerMinute));
}