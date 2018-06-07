import React, { Component } from 'react';
import './App.css';
import io from 'socket.io-client';
import Locator from './components/Locator';
import Current from './components/Current';
import Daily from './components/Daily';
import Countdown from './components/Countdown';
import Credits from './components/Credits';

class App extends Component {
  state = {
    town: undefined,
    location: {
      latitude: 0,
      longitude: 0,
      },
    forecast: {
      daily: {
        summary: undefined,
        data: [
          {
            time: undefined,
            sunsetTime: undefined,
            sunsetDateTime: undefined,
            icon: undefined,
            humidity: undefined,
            sunriseTime: undefined,
            precipProbability: undefined,
            windSpeed: undefined,
            cloudCover: undefined,
            temperatureHigh: undefined,
            temperatureLow: undefined
          }
        ]
      }
    },
    currently: {},
    zipStatus: undefined,
    geoLocatorStatus: undefined
  }

  getWeather = (e) => {
    e.preventDefault();
    console.log(e.target.elements.zipcode.value);
    const socket = io.connect('wss://perfect-sunset.herokuapp.com:8434/', { transports: ['websocket'] });
    const zip = e.target.elements.zipcode.value;
    socket.emit('zip', zip);
    socket.on('darkSkyCurrentUpdate', (data) => {
      this.setState({
        currently: data,
        zipStatus: undefined
      })
      console.log(this.state.currently);
        });
    socket.on('darkSkyForecastUpdate', (data) => {
      this.setState({
        forecast: data,
        zipStatus: undefined
      })
      console.log(this.state.forecast);
        });
    socket.on('userAddress', (data) => {
      this.setState({
        town: data
      })
        });
    socket.on('wrongZip', (data) => {
      this.setState({
        zipStatus: data
      })
        });
    
  }

  componentDidMount() {

    const socket = io.connect('wss://perfect-sunset.herokuapp.com:8434/', { transports: ['websocket'] });

    navigator.geolocation.getCurrentPosition(
      (position) => {
        let lat = position.coords.latitude
        let lng = position.coords.longitude
        console.log("getCurrentPosition Success " + lat + lng) // logs position correctly
        this.setState({
          location: {
            latitude: lat,
            longitude: lng
          }
        })
        
        // Send coordinates
        socket.emit('coords', this.state.location);
        // Receive API data
        socket.on('darkSkyCurrent', (data) => {
          this.setState({
            currently: data
          })
          console.log(this.state.currently);
        });
        socket.on('darkSkyForecast', (data) => {
          this.setState({
            forecast:  data
          })
          console.log(this.state.forecast);
        });
        socket.on('userAddress', (data) => {
          this.setState({
            town:  data
          })
          console.log(this.state.town);
        });
      },
      (error) => {
        this.setState({
          geoLocatorStatus:  'You geolocation is OFF. Please, use ZIP code.'
        })
        console.error(JSON.stringify(error))
      }, {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000
      }
    )


  }

  render() {
    return (
      <div>
        <Locator 
        town={this.state.town} 
        getWeather={this.getWeather} 
        error={this.state.zipStatus} 
        geo={this.state.geoLocatorStatus}/>
        <Countdown target={this.state.forecast.daily.data[0].sunsetDateTime}/>
        <Current
        temp={this.state.currently.temperature}
        humidity={this.state.currently.humidity}
        icon={this.state.currently.icon}
        precip={this.state.currently.precipProbability}
        cloud={this.state.currently.cloudCover}
        wind={this.state.currently.windSpeed}
        />
        <Daily 
        forecast={this.state.forecast.daily.data}
        summary={this.state.forecast.daily.summary}
        />
        <Credits />
      </div>
    );
  }
}



export default App;
