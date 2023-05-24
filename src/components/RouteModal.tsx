import { FC, useMemo, useState } from "react";
import VirtualizedDataList from "./VirtualizedDatalist";

import useOnClickOutside from "../hooks/useOnOutsideClick";
import { toast } from 'react-toastify';

import { toDataListOption } from "../util/helpers";
import { TrainStation } from "../util/types";
import { createRoute } from "../util/api";

type OwnProps = {
  stations: TrainStation[];
  closeModal: () => void;
}

const RouteModal: FC<OwnProps> = ({stations, closeModal}) => {
  const [formData, setFormData] = useState({
    origin: '',
    destination: '',
    departureTime: '',
    arrivalTime: '',
    distance: '',
    price: '',
  });

  const formRef = useOnClickOutside<HTMLDivElement>(closeModal);

  const stationOptions = useMemo(() => 
    stations.map(station => toDataListOption(station, "name")), [stations]
  );

  const handleInputChange = <T extends { name: string, value: string}>(val: T) => {
    const { name, value } = val;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const origin = stations.find(option => option.name === formData.origin)!.id;
    const destination = stations.find(option => option.name === formData.destination)!.id;
    const res = {...formData, originStationId: origin, destinationStationId: destination, 
      departureTime: new Date(formData.departureTime).toISOString(), 
      arrivalTime: new Date(formData.arrivalTime).toISOString(),
      distance: Number(formData.distance),
      price: Number(formData.price)
    };
    createRoute(res).then(() => toast.success("Route created successfully"));
    closeModal();
  };

  return (
    <div>
        <div className="modal" >
          <div className="modal-content" ref={formRef}>
            
            <span className="header">
              <h3>Create Route</h3>
              <button onClick={closeModal} className="close">&times;</button>
            </span>
            <form onSubmit={handleSubmit}>
              <label>
                Origin:
                <VirtualizedDataList 
                  autoFocus 
                  outerValue={formData.origin}
                  options={stationOptions.filter(option => option.id !== formData.destination.toString())} 
                  onSelect={({value}) => handleInputChange({name: "origin", value})}
                />
              </label>
              <label>
                Destination:
                <VirtualizedDataList 
                  autoFocus 
                  outerValue={formData.destination}
                  options={stationOptions.filter(option => option.id !== formData.destination.toString())} 
                  onSelect={({value}) => handleInputChange({name: "destination", value})}
                />
              </label>
              <label>
                Departure Time:
                <input
                  type="date"
                  name="departureTime"
                  value={formData.departureTime}
                  onChange={({target}) => handleInputChange(target)}
                />
              </label>
              <label>
                Arrival Time:
                <input
                  type="date"
                  name="arrivalTime"
                  value={formData.arrivalTime}
                  onChange={({target}) => handleInputChange(target)}
                />
              </label>
              <label>
                Distance:
                <input
                  type="text"
                  name="distance"
                  value={formData.distance}
                  onChange={({target}) => handleInputChange(target)}
                />
              </label>
              <label>
                Price:
                <input
                  type="text"
                  name="price"
                  value={formData.price}
                  onChange={({target}) => handleInputChange(target)}
                />
              </label>
              <button className="primary-btn" type="submit">Submit</button>
            </form>
          </div>
        </div>
    </div>
  );
};

export default RouteModal;