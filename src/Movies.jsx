function Movies({ moviesData }) {
  return (
    <>
      <section>
        <h2>Movie Data</h2>
        {moviesData && moviesData.map(item => (
          <p key={item}>
            {item}
          </p>
        ))}
      </section>
    </>
  )
}

export default Movies