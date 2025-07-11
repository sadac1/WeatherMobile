//import Form from 'react-bootstrap/Form';
import React, {Component} from 'react';
import {useState, useEffect} from 'react';
import WeatherInfo from './WeatherInfo';
import DatePicker from 'react-datepicker'; // Import DatePicker
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment'; // Importing Moment JS



/*
const WeatherInfo = (props) => {
    const location = props.location;
    const time = props.time;
    const temperature = props.temperature;
    const precipitation = props.precipitation;
    const windSpeed = props.windSpeed;
}*/


function StopsData(){
    console.log('StopsData component rendering');
    
    //these are all the variables that the user will input. 
    //in order to change the first parameter, use the second parameter. Ex. setTime(1:30) will change time to 1:30
    // useState("estimated start time") <- inside quotes is the default thing that shows. You can see it with npm run dev.
    const [time, setTime] = useState(null); // Change to null since we're using time
    const [startDate, setStartDate] = useState(null); // Change to null since we're using date
    /*const [time, setTime] = useState("Estimated Start Time");
    const [startDate, setStartDate] = useState("Estimated Start Date");
    */
    const [start, setStart] = useState('');
    const [stateId, setStateId] = useState('');
    const [stop1, setStop1] = useState('');
    const [stop2, setStop2] = useState('');
    const [end, setEnd] = useState('');

    const [timeAtStop, setTimeAtStop] = useState(0.5); // Time at each stop

//Time of arrival at stop 1, stop 2, end
    const [t2, setT2] = useState("")
    const [t3, setT3] = useState("")
    const [t4, setT4] = useState("")

//weather at start, stop1, stop2, end
    const [weather1, setWeather1] = useState({});
    const [weather2, setWeather2] = useState({});
    const [weather3, setWeather3] = useState({});
    const [weather4, setWeather4] =useState({});

    const [disp1, setDisp1] = useState("");
    const [w1, setW1] = useState("");
    const [disp2, setDisp2] = useState("");
    const [w2, setW2] = useState("");
    const [disp3, setDisp3] = useState("");
    const [w3, setW3] = useState("");
    const [disp4, setDisp4] = useState("");
    const [w4, setW4] = useState("");

    //how stops will appear and disappear with plus button<- not implemented yet
    //const [showStop, setShowStop] = React.useState(false)

    //following array stores all the data from the user. These values get updated in the handleChange functions
    //Change the data struct to match the required number of stops
    //let data = [{time}, {startDate}, {start}, {stop1}, {stop2}, {end}]

    //this function console.logs the current values in data and calls getPlan, which displays the plan in the lower box.
    const handleSubmitGetPlan = async (event) => {
        event.preventDefault();
    
        try {
            // Call getPlan with the required parameters
            await getPlan(start, stop1, stop2, end, startDate, time);
    
            // Log the fetched weather data for verification
            console.log({ weather1, weather2, weather3, weather4 });
    
            // Additional logic after plan creation (if needed)
            // For example, you might want to update the UI, show a confirmation message, etc.
        } catch (error) {
            console.error('Error in handleSubmitGetPlan:', error);
        }
    };
    //Note: find out how to make the default text disappear when someone starts typing
    //Currently, this function is not being used.  
   /* const handleClick = (event0) => {
        event0.preventDefault();
        console.log("clicked")
        //[time, setTime] = useState("");
        //[start, setStart] = useState("");
    }
    */

    //following handleChange functions update the textboxes to display what the user inputs
    // and update the values in the data array above : time, startDate, start, stop1, stop2, end
    const handleChangeTime = (selectedTime) => {
        setTime(selectedTime);
    };

    //handling change of the start and end date
    const handleChangeStartDate = (selectedDate) => {
        setStartDate(selectedDate);
    };
    //set the Max date user could pick to be 10 days from the current date 
    const maxDate = moment().add(5,'days').toDate();

    const handleChangeStart = (event2) => {
        setStart(event2.target.value)
    }
    const handleChangeStop1 = (event3) => {
        setStop1(event3.target.value)
    }
    const handleChangeStop2 = (event4) => {
        setStop2(event4.target.value)
    }    
    const handleChangeEnd = (event5) => {
        setEnd(event5.target.value)
    }
    const handleStateIdChange = (event) => {
        setStateId(event.target.value);
      };

    //For adding stops with plus-button click. This is not being used right now. 
    /*const handlePlusButtonClick = (event7) => {
        console.log("Add another stop")
        setShowStop(true)
    }
    */

    const statement = 'Describe Your Journey';

    //Not being used right now
    //currently button to add the stop doesn't work, so the stop is just going to be there already.
    /*const Stops = () => {
        <div>
        <form>
            <input type = "text" value = {stop} onChange = {handleChangeStop1}/>
        </form>
        </div>
    }
    */
    
    const getPlan = async (start, stop1, stop2, end, startDate, time) => {
        try {
            const isoTime = moment(startDate).format(); // Format the date and time
    
            // Fetch weather and calculate times for Stop 1
            const weatherData1 = await getWeather(start, stateId, 1, startDate, time);
            setWeather1(weatherData1);  // Update weather1 state with fetched data
    
            const travelTime1 = await getTravelInfo(start, stop1);
            const calculatedT2 = addTime(isoTime, travelTime1);
            setT2(calculatedT2);  // Update t2 state with calculated time
    
            setDisp1(`Leaving from ${start} at: ${time.substring(11,16)}`);
            setW1(`${weatherData1.temp} F, P: ${weatherData1.prec} %, W: ${weatherData1.wind} mph`);
    
            // Fetch weather and calculate times for Stop 2
            const weatherData2 = await getWeather(stop1, stateId, 2, startDate, calculatedT2);
            setWeather2(weatherData2);
    
            const travelTime2 = await getTravelInfo(stop1, stop2);
            const calculatedT3 = addTime(calculatedT2, travelTime2);
            setT3(calculatedT3);
    
            setDisp2(`Reaching ${stop1} at: ${calculatedT2.substring(11,16)}`);
            setW2(`${weatherData2.temp} F, P: ${weatherData2.prec} %, W: ${weatherData2.wind} mph`);
    
            // Fetch weather and calculate times for Stop 3 (if applicable)
            const weatherData3 = await getWeather(stop2, stateId, 3, startDate, calculatedT3);
            setWeather3(weatherData3);
    
            const travelTime3 = await getTravelInfo(stop2, end);
            const calculatedT4 = addTime(calculatedT3, travelTime3);
            setT4(calculatedT4);
    
            setDisp3(`Reaching ${stop2} at: ${calculatedT3.substring(11,16)}`);
            setW3(`${weatherData3.temp} F, P: ${weatherData3.prec} %, W: ${weatherData3.wind} mph`);
    
            // Fetch weather and display information for End Destination
            const weatherData4 = await getWeather(end, stateId, 4, startDate, calculatedT4);
            setWeather4(weatherData4);
    
            setDisp4(`Reaching ${end} at: ${calculatedT4.substring(11,16)}`);
            setW4(`${weatherData4.temp} F, P: ${weatherData4.prec} %, W: ${weatherData4.wind} mph`);
    
        } catch (error) {
            console.error('Error in getPlan:', error);
        }
    };
    /* addTime
    Takes in inital time (hours as decimal)
    Adds both times and returns new time as (hours as decimal)
    */
   /* const addTime = (time1, timeToTravel) => {
        console.log("inputs to time1 and time to travel : " + time1 + " " + timeToTravel)
        //return time1 + timetoTravel (this will have to be formatted properly)
        //let timeToTravelInHours = helperGetHoursFormatted(timeToTravel);
        //time1 is already formatted, so now add two new and then send.
        console.log("hope this works " + new Date(new Date(time1).getTime() + timeToTravel * 60 * 60 * 1000).toISOString())
        return new Date(new Date(time1).getTime() + timeToTravel * 60 * 60 * 1000).toISOString();
    }
    */
    const addTime = (time1, timeToTravel) => {
        return moment(time1).add(timeToTravel, 'seconds').toISOString();
    };

       /*
        Open Cage API this is to convert City Name's and State ID's into Latitude and Longitude for OSRM
        API to use
       */
      
// Function to fetch coordinates from OpenCage Geocoding API
// Function to fetch coordinates from OpenCage Geocoding API
const getCoordinates = async (cityName, stateID) => {
    const apiKey = 'e66c4cbe3e0c429c94fa41294f238339'; // Replace with your OpenCage API key
    const query = `${encodeURIComponent(cityName)},${encodeURIComponent(stateID)}`;
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${query}&key=${apiKey}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Network response was not ok (${response.statusText})`);
        }
        const data = await response.json();
        if (data.results.length > 0) {
            const { lat, lng } = data.results[0].geometry; // Latitude and longitude in decimal degrees
            return { lat, lng };
        } else {
            throw new Error('Location not found');
        }
    } catch (error) {
        console.error('Error fetching coordinates:', error);
        return null;
    }
};

const getTravelInfo = async (startCity, endCity) => {
    const startCoords = await getCoordinates(startCity);
    const endCoords = await getCoordinates(endCity);

    if (!startCoords || !endCoords) {
        console.error('Error fetching coordinates for one or both cities');
        return;
    }

    const url = `http://router.project-osrm.org/route/v1/driving/${startCoords.lng},${startCoords.lat};${endCoords.lng},${endCoords.lat}?overview=false`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Network response was not ok (${response.statusText})`);
        }
        const data = await response.json();
        if (data.code !== 'Ok') {
            throw new Error(`Error from OSRM API: ${data.message}`);
        }

        const route = data.routes[0];
        const durationInSeconds = route.duration;

        // Convert the duration to the desired format
        const formattedDuration = convertTime(durationInSeconds);

        // Return only the formatted duration
        return formattedDuration;
    } catch (error) {
        console.error('Error fetching travel info:', error);
        return null;
    }
};
//this function is going to convert the seconds it takes from one location to the other to a 12hour format and add it to time set by the user 
/*const convertTime = (seconds) => {
    // Convert seconds to hours and minutes
    const hours = Math. floor(seconds /3600);
    const minutes = Math. floor((seconds % 3600)/60);
    


    if (time) {
        //current time in 12 hour format
        let [t, modifier] = time.split(' ');
        let [h, m] = t.split(':').map(Number);
        
        // Convert 12-hour format to 24-hour format
        if (modifier === 'PM' && h !== 12) {
            h += 12;
        } else if (modifier === 'AM' && h === 12) {
            h = 0;
        }
        //add travel time to current time 
        h += hours;
        m += minutes;

        // Adjust time if needed
        if (m >= 60) {
            m -= 60;
            h += 1;
        }
        if (h >= 24) {
            h -= 24;
        }

        modifier = h >= 12 ? 'PM' : 'AM';
        if (h > 12) {
            h -= 12;
        } else if (h === 0) {
            h = 12;
        }

        // Format the updated time
        const updatedTime = `${h}:${m < 10 ? '0' : ''}${m} ${modifier}`;
        
        // Update the state
        setTime(updatedTime);

        return updatedTime;
    }
    return `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
};
*/
const convertTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return { hours, minutes };
};
    


