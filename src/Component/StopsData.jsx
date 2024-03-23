import React, {Component} from 'react';
//import Form from 'react-bootstrap/Form';
import {useState} from 'react';


function StopsData(){
    //text boxes for time and stops
    
    
    const [time, setTime] = useState("Estimated Start Time");
    const [startDate, setStartDate] = useState("Estimated Start Date");
    const [start, setStart] = useState("Start Location");
    const [stop1, setStop1] = useState("Stop");
    const [stop2, setStop2] = useState("Stop");
    const [end, setEnd] = useState("End Location");
    const [plan, setPlan] = useState("");

    //how stops will appear and disappear <- not implemented yet
    //const [showStop, setShowStop] = React.useState(false)

    //following stores all the data from the user. Gets updated in the handleChange functions
    //turn this into a struct
    let data = [{time}, {startDate}, {start}, {stop1}, {stop2}, {end}]


    let num = 1 //testing getPlan below

    const handleSubmit = (event) => {
        event.preventDefault();
        //console.log(time)
        //alert(time)
        /*if (time == "3:30") {
            console.log("Time is 3:30!")
        }*/
        console.log(data)
        //following is not working
        num = num + 1
        getPlan(2)
    }
    //find out how to make the default text disappear when someone starts typing
    const handleClick = (event0) => {
        event0.preventDefault();
        console.log("clicked")
        //[time, setTime] = useState("");
        //[start, setStart] = useState("");
    }

    //following updates the textbox with what the user inputs.
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
        console.log("this too")
        setStop2(event4.target.value)
    }    
    const handleChangeEnd = (event5) => {
        console.log("this too")
        setEnd(event5.target.value)
    }

    const handlePlusButtonClick = (event7) => {
        console.log("Add another stop")
        setShowStop(true)
    }
    const statement = 'DESCRIBE YOUR JOURNEY';
    //currently button to add the stop doesn't work, so the stop is just going to be there
    const Stops = () => {
        <div>
        <form>
            <input type = "text" value = {stop} onChange = {handleChange}/>
        </form>
        </div>
    }
    
    //something to figure out: how to make the buttons work in real time. 
    //i think there was something related to this in the 1 hr react tutorial.
    let finalPlan = "stop 1 is super sunny! Good for you <3"
    
    //Following is for dummy data lol if we can't use API
    const mph = 60

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
    const getPlan = (num) => {
        //calculations will go here.
        //location1 + Weather1
        //location2 + Weather2
        setPlan(start + " is super sunny! Good for you <3")
    }
    /* getTimeToTravel
    Takes in two locations
    Returns: time it takes to travel between two locations (loc1, loc2)
    Format should be in : hours (as decimal)
    */
    const getTimeToTravel = (loc1, loc2) => {
        //Either API: get time to travel between two locs
        //Or: We calculate distance, multiply by mph var above
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
    }

    // Takes in hours as a decimal, returns as a string
    const helperGetHoursFormatted = (hours) => {
        //returns hours formatted as a string
        //see already made function in docs
    }
    //display all
    return (<>
        <h2>{statement}</h2>
        <div>
            <form onSubmit = {handleSubmit} /*onClick = {handleClick}*/>
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
            <input type='text' readOnly={true} value={plan} style={{height: "370px", width: "370px"}}/>
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