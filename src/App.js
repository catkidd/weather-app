import "./App.css";
import Inputs from "./components/Inputs";
import TemperatureAndDetails from "./components/TemperatureAndDetails";
import TimeAndLocation from "./components/TimeAndLocation";
import TopButtons from "./components/TopButtons";
import getFormattedWeatherData from "./services/getWeatherService";
import { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toastifyService } from "./services/toastifyService";

function App() {
    const [querry, setQuerry] = useState({ q: "nepal" });
    const [units, setUnits] = useState("metric");
    const [weather, setWeather] = useState(null);

    useEffect(() => {
        const fetchWeather = async () => {
            const message = querry.q ? querry.q : "current location.";
            toastifyService.info("Fetching weather for " + message.toUpperCase());
             getFormattedWeatherData({ ...querry, units }).then((data) => {
                toastifyService.success(
                    `Sucessfully fetched weather for ${data.name}, ${data.country}.`
                );
                setWeather(data);
            }).catch((err)=>{
                toastifyService.error('Failed to fetch data for that city.'); 
            });
        };

        fetchWeather();
    }, [querry, units]);

    const formatBackground = () => {
        const threshold = units === "metric" ? 25 : 30;

        if (!weather) {
            return "from-cyan-700 to-blue-700";
        }

        if (weather.temp <= threshold) {
            return "from-cyan-700 to-blue-700";
        }

        return "from-yellow-700 to-orange-700";
    };

    return (
        <div
            className={`mx-auto 
                max-w-screen-md 
                mt-4 
                py-6 
                px-20 
                bg-gradient-to-br 
                from-cyan-700 
                to-blue-700 
                h-fit 
                shadow-xl 
                shadow-gray-500
                ${formatBackground()}`}>
            <TopButtons setQuerry={setQuerry} />
            <Inputs setQuerry={setQuerry} setUnits={setUnits} units={units} />

            {weather && (
                <div>
                    <TimeAndLocation weather={weather} />
                    <TemperatureAndDetails weather={weather} />

                    {/* <Forecast title="hourly forecast" items={weather.hourly} /> */}
                    {/* <Forecast title="daily forecast" items={weather.daily} /> */}
                </div>
            )}
            <ToastContainer />
        </div>
    );
}

export default App;
