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
const WeatherInfo = (location_, time_, weather) => {
    const location = location_;
    const time = time_;
    const temperature = weather.temperature;
    const precipitation = weather.precipitation;
    const windSpeed = weather.windSpeed;
    //future implementation: recommendations and weather icon

    //these will be displayed visually
    const formattedLocTime = location + " \n" + time
    const formattedWeatherData = temperature + "F\n" + "P: " + precipitation + "% " + "W: " + windSpeed + "mph"
    return (
        <>
        <div>
            <form>
                <input type="StartLoc" value={formattedLocTime} readOnly={true}/>
                <input type="StartLoc" value={formattedWeatherData} readOnly={true}/>
            </form>
        </div>
        </>
    );
}

export default WeatherInfo;