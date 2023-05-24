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

export function sortByDepartureTime<T extends { departureTime: Date }>(values: T[], order: 'asc' | 'desc' = 'asc') {
  return values.sort((a, b) => {
    return order === 'asc'
      ? a.departureTime.valueOf() - b.departureTime.valueOf()
      : b.departureTime.valueOf() - a.departureTime.valueOf();
  });
}

export function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  const today = new Date();

  if (date.toDateString() === today.toDateString()) {
    return "Today";
  }

  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  if (date.toDateString() === yesterday.toDateString()) {
    return 'Yesterday';
  }

  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  if (date.toDateString() === tomorrow.toDateString()) {
    return 'Tomorrow';
  }

  if (date.getFullYear() === today.getFullYear()) {
    return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
  }

  return date.toLocaleDateString();
}