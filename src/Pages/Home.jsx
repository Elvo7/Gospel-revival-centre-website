function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to Gospel Revival Centre Kangemi</h1>

          <p>
            Transforming lives through the Word of God, worship,
            prayer, and fellowship.
          </p>

          <a href="#services" className="btn">
            Join Us This Sunday
          </a>
        </div>
      </section>

      <section className="services" id="services">
        <h2>Service Schedule</h2>

        <div className="cards">
          <div className="card">
            <h3>Sunday Worship</h3>
            <p>8:00 AM – 12:30 PM</p>
          </div>

          <div className="card">
            <h3>Wednesday Prayer</h3>
            <p>5:30 PM – 7:00 PM</p>
          </div>

          <div className="card">
            <h3>Youth Fellowship</h3>
            <p>Saturday 2:00 PM</p>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;