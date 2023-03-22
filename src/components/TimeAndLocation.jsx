import React from "react";
import { formatToLocalTime } from "../services/getWeatherService";

const TimeAndLocation = ({ weather: { lat, lon, dt, timezone, name, country } }) => {
    return (
        <div>
            <div className="flex items-center justify-center my-6">
                <p className="text-white text-xl font-extralight">
                    {formatToLocalTime(dt, timezone)}
                </p>
            </div>
            <div className="flex items-center justify-center my-6 space-x-4">
                <p className="text-white text-3xl font-extralight">{`${name}, ${country}`}</p>
                <div className="flex flex-col items-center justify-center my-6">
                    <p className="text-white text-sm font-extralight">{`Lat: ${lat}`}</p>
                    <p className="text-white text-sm font-extralight">{`Lon: ${lon}`}</p>
                </div>
            </div>
        </div>
    );
};

export default TimeAndLocation;
