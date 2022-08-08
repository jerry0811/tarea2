import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import LoadingScreen from "./LoadingScreen";

const Card = ({ lat, lon }) => {
	const [weather, setWeather] = useState();
	const [temperture, setTemperture] = useState();
	const [isCelsius, setIsCelsius] = useState(true);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		if (lon) {
			const ApiKey = "913dc240a8d70e4aaadcdc41c8724e6c";
			const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${ApiKey}`;

			axios
				.get(URL)
				.then((res) => {
					setWeather(res.data);
					const temp = {
						farenheit: `${Math.round(res.data.main.temp - 273.15)} °C`,
						celsius: `${Math.round(
							((res.data.main.temp - 273.15) * 9) / 5 + 32
						)} °F`,
					};
					setTemperture(temp);
					setIsLoading(false);
				})

				.catch((err) => console.log(err));
		}
	}, [lat, lon]);

	console.log(weather);

	const handleClick = () => setIsCelsius(!isCelsius);

	if (isLoading) {
		return <LoadingScreen />;
	} else {
		return (
			<article className="weather-container">
				<div className="weather-container-titulo">
					<h1>Weather App</h1>
					<h2>{`${weather?.name}, ${weather?.sys.country} `}</h2>
				</div>
				<div className="weather-container-info">
					<img
						src={
							weather &&
							`http://openweathermap.org/img/wn/${weather?.weather[0].icon}@4x.png`
						}
						alt=""
					/>
					<div>
						<h3>&#34;{weather?.weather[0].description}&#34;</h3>
						<ul>
							<li>
								<span>Wind Speed </span>
								{weather?.wind.speed}
							</li>
							<li>
								<span>Clouds </span>
								{weather?.clouds.all} %
							</li>
							<li>
								<span>Pressure </span>
								{weather?.main.pressure} hPa
							</li>
						</ul>
					</div>
				</div>
				<h2 className="weather-container-temperture">
					{isCelsius ? temperture?.celsius : temperture?.farenheit}
				</h2>
				<button onClick={handleClick}>
					{isCelsius ? "Change to °F" : "Change to °C"}
				</button>
			</article>
		);
	}
};

export default Card;
