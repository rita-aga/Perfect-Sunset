
import React, {Component} from 'react';

class Countdown extends Component {
  state = {
      remainingMinutes: 0,
      remainingSeconds: 0
  }

  updateRemainMinutesAndSeconds(timeRemainingInSeconds){
    let remainingMinutes = Math.floor(timeRemainingInSeconds/60);
    let remainingSeconds = timeRemainingInSeconds % 60;
    this.setState({
      remainingMinutes,
      remainingSeconds
    });
  }

  countDown(timeRemainingInSeconds,shouldSkipCallback){
    this.setState({
      timeRemainingInSeconds
    });
    if (!shouldSkipCallback && timeRemainingInSeconds % 60 === 0) {
      this.props.onEveryMinute(1);
    }
    if (timeRemainingInSeconds === 0){
      this.props.onCompletion();
    }
    localStorage.setItem('timeRemainingInSeconds',timeRemainingInSeconds);
    if(timeRemainingInSeconds > 0){
      this.updateRemainMinutesAndSeconds(timeRemainingInSeconds);
      timeRemainingInSeconds = timeRemainingInSeconds-1;
      this.setTimeoutId = setTimeout(this.countDown.bind(this,timeRemainingInSeconds, false), 1000);
    }
  }

  compareServerTimeAndComponentTimeAndUpdateServer(serverSideTimeRemainingInSeconds){
    let componentTimeRemainingInSeconds = localStorage.getItem('timeRemainingInSeconds');
    if(componentTimeRemainingInSeconds && componentTimeRemainingInSeconds < serverSideTimeRemainingInSeconds) {
      let differenceInMinutes = Math.floor((serverSideTimeRemainingInSeconds - componentTimeRemainingInSeconds)/60)
      if(differenceInMinutes>0){
        this.props.onEveryMinute(differenceInMinutes)
      }
      return componentTimeRemainingInSeconds;
    }
    return serverSideTimeRemainingInSeconds;
  }

  componentWillReceiveProps(nextProps){
    console.log(this.props.timeRemainingInSeconds);
    if(this.props.timeRemainingInSeconds !== nextProps.timeRemainingInSeconds){
      let timeRemainingInSeconds = this.compareServerTimeAndComponentTimeAndUpdateServer(nextProps.timeRemainingInSeconds);
      this.countDown(timeRemainingInSeconds,true);
    }
  }

  componentWillUnmount(){
    clearTimeout(this.setTimeoutId);
  }

  render(){
    return (
      <div className='timer'>
          <div>
 
          <div className='font-weight-bold lead number-display'>
            {
              this.state.remainingMinutes>9?
              this.state.remainingMinutes:'0'+this.state.remainingMinutes
            }:{
              this.state.remainingSeconds>9?
              this.state.remainingSeconds:'0'+this.state.remainingSeconds
            }
          </div>

              <div className='info'>remaining</div>

          </div>

      </div>
    )
  }
}

export default Countdown;

// import React from 'react';
// import {Days,Hours,Minutes,Seconds} from 'react-countdowntimer';

// class Countdown extends React.Component {
// state = {
//     hours: 0,
//     minutes: 0,
//     seconds: 0,
//     hoursRemaining: 0,
//     minutesRemaining: 0,
//     secondsRemaining: 0
// }

// pad = (d) => {
//   return (d < 10) ? '0' + d : d;
// }

// componentDidUpdate() {

//     let targetTime = new Date(this.props.target);
//     let targetMs = targetTime.getTime();

//     setInterval(() => {
//         let now = new Date();
//         let currentMs = now.getTime();
//         let msLeft = targetMs - currentMs;
//         let hoursRemaining = Math.floor(msLeft/(1000*60*60)%24);
//         let minutesRemaining = Math.floor(msLeft/(1000*60)%60);
//         let secondsRemaining = Math.floor((msLeft/1000)%60);
        
//         this.setState({
//           hours: now.getHours(),
//           minutes: now.getMinutes(),
//           seconds: now.getSeconds(),
//           hoursRemaining: hoursRemaining,
//         minutesRemaining: minutesRemaining,
//         secondsRemaining: secondsRemaining
//         });
//       }, 1000);
// }

//   render() {
//     return ( 
//       <div>
//       {/* {this.props.target && <p>Target time is {this.props.target}</p>} */}
//     {/* <p>Current time: {this.state.hours}:{this.state.minutes}:{this.state.seconds}</p> */}
//     {/* <img src="img/sunset.svg"/> */}
//     {this.state.secondsRemaining > 0 && <p className="count">{this.pad(this.state.hoursRemaining)}:{this.pad(this.state.minutesRemaining)}:{this.pad(this.state.secondsRemaining)}</p>}
//     {this.state.secondsRemaining < 0 && <p className="count">{this.pad(Math.abs(this.state.hoursRemaining))}:{this.pad(Math.abs(this.state.minutesRemaining))}:{this.pad(Math.abs(this.state.secondsRemaining))}</p>}
//       </div>
//     )
//   }
// }

// export default Countdown;