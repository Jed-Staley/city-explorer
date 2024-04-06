import React from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

function Movies({ moviesData }) {
  function Movie({ movie }) {
    return (
      <Col key={movie.poster} style={{ placeItems: 'center', textAlign: 'center' }}>
        <Card style={{ width: '18rem', margin: 'auto'}} onClick={() => window.open(('https://www.google.com/search?q=IMDB ' + movie.title), '_blank')}>
          <Card.Title>{movie.title}</Card.Title>
          <Card.Img variant="top" src={'https://image.tmdb.org/t/p/w500' + movie.poster} />
        </Card>
      </Col>
    );
  }

  console.log(moviesData);

  return (
    <section className="card-container2" style={{ margin: '50px', width: 'auto'}}>
      <h2>Related Movies</h2>
      <Row xs={1} sm={2} md={3} lg={4} xl={5} className="g-4">
        {moviesData.map((movie, index) => (
          <Movie key={movie.title + index} movie={movie} />
        ))}
      </Row>
    </section>
  );
}

export default Movies;
