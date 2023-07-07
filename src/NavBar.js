import {Link} from "react-router-dom";

export default function NavBar()
{
    return(
    <>
    <center>
        <div className="navbar">
            <Link to = "/">DigitalClock</Link>
            <Link to = "/worldclock">WorldClock</Link>
            <Link to = "/alarmclock">AlarmClock</Link>
            <Link to = "/stopwatch">StopWatch</Link>
            <Link to = "/timer">Timer</Link>
        </div>
    </center>
    </>
    );
}