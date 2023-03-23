import axios from "axios";
import { DateTime } from "luxon";

const API_KEY = "f1db162bd7ae92ff53e0e7439ec0cc95";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

const getWeatherService = (infoType, searchParams) => {
    const url = new URL(BASE_URL + "/" + infoType);
    url.search = new URLSearchParams({ ...searchParams, appid: API_KEY });

    return axios
        .get(url)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {});
};

const formatCurrentWeather = (data) => {
    if (!data) {
        return {};
    }
    const {
        coord: { lon, lat },
        main: { temp, feels_like, temp_min, temp_max, humidity, pressure },
        name,
        dt,
        cod,
        sys: { country, sunrise, sunset },
        weather,
        wind: { speed },
    } = data;

    const { main: description, icon } = weather[0];

    return {
        lat,
        lon,
        temp,
        feels_like,
        temp_min,
        temp_max,
        humidity,
        pressure,
        name,
        dt,
        country,
        sunrise,
        sunset,
        weather,
        speed,
        description,
        icon,
        cod,
    };
};

const formatForecastWeather = (data) => {
    let { timezone, daily, hourly } = data;

    if (!daily || !hourly) {
        return {};
    }

    daily = daily.slice(1, 6).map((d) => {
        return {
            title: formatToLocalTime(d.dt, timezone, "ccc"),
            icon: d.weather[0].icon,
            temp: d.temp.day,
        };
    });

    hourly = hourly.slice(1, 6).map((d) => {
        return {
            title: formatToLocalTime(d.dt, timezone, "hh:mm a"),
            icon: d.weather[0].icon,
            temp: d.temp,
        };
    });

    return { timezone, daily, hourly };
};

const getFormattedWeatherData = async (searchParams) => {
    const formattedCurrentWeather = await getWeatherService("weather", searchParams).then(
        formatCurrentWeather
    );

    const { lat, lon } = formattedCurrentWeather;

    const formattedForecastWeather = await getWeatherService("weather", {
        lat,
        lon,
        exclude: "current,minutely,alerts",
        units: searchParams.units,
    }).then(formatForecastWeather);

    return { ...formattedCurrentWeather, ...formattedForecastWeather };
};

const formatToLocalTime = (secs, zone, format = "cccc, dd LLL yyyy' | Local time: 'hh:mm a") => {
    return DateTime.fromSeconds(secs).setZone(zone).toFormat(format);
};

const iconUrlFromCode = (code) => `https://www.openweathermap.org/img/wn/${code}@2x.png`;

export default getFormattedWeatherData;

export { formatToLocalTime, iconUrlFromCode };
