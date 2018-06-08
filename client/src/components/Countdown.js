import React from 'react';

class Countdown extends React.Component {
state = {
    hours: 0,
    minutes: 0,
    seconds: 0,
    hoursRemaining: 0,
    minutesRemaining: 0,
    secondsRemaining: 0
}

pad = (d) => {
  return (d < 10) ? '0' + d : d;
}

componentDidUpdate() {

    let targetTime = new Date(this.props.target);
    let targetMs = targetTime.getTime();

    setInterval(() => {
        let now = new Date();
        let currentMs = now.getTime();
        let msLeft = targetMs - currentMs;
        let hoursRemaining = Math.floor(msLeft/(1000*60*60)%24);
        let minutesRemaining = Math.floor(msLeft/(1000*60)%60);
        let secondsRemaining = Math.floor((msLeft/1000)%60);
        
        this.setState({
          hours: now.getHours(),
          minutes: now.getMinutes(),
          seconds: now.getSeconds(),
          hoursRemaining: hoursRemaining,
        minutesRemaining: minutesRemaining,
        secondsRemaining: secondsRemaining
        });
      }, 1000);
}

  render() {
    return ( 
      <div>
      {/* {this.props.target && <p>Target time is {this.props.target}</p>} */}
    {/* <p>Current time: {this.state.hours}:{this.state.minutes}:{this.state.seconds}</p> */}
    {/* <img src="img/sunset.svg"/> */}
    {this.state.secondsRemaining > 0 && <p className="count">{this.pad(this.state.hoursRemaining)}:{this.pad(this.state.minutesRemaining)}:{this.pad(this.state.secondsRemaining)}</p>}
    {this.state.secondsRemaining < 0 && <p className="count">{this.pad(Math.abs(this.state.hoursRemaining))}:{this.pad(Math.abs(this.state.minutesRemaining))}:{this.pad(Math.abs(this.state.secondsRemaining))}</p>}
      </div>
    )
  }
}

export default Countdown;