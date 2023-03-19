import React from "react";
import { iconUrlFromCode } from "../services/getWeather.service";

const Forecast = (props, items) => {

    return (
        <div>
            <div className="flex items-center justify-start mt-6">
                <p className="text-white font-medium uppercase">{props.title}</p>
            </div>
            <hr className="my-2" />

            <div className=" flex flex-row items-center justify-between text-white">
                
                <div className="flex flex-col items-center justify-center">
                    <p className="font-light text-sm">{items.title}</p>
                    <img
                        src={iconUrlFromCode()}
                        className="w-12 m-1"
                        alt=""
                    />
                    {items && items.temp && (
                        <p className="font-medium">{`${items.temp.toFixed()}°`}</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Forecast;
