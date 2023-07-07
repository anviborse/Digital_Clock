import {useState, useEffect, useRef} from "react";
import axios from "axios";

export default function DigitalClock ()
{
   const Ref = useRef(null);
   const [currentTime, setCurrentTime] = useState();



   useEffect(() => {
    setInterval(() => {
      updateTime();
    }, 1000);
    
    function updateTime (){
      
      let Time = new Date().toLocaleTimeString();
      setCurrentTime(Time);
      let urladd = "https://be-digitalclock-a1dvtqjcn-anviborse.vercel.app/dc";
      let data = {Time};
      axios.get(urladd,data)
      .then(res=>console.log())
      .catch(err=>("issue"+err));
      

    }
          return () => {
            clearInterval(updateTime);
          };
        }, []);
        
        return(
            <div>
                <h1 className="dc">{currentTime}</h1>
            </div>
        )
    }