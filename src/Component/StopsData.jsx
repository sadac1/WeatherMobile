import React, {Component} from 'react';
//import Form from 'react-bootstrap/Form';
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
    
    //these are all the variables that the user will input. 
    //in order to change the first parameter, use the second parameter. Ex. setTime(1:30) will change time to 1:30
    // useState("estimated start time") <- inside quotes is the default thing that shows. You can see it with npm run dev.
    const [time, setTime] = useState(null); // Change to null since we're using time
    const [startDate, setStartDate] = useState(null); // Change to null since we're using date
    /*const [time, setTime] = useState("Estimated Start Time");
    const [startDate, setStartDate] = useState("Estimated Start Date");
    */
    const [start, setStart] = useState("Start Location");
    const [stop1, setStop1] = useState("Stop");
    const [stop2, setStop2] = useState("Stop");
    const [end, setEnd] = useState("End Location");

    const [timeAtStop, setTimeAtStop] = useState(0.5);

//Time of arrival at stop 1, stop 2, end
    const [t2, setT2] = useState("")
    const [t3, setT3] = useState("")
    const [t4, setT4] = useState("")

//weather at start, stop1, stop2, end
    const [weather1, setWeather1] = useState({temp : "t", prec : "p",wind : "w"});
    const [weather2, setWeather2] = useState({temp : "t", prec : "p",wind : "w"});
    const [weather3, setWeather3] = useState({temp : "t", prec : "p",wind : "w"});
    const [weather4, setWeather4] = useState({temp : "t", prec : "p",wind : "w"});

    const [disp1, setDisp1] = useState("");
    const [w1, setW1] = useState("");
    const [disp2, setDisp2] = useState("");
    const [w2, setW2] = useState("");
    const [disp3, setDisp3] = useState("");
    const [w3, setW3] = useState("");
    const [disp4, setDisp4] = useState("");
    const [w4, setW4] = useState("");

