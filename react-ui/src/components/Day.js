import React from 'react';
import Moment from 'react-moment';

class Day extends React.Component {

    state = {
        status: 'closed'
    }

    toggleCard = (e) => {
        this.state.status === 'closed' && this.setState({
            status: 'open'
        })
        this.state.status === 'open' && this.setState({
            status: 'closed'
        })
    }

    render() {
        let day = this.props.dailyForecast;
        return (
        <div>            
                {day.time && <div className={this.state.status} onClick={this.toggleCard}>
                    <p className="day date"><Moment format="MMM D">{day.dateTime}</Moment></p>
                    <p className="day weekday"><Moment format="ddd">{day.dateTime}</Moment></p>
                    <p className="day sunrise"><img src="img/sunup.svg"/><Moment format="hh:mm">{day.sunriseDateTime}</Moment> AM</p>
                    <p className="day sunset"><img src="img/sundown.svg"/><Moment format="hh:mm">{day.sunsetDateTime}</Moment> PM</p>
                    <p className="day temphigh">{day.temperatureHigh.toFixed(0)}F</p>
                    <p className="day templow">{day.temperatureLow.toFixed(0)}F</p>
                    <p className="day icon"><img src={`img/${day.icon}.svg`} alt={day.icon}/></p>
                    <p className="day humid stat"><img src="img/humidity.svg" alt="humidity-icon"/>      
                    <span className="statBar" style={{width:`${day.humidity*77}%`}}></span></p>
                    <p className="day precip stat"><img src="img/umbrella.svg" alt="precipitation-icon"/>      
                    <span className="statBar" style={{width:`${day.precipProbability*77}%`}}></span></p>
                    <p className="day cloud stat"><img src="img/clouds.svg" alt="cloudcoverage-icon"/>       
                    <span className="statBar" style={{width:`${day.cloudCover*77}%`}}></span></p>
                    <p className="day wind stat"><img src="img/wind.svg" alt="wind-icon"/>      
                    <span className="statBar" style={{width:`${day.windSpeed/75*77}%`}}></span></p>
                </div>}
            </div>
    )
} 
}

export default Day;