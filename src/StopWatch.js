import { useState, useEffect} from "react";
import axios from "axios";

export default function StopWatch()
{
  const [millis , setMillis] = useState("0");
  const [second, setSecond] = useState("00");
  const [minute, setMinute] = useState("00");
  const [hours, setHours] = useState("00");
  const [isActive, setIsActive] = useState(false);
  const [counter, setCounter] = useState(0);
  


  useEffect(() => {
    let intervalId;

    

    if (isActive) {
      intervalId = setInterval(() => {
        const millisCounter = counter % 10;
        const secondCounter = Math.floor(counter / 100)% 60;
        const minuteCounter = Math.floor(counter/100/ 60) % 60;
        const hoursCounter = Math.floor((counter /100/ 60 / 60) % 24);

        let computedMillis =
        String(millisCounter).length === 1
            ? `${millisCounter}`
            : millisCounter;

        let computedSecond =
        String(secondCounter).length === 1
          ? `0${secondCounter}`
          : secondCounter;
         
        let computedMinute =
        String(minuteCounter).length === 1
          ? `0${minuteCounter}`
          : minuteCounter;
        let computedHours =
        String(hoursCounter).length === 1
            ? `0${hoursCounter}`
            : hoursCounter;
        
        setMillis(computedMillis);
        setSecond(computedSecond);
        setMinute(computedMinute);
        setHours(computedHours);

        setCounter((counter) => counter + 1);
        axios.get('https://be-digitalclock-a1dvtqjcn-anviborse.vercel.app/st') 
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.error(error); 
        });
      }, 10);
    }
    
    return () => clearInterval(intervalId);
    
  }, [isActive, counter]);
  
  function stopTimer() {
    
    setIsActive(false);
    setCounter(0);
    setMillis("0");
    setSecond("00");
    setMinute("00");
    setHours("00");
    

  }

  return (
    <>
   <form id="st-bg">
    <h1>Stop Watch</h1>
    <div className="container">
      <div className="time">
        <span className="hours">{hours}</span>
        <span>:</span>
        <span className="minute">{minute}</span>
        <span>:</span>
        <span className="second">{second}</span>
        <span className="millis">.</span>
        <span className="millis">{millis}</span>
      </div>
      <div className="Tbuttons">
        {!isActive && counter === 0 && (
          <button onClick={() => setIsActive(!isActive)} className="start">Start </button>
          )}
        {isActive && (
          <button onClick={() => setIsActive(!isActive)} className="pause">Pause</button>
          )}
        {!isActive && counter !== 0 && (
          <button onClick={() => setIsActive(!isActive)} className="resume">Resume</button>
          )}
        <button onClick={stopTimer} className="reset">
          Reset
        </button>
       
      </div>
     </div>
     </form> 
    </>
  );
};




