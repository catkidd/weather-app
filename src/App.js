import "./App.css";
import Forecast from "./components/Forecast";
import Inputs from "./components/Inputs";
import TemperatureAndDetails from "./components/TemperatureAndDetails";
import TimeAndLocation from "./components/TimeAndLocation";
import TopButtons from "./components/TopButtons";
import getFormattedWeatherData from "./services/getWeather.service";

function App() {
    const fetchWeather = async () => {
        const data = await getFormattedWeatherData({ q: "london" });
        console.log("🚀 ~ file: App.js:12 ~ fetchWeather ~ data:", data);
    };

    fetchWeather();

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

            <TimeAndLocation />
            <TemperatureAndDetails />

            <Forecast title="hourly forecast" />
            <Forecast title="daily forecast" />
        </div>
    );
}

export default App;
