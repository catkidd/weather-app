import React, { useState } from "react";
import { UilSearch, UilLocationPoint, UilCelsius, UilFahrenheit } from "@iconscout/react-unicons";
import { toast } from "react-toastify";

const Inputs = ({ setQuerry, units, setUnits }) => {
    const [city, setCity] = useState("");
    const errorMessage = "CITY NOT FOUND! Please enter a valid city name.";

    const handleSearchClick = (data) => {
        if (city !== "") {
            if (data.cod !== "202") {
                toast.error(errorMessage);
                setTimeout(() => {
                    setCity("");
                }, 4000);
            } else {
                setQuerry({ q: city });
                setTimeout(() => {
                    setCity("");
                }, 4000);
            }
        }
    };

    const handleLocationClick = () => {
        if (navigator.geolocation) {
            toast.info("Fetching users location");
            navigator.geolocation.getCurrentPosition((position) => {
                let lat = position.coords.latitude;
                let lon = position.coords.longitude;
                toast.success(`User's location fetched successfully!`);
                setCity(`${lat}, ${lon}`);

                setQuerry({
                    lat,
                    lon,
                });
                setTimeout(() => {
                    setCity("");
                }, 4000);
            });
        }
    };

    const handleUnitsChange = (e) => {
        const selectedUnit = e.currentTarget.name;

        if (units !== selectedUnit) {
            setUnits(selectedUnit);
        }
    };

    return (
        <div className="flex flex-row justify-between my-6">
            <div className="flex flex-row w-3/4 items-center justify-center space-x-4">
                <input
                    value={city}
                    onChange={(e) => {
                        setCity(e.currentTarget.value);
                        console.log(e.currentTarget.value);
                    }}
                    type="text"
                    placeholder="Search for city..."
                    className="text-xl font-light p-2 w-full shadow-xl focus:outline-none placeholder:lowercase capitalize"
                />
                <UilSearch
                    size={26}
                    className="text-white cursor-pointer transition ease-out hover:scale-125"
                    onClick={handleSearchClick}
                />
                <UilLocationPoint
                    size={26}
                    className="text-white cursor-pointer transition ease-out hover:scale-125"
                    onClick={handleLocationClick}
                />
            </div>
            <div className="flex flex-row w-1/4 items-center justify-center space-x-2">
                <button
                    name="metric"
                    className="text-xl text-white font-light transition ease-out hover:scale-110"
                    onClick={handleUnitsChange}>
                    <UilCelsius
                        size={20}
                        className="text-white cursor-pointer transition ease-out hover:scale-125"
                    />
                </button>
                <p className="text-xl text-white mx-1">|</p>
                <button
                    name="imperial"
                    className="text-xl text-white font-light transition ease-out hover:scale-110"
                    onClick={handleUnitsChange}>
                    <UilFahrenheit
                        size={20}
                        className="text-white cursor-pointer transition ease-out hover:scale-125"
                    />
                </button>
            </div>
        </div>
    );
};

export default Inputs;
