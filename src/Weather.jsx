import React from 'react';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';

function Weather({ weatherData }) {
  function WeatherDay({ day }) {
    const dateParts = day.date.split('-');
    const year = parseInt(dateParts[0]);
    const month = parseInt(dateParts[1]) - 1;
    const newDay = parseInt(dateParts[2]);

    const dateObject = new Date(year, month, newDay);
    const dayOfWeekIndex = dateObject.getDay();
  
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  
    const finalDay = daysOfWeek[dayOfWeekIndex];

    return (
      <Card>
        <Card.Header>{finalDay}</Card.Header>
        <Card.Body>
          <Card.Text>{day.description}</Card.Text>
        </Card.Body>  
        <Card.Footer>
          <small>{day.date}</small>
        </Card.Footer>
      </Card> 
    );
  }

  return (
    <section className="card-container1">
      <h2>Forecast</h2>
      <CardGroup>
        {weatherData.map((day) => (
          <WeatherDay day={day} key={day.date} />
        ))}
      </CardGroup>
    </section>
  );
}

export default Weather
