import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = () => {
  return (
    <div>
      {/*header*/}
      <section className="nav">
        <nav className="navbar navbar-expand-lg bg-body-tertiary container-fluid">
          <div className="container-fluid">
            <a className="navbar-brand" style={{ color: 'white' }} href="#">
              PetPal
            </a>
            <button
              className="navbar-toggler bg-light"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon bg-light"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0"></ul>
              <li className="nav-item mx-2">
                <a
                  className="nav-link active"
                  aria-current="page"
                  href="home-seeker.html"
                  style={{ fontWeight: 'bold', color: 'skyblue' }}
                >
                  Home
                </a>
              </li>
              <li className="nav-item mx-2">
                <a
                  className="nav-link active"
                  aria-current="page"
                  href="about"
                  style={{ fontWeight: 'bold', color: 'skyblue' }}
                >
                  About
                </a>
              </li>
            </div>
          </div>
        </nav>
      </section>
      {/*banner*/}
      <section className="banner text-sm-start text-center p-4">
        <div className="container">
          <div className="d-sm-flex justify-content-center align-items-center">
            {/* ... (Your existing code for the banner) */}
          </div>
        </div>
      </section>
      {/*modal*/}
      <section>
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          {/* ... (Your existing code for the modal) */}
        </div>
      </section>
      {/* Cards Section */}
      <section className="container p-5">
        {/* ... (Your existing code for the cards) */}
      </section>
      {/* Recent Adoptions Section */}
      <section>
        {/* ... (Your existing code for recent adoptions) */}
      </section>
      {/* Reviews Section */}
      <section className="container p-5">
        {/* ... (Your existing code for reviews) */}
      </section>
      {/* Get Started Section */}
      <section>
        {/* ... (Your existing code for the get started section) */}
      </section>
      {/* Footer Section */}
      <footer className="text-center text-lg-start bg-light text-muted foot">
        {/* ... (Your existing code for the footer) */}
      </footer>
    </div>
  );
};

export default Home;
