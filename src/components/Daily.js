import React from 'react';
import Day from './Day';

class Daily extends React.Component {

    expandCard = (e) => {
        alert('you clicked a card');
    }

    render() {
        return (
        <div>
                {this.props.forecast.map((day) => {
                return (
                    <Day dailyForecast={day}/>
                )
            }
            )} 
    </div>
    )
} 
}

export default Daily;