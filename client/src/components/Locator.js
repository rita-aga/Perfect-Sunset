import React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faSearch from '@fortawesome/fontawesome-free-solid/faSearch';
import faLocationArrow from '@fortawesome/fontawesome-free-solid/faLocationArrow';

class Locator extends React.Component {

  render() {
    return ( 
      <div>
      {this.props.geo && <p>{this.props.geo}</p>}
      {this.props.town && <p className="location"><FontAwesomeIcon icon={faLocationArrow} /> {this.props.town}</p>}
      <form onSubmit={this.props.getWeather}>
        <input type="text" className="myinput" placeholder="ZIP code..." name="zipcode" autocomplete="off"/>
        <button type="button" className="btn"><FontAwesomeIcon icon={faSearch} /></button>
        <span className="underline"></span>
      </form>
    
      {this.props.error && <p>{this.props.error}</p>}
      </div>
    )
  }
}

export default Locator;