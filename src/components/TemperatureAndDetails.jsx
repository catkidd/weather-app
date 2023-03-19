import React from "react";
import {
    UilArrowUp,
    UilArrowDown,
    UilTemperature,
    UilTear,
    UilWind,
    UilSun,
    UilSunset,
    UilDashboard,
} from "@iconscout/react-unicons";
import { formatToLocalTime, iconUrlFromCode } from "../services/getWeather.service";

const TemperatureAndDetails = ({
    weather: {
        temp,
        temp_min,
        temp_max,
        icon,
        sunrise,
        sunset,
        speed,
        humidity,
        pressure,
        feels_like,
        timezone,
        description,
    },
}) => {
    return (
        <div>
            <div className="flex items-center justify-center py-6 text-2xl text-cyan-300">
                <p>{description}</p>
            </div>

            <div className="flex flex-row items-center justify-between text-white py-3">
                <img src={iconUrlFromCode(icon)} alt="red-sun" className="w-28 w" />
                <p className=" text-6xl">{`${temp.toFixed()}°`}</p>
                <div className="flex flex-col space-y-2">
                    <div className="flex items-center justify-center font-light text-base">
                        <UilTemperature size={22} className="mr-1" />
                        Feels like:{" "}
                        <span className="font-medium ml-1">{`${feels_like.toFixed()}°`}</span>
                    </div>

                    <div className="flex items-center justify-center font-light text-base">
                        <UilTear size={22} className="mr-1" />
                        Humidity:{" "}
                        <span className="font-medium ml-1">{`${humidity.toFixed()}%`}</span>
                    </div>

                    <div className="flex items-center justify-center font-light text-base">
                        <UilWind size={22} className="mr-1" />
                        Wind: <span className="font-medium ml-1">{`${speed.toFixed()} m/s`}</span>
                    </div>

                    <div className="flex items-center justify-center font-light text-base">
                        <UilDashboard size={22} className="mr-1" />
                        Pressure:{" "}
                        <span className="font-medium ml-1">{`${pressure.toFixed()}hPa`}</span>
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-center space-x-2 text-white text-base py-3">
                <UilSun />
                <p className="font-light">
                    Rise:{" "}
                    <span className="font-medium ml-1">
                        {formatToLocalTime(sunrise, timezone, "hh:mm a")}
                    </span>
                </p>
                <p className="font-light">|</p>
                <UilSunset />
                <p className="font-light">
                    Set:{" "}
                    <span className="font-medium ml-1">
                        {formatToLocalTime(sunset, timezone, "hh:mm a")}
                    </span>
                </p>
                <p className="font-light">|</p>
                <UilArrowUp />
                <p className="font-light">
                    High: <span className="font-medium ml-1">{`${temp_max.toFixed()}°`}</span>
                </p>
                <p className="font-light">|</p>
                <UilArrowDown />
                <p className="font-light">
                    Low: <span className="font-medium ml-1">{`${temp_min.toFixed()}°`}</span>
                </p>
            </div>
        </div>
    );
};

export default TemperatureAndDetails;
