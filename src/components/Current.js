import React from 'react';

class Current extends React.Component {

  render() {

    return ( 
      <div>
      {this.props.temp && <div className="currentCard">
      <p className="temp">{this.props.temp.toFixed(0)}F</p>
      <p className="icon"><img src={`img/${this.props.icon}.svg`} alt={this.props.icon}/></p>
      <p className="stat humid"><img src="img/humidity.svg" alt="humidity-icon"/>
      <span className="statBar" style={{width:`${this.props.humidity*77}%`}}></span></p>
      <p className="stat precip"><img src="img/umbrella.svg" alt="precipitation-icon"/>
      <span className="statBar" style={{width:`${this.props.precip*77}%`}}></span></p>
      <p className="stat cloud"><img src="img/clouds.svg" alt="cloudcoverage-icon"/>      
      <span className="statBar" style={{width:`${this.props.cloud*75}%`}}></span>{this.props.clouds}</p>
      <p className="stat wind"><img src="img/wind.svg" alt="wind-icon"/>
      <span className="statBar" style={{width:`${this.props.wind/75*77}%`}}></span></p>
      </div>}
      </div>
    )
  }
}

export default Current;