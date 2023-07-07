import { useState, useRef, useEffect } from 'react';
import ReactModal from 'react-modal';
import axios from 'axios';

export default function Timer() {
  const ref = useRef(null);
  const [timer, setTimer] = useState('00:00:00');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState(null);

  const getTimeRemaining = (event) => {
    const total = Date.parse(event) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / 1000 / 60 / 60) % 24);
    return {
      total,
      hours,
      minutes,
      seconds
    };
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const startTimer = (event) => {
    const { total, hours, minutes, seconds } = getTimeRemaining(event);

    if (total >= 0) {
      setTimer(
        (hours > 9 ? hours : '0' + hours) +
        ':' +
        (minutes > 9 ? minutes : '0' + minutes) +
        ':' +
        (seconds > 9 ? seconds : '0' + seconds)
      );

      if (total === 0) {
        openModal();
      }
    }
  };

  
  const clearTimer = (event) => {
    if (ref.current) clearInterval(ref.current);
    const id = setInterval(() => {
      startTimer(event);
    }, 1000);
    ref.current = id;
  };

  const getLeftTime = () => {
    let timeleft = new Date();
    timeleft.setSeconds(timeleft.getSeconds());
    return timeleft;
  };


  useEffect(() => {
    axios.get('https://be-digitalclock-a1dvtqjcn-anviborse.vercel.app/timer')
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);


  const onClickReset = () => {
    clearTimer(getLeftTime());
  };



  const setCustomTimer = () => {
    const hours = prompt('Enter hours:');
    const minutes = prompt('Enter minutes:');
    const seconds = prompt('Enter seconds:');
    const event = new Date();
    event.setHours(event.getHours() + parseInt(hours));
    event.setMinutes(event.getMinutes() + parseInt(minutes));
    event.setSeconds(event.getSeconds() + parseInt(seconds));
    clearTimer(event);
  };


  return (
    <>
      <h1>Timer</h1>
      <h2 className='timer'>{timer}</h2>
      <div className='buttons'>
        {data && <p>Data from the server: {data}</p>}
        <button id='1' onClick={onClickReset}>Reset</button>
        <button onClick={setCustomTimer}>Set Timer</button>
      </div>

      <ReactModal className="model"
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Timer Expired"
      >
        <h2>Timer Expired!</h2>
        <button onClick={closeModal}>Close</button>
      </ReactModal>
    </>
  );
}




