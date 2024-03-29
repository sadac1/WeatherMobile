/*
Previously, this was going to be the second page of the app where we show the plan. 
It might be hard to pass data from one component to another, though, so for simplicity's 
sake, putting the second part in StopsData as well. Maybe can split it up later to improve
readability.
 */ 

import React, {Component} from 'react';
import {useState} from 'react';
import StopsData from './StopsData';



//props parameter needs to take in a list of data for each location
const WeatherInfo = (props) => {
    const {location, time, weather} = props;
    //const [location, setLocation] = useState("location");
    //const [time, setTime] = useState("time");
    //const [temperature, setTemperature] = useState("temp");//weather[0];
    //const [precipitation, setPrecipitation] = useState("precip");//weather[1];
    //const [windSpeed, setWindSpeed] = useState("wind");//weather[2];
    //future implementation: recommendations and weather icon

    //setLocation(location_);
    //setTime(time_);
   // setTemperature(weather[0])
    //setPrecipitation(weather[1])
    //setWindSpeed(weather[2])
    //these will be displayed visually
    const [formattedLocTime, setFLT] = useState(location + " at " + time)
    const [formattedWeatherData, setFWD] = useState(weather[0]+ "F, " + "P: " + weather[1] + "%,  " + "W: " + weather[2] + "mph")
    return (
        <>
        <div>
            <form>
                <input type="StartLoc" value={formattedLocTime} readOnly={true} style={{width: "370px", height: "50px"}}/>
                <input type="StartLoc" value={formattedWeatherData} readOnly={true} style={{width: "370px", height: "50px"}}/>
            </form>
        </div>
        </>
    );
}

export default WeatherInfo;