const getWeather = async (city, state, point, targetDate, targetHour) => {
    const apiKey = 'faed5daaf72642b5aebc57e4f90b402f'; // Ensure the API key is a string

    const url = `https://api.weatherbit.io/v2.0/forecast/hourly?city=${encodeURIComponent(city)}&state=${encodeURIComponent(state)}&key=${apiKey}&include=minutely,alerts`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Network response was not ok (${response.statusText})`);
        }
        const data = await response.json();

        const targetDateString = moment(targetDate).format('YYYY-MM-DD');

        // Filter the forecast for the specified hour on the target date
        const targetForecast = data.data.find(hourlyData => {
            const dateTime = new Date(hourlyData.timestamp_local);
            return dateTime.getHours() === targetHour && moment(dateTime).format('YYYY-MM-DD') === targetDateString;
        });

        if (targetForecast) {
            const { temp, precip, wind_spd } = targetForecast;
            return { temp, prec: precip, wind: wind_spd };
        } else {
            console.log(`No forecast data available for ${targetDate} at ${targetHour}:00.`);
            return {};
        }
    } catch (error) {
        console.error('There was an error fetching the weather data:', error);
        return {};
    }
};
    
    
    return (<>
        <h2>{statement}</h2>
        <div>
            <form onSubmit = {handleSubmitGetPlan} /*onClick = {handleClick}*/>
                <div>
                        <label>Start Time:</label>
                        <DatePicker
                            className= "input-field"
                            selected={time}
                            onChange={handleChangeTime}
                            showTimeSelect
                            showTimeSelectOnly
                            timeIntervals={15}
                            dateFormat="h:mm aa"
                            placeholderText="Select Time"
                        />
                    </div>

                    <div>
                        <label>Start Date:</label>
                        <DatePicker
                            className= "input-field"
                            selected={startDate}
                            onChange={handleChangeStartDate}
                            dateFormat="MMMM d, yyyy"
                            placeholderText="Select Start Date"
                            minDate = {moment().toDate()}
                            maxDate = {maxDate}
                        />
                    </div>


                <input className = "input-field" type="text"  placeholder="Enter City" value={start} onChange={handleChangeStart}/>
                <select value={stateId} onChange={handleStateIdChange}>
                            <option value="">Select state</option>
                            <option value="AL">AL</option>
                            <option value="AK">AK</option>
                            <option value="AZ">AZ</option>
                            <option value="AR">AR</option>
                            <option value="CA">CA</option>
                            <option value="CO">CO</option>
                            <option value="CT">CT</option>
                            <option value="DE">DE</option>
                            <option value="FL">FL</option>
                            <option value="GA">GA</option>
                            <option value="HI">HI</option>
                            <option value="ID">ID</option>
                            <option value="IL">IL</option>
                            <option value="IN">IN</option>
                            <option value="IA">IA</option>
                            <option value="KS">KS</option>
                            <option value="KY">KY</option>
                            <option value="LA">LA</option>
                            <option value="ME">ME</option>
                            <option value="MD">MD</option>
                            <option value="MA">MA</option>
                            <option value="MI">MI</option>
                            <option value="MN">MN</option>
                            <option value="MS">MS</option>
                            <option value="MO">MO</option>
                            <option value="MT">MT</option>
                            <option value="NE">NE</option>
                            <option value="NV">NV</option>
                            <option value="NH">NH</option>
                            <option value="NJ">NJ</option>
                            <option value="NM">NM</option>
                            <option value="NY">NY</option>
                            <option value="NC">NC</option>
                            <option value="ND">ND</option>
                            <option value="OH">OH</option>
                            <option value="OK">OK</option>
                            <option value="OR">OR</option>
                            <option value="PA">PA</option>
                            <option value="RI">RI</option>
                            <option value="SC">SC</option>
                            <option value="SD">SD</option>
                            <option value="TN">TN</option>
                            <option value="TX">TX</option>
                            <option value="UT">UT</option>
                            <option value="VT">VT</option>
                            <option value="VA">VA</option>
                            <option value="WA">WA</option>
                            <option value="WV">WV</option>
                            <option value="WI">WI</option>
                            <option value="WY">WY</option>
                        </select>
                <br></br>
                <input className = "input-field" type = "text" placeholder="Enter Stop 1" value = {stop1} onChange = {handleChangeStop1}/>
                <select value={stateId} onChange={handleStateIdChange}>
                            <option value="">Select state</option>
                            <option value="AL">AL</option>
                            <option value="AK">AK</option>
                            <option value="AZ">AZ</option>
                            <option value="AR">AR</option>
                            <option value="CA">CA</option>
                            <option value="CO">CO</option>
                            <option value="CT">CT</option>
                            <option value="DE">DE</option>
                            <option value="FL">FL</option>
                            <option value="GA">GA</option>
                            <option value="HI">HI</option>
                            <option value="ID">ID</option>
                            <option value="IL">IL</option>
                            <option value="IN">IN</option>
                            <option value="IA">IA</option>
                            <option value="KS">KS</option>
                            <option value="KY">KY</option>
                            <option value="LA">LA</option>
                            <option value="ME">ME</option>
                            <option value="MD">MD</option>
                            <option value="MA">MA</option>
                            <option value="MI">MI</option>
                            <option value="MN">MN</option>
                            <option value="MS">MS</option>
                            <option value="MO">MO</option>
                            <option value="MT">MT</option>
                            <option value="NE">NE</option>
                            <option value="NV">NV</option>
                            <option value="NH">NH</option>
                            <option value="NJ">NJ</option>
                            <option value="NM">NM</option>
                            <option value="NY">NY</option>
                            <option value="NC">NC</option>
                            <option value="ND">ND</option>
                            <option value="OH">OH</option>
                            <option value="OK">OK</option>
                            <option value="OR">OR</option>
                            <option value="PA">PA</option>
                            <option value="RI">RI</option>
                            <option value="SC">SC</option>
                            <option value="SD">SD</option>
                            <option value="TN">TN</option>
                            <option value="TX">TX</option>
                            <option value="UT">UT</option>
                            <option value="VT">VT</option>
                            <option value="VA">VA</option>
                            <option value="WA">WA</option>
                            <option value="WV">WV</option>
                            <option value="WI">WI</option>
                            <option value="WY">WY</option>
                        </select>
                <br></br>
                <input className = "input-field" type = "text"  placeholder="Enter Stop 2" value = {stop2} onChange = {handleChangeStop2}/>
                <select value={stateId} onChange={handleStateIdChange}>
                            <option value="">Select state</option>
                            <option value="AL">AL</option>
                            <option value="AK">AK</option>
                            <option value="AZ">AZ</option>
                            <option value="AR">AR</option>
                            <option value="CA">CA</option>
                            <option value="CO">CO</option>
                            <option value="CT">CT</option>
                            <option value="DE">DE</option>
                            <option value="FL">FL</option>
                            <option value="GA">GA</option>
                            <option value="HI">HI</option>
                            <option value="ID">ID</option>
                            <option value="IL">IL</option>
                            <option value="IN">IN</option>
                            <option value="IA">IA</option>
                            <option value="KS">KS</option>
                            <option value="KY">KY</option>
                            <option value="LA">LA</option>
                            <option value="ME">ME</option>
                            <option value="MD">MD</option>
                            <option value="MA">MA</option>
                            <option value="MI">MI</option>
                            <option value="MN">MN</option>
                            <option value="MS">MS</option>
                            <option value="MO">MO</option>
                            <option value="MT">MT</option>
                            <option value="NE">NE</option>
                            <option value="NV">NV</option>
                            <option value="NH">NH</option>
                            <option value="NJ">NJ</option>
                            <option value="NM">NM</option>
                            <option value="NY">NY</option>
                            <option value="NC">NC</option>
                            <option value="ND">ND</option>
                            <option value="OH">OH</option>
                            <option value="OK">OK</option>
                            <option value="OR">OR</option>
                            <option value="PA">PA</option>
                            <option value="RI">RI</option>
                            <option value="SC">SC</option>
                            <option value="SD">SD</option>
                            <option value="TN">TN</option>
                            <option value="TX">TX</option>
                            <option value="UT">UT</option>
                            <option value="VT">VT</option>
                            <option value="VA">VA</option>
                            <option value="WA">WA</option>
                            <option value="WV">WV</option>
                            <option value="WI">WI</option>
                            <option value="WY">WY</option>
                        </select>
                <br></br>
                <input className = "input-field" type="text" placeholder="Enter Destination" value={end} onChange={handleChangeEnd}/>
                <select value={stateId} onChange={handleStateIdChange}>
                            <option value="">Select state</option>
                            <option value="AL">AL</option>
                            <option value="AK">AK</option>
                            <option value="AZ">AZ</option>
                            <option value="AR">AR</option>
                            <option value="CA">CA</option>
                            <option value="CO">CO</option>
                            <option value="CT">CT</option>
                            <option value="DE">DE</option>
                            <option value="FL">FL</option>
                            <option value="GA">GA</option>
                            <option value="HI">HI</option>
                            <option value="ID">ID</option>
                            <option value="IL">IL</option>
                            <option value="IN">IN</option>
                            <option value="IA">IA</option>
                            <option value="KS">KS</option>
                            <option value="KY">KY</option>
                            <option value="LA">LA</option>
                            <option value="ME">ME</option>
                            <option value="MD">MD</option>
                            <option value="MA">MA</option>
                            <option value="MI">MI</option>
                            <option value="MN">MN</option>
                            <option value="MS">MS</option>
                            <option value="MO">MO</option>
                            <option value="MT">MT</option>
                            <option value="NE">NE</option>
                            <option value="NV">NV</option>
                            <option value="NH">NH</option>
                            <option value="NJ">NJ</option>
                            <option value="NM">NM</option>
                            <option value="NY">NY</option>
                            <option value="NC">NC</option>
                            <option value="ND">ND</option>
                            <option value="OH">OH</option>
                            <option value="OK">OK</option>
                            <option value="OR">OR</option>
                            <option value="PA">PA</option>
                            <option value="RI">RI</option>
                            <option value="SC">SC</option>
                            <option value="SD">SD</option>
                            <option value="TN">TN</option>
                            <option value="TX">TX</option>
                            <option value="UT">UT</option>
                            <option value="VT">VT</option>
                            <option value="VA">VA</option>
                            <option value="WA">WA</option>
                            <option value="WV">WV</option>
                            <option value="WI">WI</option>
                            <option value="WY">WY</option>
                        </select>
                <br></br>
                <br></br>
                <input className = "get-plan" type="submit" value = "Get Plan!" style={{width: "75px", height: "30px"}}/>
                <br></br>
                <br></br>
            </form>
        </div>
        <h2>Happy Travels!</h2>
        <div>
            <input className = "output-box" type="text" value={disp1} readOnly = {true} style={{width: "200px", height: "50px"}}/>
            <input className = "output-box" type="text" value={w1} readOnly = {true} style={{width: "200px", height: "50px"}}/>
            <br></br>
            <br></br>
            <input className = "output-box" type="text" value={disp2} readOnly = {true} style={{width: "200px", height: "50px"}}/>
            <input className = "output-box" type="text" value={w2} readOnly = {true} style={{width: "200px", height: "50px"}}/>
            <br></br>
            <br></br>
            <input className = "output-box" type="text" value={disp3} readOnly = {true} style={{width: "200px", height: "50px"}}/>
            <input className = "output-box"type="text" value={w3} readOnly = {true} style={{width: "200px", height: "50px"}}/>
            <br></br>
            <br></br>
            <input className = "output-box" type="text" value={disp4} readOnly = {true} style={{width: "200px", height: "50px"}}/>
            <input className = "output-box" type="text" value={w4} readOnly = {true} style={{width: "200px", height: "50px"}}/>
            <br></br>
            <br></br>
            
        </div>
    </>);


}

export default StopsData;




