//copied and pasted from DummyData.json
    const dummyDataJson = `
    [
        {
            "location": "Chicago",
            "longitude": -87.6298,
             "latitude": 41.8781
        },
        {
            "location": "Springfield",
            "longitude": -89.6501,
            "latitude": 39.7817
        },
        {
            "location": "Rockford",
            "longitude": -89.0938,
             "latitude": 42.2714
            },
        {
            "location": "Peoria",
            "longitude": -89.5889, 
            "latitude": 40.6936
        },
        {
            "location": "Champaign", 
            "longitude": -88.2434, 
            "latitude": 40.1164
        },
        {
            "location": "Naperville", 
            "longitude": -88.1535, 
            "latitude": 41.7508
        },
        {
            "location": "Aurora", 
            "longitude": -88.3201, 
            "latitude": 41.7606
        },
        {
            "location": "Bloomington", 
            "longitude": -88.9906, 
            "latitude": 40.4842
        },
        {
            "location": "Joliet", 
            "longitude": -88.0817, 
            "latitude": 41.525
        },
        {
            "location": "Decatur", 
            "longitude": -88.9548, 
            "latitude": 39.8403
        }
    ]
    `;

    const dummyData = JSON.parse(dummyDataJson);
    //not using this anymore, instead directly displaying plan from getPlan function: const [plan, setPlan] = useState("");

    //how stops will appear and disappear with plus button<- not implemented yet
    //const [showStop, setShowStop] = React.useState(false)

    //following array stores all the data from the user. These values get updated in the handleChange functions
    //Kirthi: turn this into a struct/props so that we don't need to call time start data blah separately, instead can do data.blah
    let data = [{time}, {startDate}, {start}, {stop1}, {stop2}, {end}]

    //this function console.logs the current values in data and calls getPlan, which displays the plan in the lower box.
    const handleSubmitGetPlan = (event) => {
        event.preventDefault();
        //alert(time)
        console.log(data)
        getPlan()
    }

    //Note: find out how to make the default text disappear when someone starts typing
    //Currently, this function is not being used. 
    const handleClick = (event0) => {
        event0.preventDefault();
        console.log("clicked")
        //[time, setTime] = useState("");
        //[start, setStart] = useState("");
    }

    //following handleChange functions update the textboxes to display what the user inputs
    // and update the values in the data array above : time, startDate, start, stop1, stop2, end
    const handleChangeTime = (selectedTime) => {
        setTime(selectedTime);
    };

    const handleChangeStartDate = (selectedDate) => {
        setStartDate(selectedDate);
    };
    /*const handleChangeTime = (event1) => {
        setTime(event1.target.value)
    }
    const handleChangeStartDate = (event6) => {
        setStartDate(event6.target.value)
    } */
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

    //For adding stops with plus-button click. This is not being used right now. 
    const handlePlusButtonClick = (event7) => {
        console.log("Add another stop")
        setShowStop(true)
    }

    const statement = 'Describe Your Journey';

    //Not being used right now
    //currently button to add the stop doesn't work, so the stop is just going to be there already.
    const Stops = () => {
        <div>
        <form>
            <input type = "text" value = {stop} onChange = {handleChangeStop1}/>
        </form>
        </div>
    }
    
    //Following is for dummy data lol if we can't use API. Will multiply this by distance. 
    const MPH = 70

    /*
    Tasks: 
    1) Alexia : Create dummy data as json file. Format per line: {Location Name, longitude, latitude}
    2) Rikhita : DropDown Dates so that we know dates are good 
    3) Kirthi : getPlan
    4) Kirthi : getTimeToTravel manual implementation 
    5) Sada : helperGetHoursFormatted implementation
    6) Bavya : getWeather
     */
    //This is where results will be coded.

    /*useEffect(() => {
        setWeather1([{ temp : "blah", prec : "blah", wind : "blah"}]);
    }, []);*/


    //Kirthi
    const getPlan = (eventblah) => {
        eventblah.preventDefault()
        //setWeather1([{"temp" : "blah", "prec" : "blah", "wind" : "blah"}])
        //calculations will go here.
        //setPlan(start + " is super sunny! Good for you <3")
        //following are the times when user will be at each location
        //when user is at stop1:
        //console.log("time: " + time, "isoTime", isoTime)
        //setTime(addTime(time, 0))
        const isoTime = convertTimeToISO(time);
        console.log("time: " + time, "isoTime", isoTime)
        getWeather(start, isoTime, 1)
        console.log("eather 1 is " + weather1.prec);
        setT2(addTime(isoTime, getTimeToTravel(start, stop1)))
        
        getWeather(stop1, isoTime, 2)
        //when user is at stop2:
        setT3(addTime(t2, getTimeToTravel(stop1, stop2)))
    
        getWeather(stop2, isoTime, 3)
        //when user is at end:
        setT4(addTime(t3, getTimeToTravel(stop2, end)))

        getWeather(end, isoTime, 4)
        //when user is at end:
     //   setT4(addTime(t4, getTimeToTravel(end, end)))

        console.log("Weather 1 is " + weather1);
        //getWeather(end, t3, 4)
        setDisp1("Leaving from " + start + " at: " + isoTime.substring(11,16));
        setW1(weather1.temp + " F, " + "P: " + weather1.prec + " %,  " + "W: " + weather1.wind + " mph");

        setDisp2("Reaching " + stop1 + " at: " + t2.substring(11,16));
        setW2(weather2.temp + " F, " + "P: " + weather2.prec + " %,  " + "W: " + weather2.wind + " mph");

        setDisp3("Reaching " + stop2 + " at: " + t3.substring(11,16));
        setW3(weather3.temp + " F, " + "P: " + weather3.prec + " %,  " + "W: " + weather3.wind + " mph");

        setDisp4("Reaching " + end + " at: " + t4.substring(11,16));
        setW4(weather4.temp+ " F, " + "P: " + weather4.prec + " %,  " + "W: " + weather4.wind + " mph");

        //console.log(getTimeToTravel(start, stop1))
        //console.log(getWeather('Chicago', '2024-03-27T23:22:00Z')) // test this
        //displays all the weather as textboxes
        //WeatherInfo is another Component, it returns a textbox with a location and its data all formatted
    }
    /* getTimeToTravel
    Takes in two locations
    Returns: time it takes to travel between two locations (loc1, loc2)
    Format should be in : hours (as decimal)
    */
    const getTimeToTravel = (loc1, loc2) => {
        //Either API: get time to travel between two locs
        //Or: We calculate distance, multiply by MPH var above w dummy data
        //distance between two locs: =acos(sin(lat1)*sin(lat2)+cos(lat1)*cos(lat2)*cos(lon2-lon1))*6371 
        
        //const dummy = JSON.parse('DummyData.json')
        //console.log(dummyData)
    /*
        dist = ...

        return dist * MPH
    */
        let l1_lat = 0
        let l1_lon = 0
        let l2_lat = 0
        let l2_lon = 0
        console.log(dummyData[0].location)
        for (let i = 0; i < Object.keys(dummyData).length; i++) {
            if (dummyData[i].location == loc1) {
                l1_lat = dummyData[i].latitude;
                l1_lon = dummyData[i].longitude;
            }
            if (dummyData[i].location == loc2) {
                l2_lat = dummyData[i].latitude;
                l2_lon = dummyData[i].longitude;
            }
        }
        const m = 3958.756
        const strangeDif = 57.50501
        console.log(l1_lat, " ", l2_lat, " ", l1_lon, " ", l2_lon)
        const dif1 = l2_lat - l1_lat
        const dif2 = l2_lon - l1_lon
        const a = Math.sin(dif1/2) * Math.sin(dif1/2) + 
                    Math.cos(l1_lat) * Math.cos(l2_lat) *
                     Math.sin(dif2/2) * Math.sin(dif2/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
        const miles = m * c / strangeDif 
        console.log("miles: " , miles)
        console.log("Time to travel should be:", miles/MPH)
       //console.log("miles " + Math.acos(Math.sin(l1_lat) * Math.sin(l2_lat) + Math.cos(l1_lat)*Math.cos(l2_lat)*Math.cos(l2_lon - l1_lon)) * m);
       return miles / MPH + 0.5
    }

    /* addTime
    Takes in inital time (hours as decimal)
    Adds both times and returns new time as (hours as decimal)
    */
    const addTime = (time1, timeToTravel) => {
        console.log("inputs to time1 and time to travel : " + time1 + " " + timeToTravel)
        //return time1 + timetoTravel (this will have to be formatted properly)
        //let timeToTravelInHours = helperGetHoursFormatted(timeToTravel);
        //time1 is already formatted, so now add two new and then send.
        console.log("hope this works " + new Date(new Date(time1).getTime() + timeToTravel * 60 * 60 * 1000).toISOString())
        return new Date(new Date(time1).getTime() + timeToTravel * 60 * 60 * 1000).toISOString();
    }

    //Bavya
        //getting weather API data with loc and time
        //
        //please return a array with [temperature, precipitation, windspeed]
       // const fetch = require('node-fetch');

       const getWeather = async (loc, time1, point) => {

           const apiKey = 'HIZLo88fMphbEk7JJJlcwLcnvRVbBMjp'; // Ensure the API key is a string
           const location = loc; // Location format should be "lat,long"
           const units = 'metric';
           const fields = ['temperature', 'precipitationIntensity', 'windSpeed']; // Adjusted fields to include
      
           // Assuming 'time' is a specific hour in ISO format (e.g., "2024-03-27T05:00:00Z")
           const startTime = time1;
           const endTime = new Date(new Date(time).getTime() + 60*60*1000).toISOString(); // Adds 1 hour to start time
      
           const url = `https://api.tomorrow.io/v4/timelines?apikey=${apiKey}&location=${location}&fields=${fields.join(',')}&units=${units}&timesteps=current&startTime=${encodeURIComponent(startTime)}&endTime=${encodeURIComponent(endTime)}`;
      
           try {
               const response = await fetch(url);
               if (!response.ok) {
                   throw new Error(`Network response was not ok (${response.statusText})`);
               }
               const data = await response.json();
      
               // Extracting weather data from the first interval as an example
               const interval = data.data.timelines[0].intervals[0].values;
               const temperature = interval.temperature; // Temperature
               const precipitation = interval.precipitationIntensity; // Precipitation intensity
               const windSpeed = interval.windSpeed; // Wind speed
               
               // Returning an array with the requested values
               //return [temperature, precipitation, windSpeed]; << bring this back once it's confirmed that code works
               //INSTEAD OF RETURNING: setting the const values to the corresponding weather data
               if (temperature != null && precipitation != null && windSpeed != null) {
               if (point == 1) {
                setWeather1({temp: temperature, prec: precipitation, wind: windSpeed})
               } else if (point == 2) {
                setWeather2({temp: temperature, prec: precipitation, wind: windSpeed})
               } else if (point == 3) {
                setWeather3({temp: temperature, prec: precipitation, wind: windSpeed})
               } else if (point == 4){
                setWeather4({temp: temperature, prec: precipitation, wind: windSpeed})
               }
            }
            //commented to test WeatherInfo
           } catch (error) {
               console.error('There was an error fetching the weather data:', error);
               //return [2, 4, 6]; // Return an empty array or suitable defaults in case of error
           }
        
       };

    //Sada
    // Takes in hours as a decimal, returns as a string
    const helperGetHoursFormatted = (hours) => {
        //returns hours formatted as a string
        //see already made function in docs
        const formattedHours = new Date(hours * 3600 * 1000).toISOString().substring(11, 16);
        return formattedHours;
    }

    //converting time to ISO so it can be used for API call
    const convertTimeToISO = (selectedTime) => {
        console.log("in convertTimeToISO: selected time is " + selectedTime)
        if (!selectedTime) {
            
            return null;
        }
        const isoTime = moment(selectedTime).toISOString();
        return isoTime;
    };
    
    //display all
    /*
                <input type="text" value={time} onChange={handleChangeTime}/>
                <input type="text" value={startDate} onChange={handleChangeStartDate}/>
                <br></br> */
    return (<>
        <h2>{statement}</h2>
        <div>
            <form onSubmit = {getPlan} /*onClick = {handleClick}*/>
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
                        />
                    </div>

                <input className = "input-field" type="text" value={start} onChange={handleChangeStart}/>
                <br></br>
                <input className = "input-field" type = "text" value = {stop1} onChange = {handleChangeStop1}/>
                <br></br>
                <input className = "input-field"mtype = "text" value = {stop2} onChange = {handleChangeStop2}/>
                <br></br>
                <input className = "input-field" type="text" value={end} onChange={handleChangeEnd}/>
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


//<button>Download Plan</button> <- for when we do downloading implementation

//export default class StopsData extends Component 
/*

Button + :                 <button onClick = {handlePlusButtonClick}>+</button> 
                { showStop ? <Stops/> : null}

<div className = "StopsData"><input value = {val}/></div>

<Form>
        <Form.Group className="mb-3" controlId="startTime">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="time" placeholder="Estimated Start Time" />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
         </Form.Group>

        <Form.Group className="mb-3" controlId="startLocation">
         <Form.Label>Password</Form.Label>
         <Form.Control type="startLoc" placeholder="Start Location" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
         </Form.Group>
         <Button variant="primary" type="addStop">
          Add Stop
         </Button>
         <Form.Group className="mb-3" controlId="endLocation">
         <Form.Label>Password</Form.Label>
         <Form.Control type="endLoc" placeholder="End Location" />
        </Form.Group>
        </Form> 
        */