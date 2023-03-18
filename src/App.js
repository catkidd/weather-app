import "./App.css";
import Forecast from "./components/Forecast";
import Inputs from "./components/Inputs";
import TemperatureAndDetails from "./components/TemperatureAndDetails";
import TimeAndLocation from "./components/TimeAndLocation";
import TopButtons from "./components/TopButtons";
import getFormattedWeatherData from "./services/getWeather.service";
import { useState, useEffect } from "react";

function App() {
    const [querry, setQuerry] = useState({ q: "berlin" });
    const [units, setUnits] = useState("metric");
    const [weather, setWeather] = useState(null);

    useEffect(() => {
        const fetchWeather = async () => {
            await getFormattedWeatherData({ ...querry, units }).then((data) => {
                setWeather(data);
            });
        };

        fetchWeather();
    }, [querry, units]);

    return (
        <div
            className="mx-auto 
                max-w-screen-md 
                mt-4 
                py-5 
                px-32 
                bg-gradient-to-br 
                from-cyan-700 
                to-blue-700 
                h-fit 
                shadow-xl 
                shadow-gray-500 ">
            <TopButtons />
            <Inputs />

            {weather && (
                <div>
                    <TimeAndLocation weather={weather} />
                    <TemperatureAndDetails weather={weather} />

                    <Forecast title="hourly forecast" />
                    <Forecast title="daily forecast" />
                </div>
            )}
        </div>
    );
}

export default App;
