import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Clock from "./Clock.js";


export default function WorldClock()
{
    const [currentTime, setCurrentTime] = useState("");

   useEffect(() => {
    setInterval(() => {
      Time();
    }, 1000);
    
    function Time (){
      let Time = new Date().toLocaleTimeString();
      setCurrentTime(Time);
	  let urladd = "https://be-digitalclock-a1dvtqjcn-anviborse.vercel.app/wc";
      let data = {Time};
      axios.get(urladd,data)
      .then(res=>console.log())
      .catch(err=>("issue"+err));
    }
         return () => {
            clearInterval(Time);
      };
     }, []);
    return (
		<>
		 <div>
		 <h1 className="wc">World Clock</h1>
         <center className="wc_container">
          <Clock timeZone="America/Los_Angeles" />
          <Clock timeZone="Europe/London" />
          <Clock timeZone="Asia/Singapore" />
		  <Clock timeZone="Asia/Dubai"/>
		  <Clock timeZone="Asia/Kolkata"/>
        </center>
      </div>
	  </>
    );
  }


