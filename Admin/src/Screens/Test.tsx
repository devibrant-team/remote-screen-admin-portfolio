import { useEffect, useState } from "react";

type WeatherData = {
  location: {
    name: string;
    country: string;
  };
  current: {
    temp_c: number;
    condition: {
      text: string;
      icon: string;
    };
  };
};

const WeatherAPIWidget = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const API_KEY = "1ff6c69adefb4838be9183514251407";
  const CITY = "Baalbek";

  useEffect(() => {
    fetch(
      `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${CITY}&aqi=no`
    )
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch weather data");
        return res.json();
      })
      .then((data) => {
        console.log("WeatherAPI response:", data); // 🔍 Inspect the full object
        setWeather(data);
      })

      .catch((err) => setError(err.message));
  }, []);

  if (error) {
    return <p className="text-red-600 text-center mt-4">{error}</p>;
  }

  if (!weather) {
    return <p className="text-center mt-4">Loading weather...</p>;
  }

  return (
    <div className="flex flex-col items-center mt-6 p-6 rounded-xl shadow-xl bg-white text-black max-w-sm mx-auto">
      <h2 className="text-lg font-semibold mb-2">
        {weather.location.name}, {weather.location.country}
      </h2>
      <img
        src={weather.current.condition.icon}
        alt={weather.current.condition.text}
      />
      <p className="text-xl font-bold">{weather.current.temp_c}°C</p>
      <p className="text-sm text-gray-600">{weather.current.condition.text}</p>
    </div>
  );
};

export default WeatherAPIWidget;
