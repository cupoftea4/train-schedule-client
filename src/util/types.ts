export type ScheduleOptions = {
  origin: string;
  destination: string;
  departureTime?: number;
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
  departureTime: number;
  arrivalTime: number;
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