import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import axios from "axios";

class AlarmClock extends Component {
  constructor() {
    super();
    this.state = {
      currentTime: '00:00:00',
      alarmTime: '',
      showModal: false, 
      alarmMessage: ''
    };
    this.setAlarmTime = this.setAlarmTime.bind(this);
  }
  
  componentDidMount() {

    this.clock = setInterval(() => this.setCurrentTime(), 1000);
    this.interval = setInterval(() => this.checkAlarmClock(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.clock);
    clearInterval(this.interval);
  }

  setCurrentTime() {
    this.setState({
      currentTime: new Date().toLocaleTimeString('it-IT', { hour12: false })
    });
  }

  setAlarmTime(event) {
    event.preventDefault();
    const inputAlarmTimeModified = event.target.value + ':00';
    this.setState({
      alarmTime: inputAlarmTimeModified
    });
    axios.post("https://be-digitalclock-a1dvtqjcn-anviborse.vercel.app/alarm",{ alarmTime: inputAlarmTimeModified})
     .then(res => {
          console.log('sent');
       })
     .catch(error => {
         console.error('issue', error);
      });
    }

  checkAlarmClock() {
    if (this.state.alarmTime === 'undefined' || !this.state.alarmTime) {
      this.setState({
        alarmMessage: 'Please set your alarm.',
        showModal: false 
      });
    } else {
      this.setState({
        alarmMessage: 'Alarm Set :  ' + this.state.alarmTime
      });
      if (this.state.currentTime === this.state.alarmTime) {
        this.setState({
          showModal: true 
        });
      } 
    }
  }

  renderModal() {
    if (this.state.showModal) {
      return createPortal(
        <div className="modal-al">
          <div className="modal-content-al">
            <h3>Alarm!</h3>
            <br/>
            <p>It's time!</p>
            <br/>
            <button onClick={(id="model") => this.setState({ showModal: false })}>
              Close
            </button>
          </div>
        </div>,
        document.body
      );
    }
    return null;
  }

  render() {
    return (
      <div >
        <h1 className='ah'>Alarm Clock</h1>
        <h2 className='act'>{this.state.currentTime}</h2>
        <h4 className='as'>
        <input type="time" onChange={this.setAlarmTime} />
        </h4>
        <label className='a_msg'>
          <h5  >{this.state.alarmMessage}</h5>
        </label>

        {this.renderModal()} 
      </div>
    );
  }
}

export default AlarmClock;