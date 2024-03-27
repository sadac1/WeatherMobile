import React, {Component} from 'react';
//import Form from 'react-bootstrap/Form';
import {useState} from 'react';
import WeatherInfo from './WeatherInfo';
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
    
    const [time, setTime] = useState("Estimated Start Time");
    const [startDate, setStartDate] = useState("Estimated Start Date");
    const [start, setStart] = useState("Start Location");
    const [stop1, setStop1] = useState("Stop");
    const [stop2, setStop2] = useState("Stop");
    const [end, setEnd] = useState("End Location");
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
    const handleChangeTime = (event1) => {
        setTime(event1.target.value)
    }
    const handleChangeStartDate = (event6) => {
        setStartDate(event6.target.value)
    }
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

    const statement = 'DESCRIBE YOUR JOURNEY';

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
    const MPH = 60

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

    //Kirthi
    const getPlan = () => {
        //calculations will go here.
        //location1 + Weather1
        //location2 + Weather2
        setPlan(start + " is super sunny! Good for you <3")
        
        //following are the times when user will be at each location
        //when user is at stop1:
        const [t2, setT2] = useState("")
        setT2(addTime(time, getTimeToTravel(start, stop1)))

        //when user is at stop2:
        const [t3, setT3] = useState("")
        setT3(addTime(t2, getTimeToTravel(stop1, stop2)))
    
        //when user is at end:
        const [t4, setT4] = useState("")
        setT4(addTime(t3, getTimeToTravel(stop2, end)))

        //displays all the weather as textboxes
        //WeatherInfo is another Component, it returns a textbox with a location and its data all formatted
        return (
            <>
            <div>
                <WeatherInfo location_ = {start} time_ = {time} weather = {getWeather(start, time)} />
            </div>
            <br></br>
            <div>
                <WeatherInfo location_ = {stop1} time_ = {t2} weather = {getWeather(stop1, t2)} />
            </div>
            <br></br>
            <div>
                <WeatherInfo location_ = {stop2} time_ = {t3} weather = {getWeather(stop2, t3)} />
            </div>
            <br></br>
            <div>
                <WeatherInfo location_ = {end} time_ = {t4} weather = {getWeather(end, t4)} />
            </div>
            </>
        )
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
    /*
        dist = ...

        return dist * MPH
    */

    }
    /* addTime
    Takes in inital time (hours as decimal)
    Adds both times and returns new time as (hours as decimal)
    */
    const addTime = (time1, timeToTravel) => {
        //return time1 + timetoTravel (this will have to be formatted properly)
    }

    //Bavya
    const getWeather = (loc, time) => {
        //getting weather API data with loc and time
        //
        //please return a array with [temperature, precipitation, windspeed]
    }

    //Sada
    // Takes in hours as a decimal, returns as a string
    const helperGetHoursFormatted = (hours) => {
        //returns hours formatted as a string
        //see already made function in docs
        const formattedHours = new Date(hours * 3600 * 1000).toISOString().substring(11, 16);
        return formattedHours;
    }
    //display all
    return (<>
        <h2>{statement}</h2>
        <div>
            <form onSubmit = {handleSubmitGetPlan} /*onClick = {handleClick}*/>
                <input type="text" value={time} onChange={handleChangeTime}/>
                <input type="text" value={startDate} onChange={handleChangeStartDate}/>
                <br></br>
                <input type="text" value={start} onChange={handleChangeStart}/>
                <br></br>
                <input type = "text" value = {stop1} onChange = {handleChangeStop1}/>
                <br></br>
                <input type = "text" value = {stop2} onChange = {handleChangeStop2}/>
                <br></br>
                <input type="text" value={end} onChange={handleChangeEnd}/>
                <br></br>
                <br></br>
                <input type="submit" value = "Get Plan!"/>
                <br></br>
                <br></br>
            </form>
        </div>
        <h2>Happy Travels!</h2>
        <div>
            <getPlan/>
            <br></br>
            <br></br>
            <button>Download Plan</button>
        </div>
    </>);


}

export default StopsData;
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