function Weather({ weatherData }) {
  return (
    <>
      <section>
        <h2>Weather Data</h2>
        {weatherData && weatherData.map(item => (
          <p key={item.date}>
            {item.date}: {item.description}
          </p>
        ))}
      </section>
    </>
  )
}

export default Weather