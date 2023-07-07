import React from "react";


export default function Clock(props)
 {

    return (
    <>
    <center>
     
     <div className="wc_time">

      <div className="wc_name">
        {`${props.timeZone}`} 
     </div>
         {new Date().toLocaleTimeString("en",{
          timeZone: props.timeZone,
        })}
     </div>
     <br/>
     

    </center>
    </>
    );
  }
