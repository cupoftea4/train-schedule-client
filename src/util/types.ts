export type ScheduleOptions = {
  origin: string;
  destination: string;
  departureTime?: string;
  people?: number;
}


export type TrainStation = {
  id: number;
  name: string;
  city: string;
}


export type ApiRoute = {
  id: number;
  originStation: TrainStation;
  destinationStation: TrainStation;
  departureTime: string;
  arrivalTime: string;
  distance: number;
  price: number;
}

export type Route = Omit<ApiRoute, 'departureTime' | 'arrivalTime'> & { 
  departureTime: Date;
  arrivalTime: Date;
};

export type DatalistOption = {
  id: string;
  value: string;
}