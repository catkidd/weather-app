import "./App.css";
// import Forecast from "./components/Forecast";
import Inputs from "./components/Inputs";
import TemperatureAndDetails from "./components/TemperatureAndDetails";
import TimeAndLocation from "./components/TimeAndLocation";
import TopButtons from "./components/TopButtons";
import getFormattedWeatherData from "./services/getWeather.service";
import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
    const [querry, setQuerry] = useState({ q: "nepal" });
    const [units, setUnits] = useState("metric");
    const [weather, setWeather] = useState(null);

    useEffect(() => {
        const fetchWeather = async () => {
            const message = querry.q ? querry.q : "current location.";
            toast.info("Fetching weather for " + message.toUpperCase());
            await getFormattedWeatherData({ ...querry, units }).then((data) => {
                toast.success(`Sucessfully fetched weather for ${data.name}, ${data.country}.`);
                setWeather(data);
                console.log(data);
            });
        };

        fetchWeather();
    }, [querry, units]);

    const formatBackground = () => {
        const threshold = units === "metric" ? 20 : 25;

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
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
        </div>
    );
}

export default App;
