import { useContext } from "react";
import { Outlet, Link, useLocation } from "react-router-dom"

import 'bootstrap/dist/css/bootstrap.min.css';

const Layout = () => {
    return <>
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
                  href="/"
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
              <li className="nav-item mx-2">
                <a
                  className="nav-link active"
                  aria-current="page"
                  href="login"
                  style={{ fontWeight: 'bold', color: 'skyblue' }}
                >
                  Login
                </a>
              </li>
              <li className="nav-item mx-2">
            <a className="nav-link" href="finder.html" style={{color: "white"}}>Finder</a>
          </li>
          <li className="nav-item dropdown mx-2">
            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"
              style={{color: "white"}}>
              Seeker
            </a>
            <ul className="dropdown-menu dropdown-menu-start">
              <li><a className="dropdown-item" href="seeker-account.html">Manage Account</a></li>
              <li><a className="dropdown-item" href="applications.html">Manage Adoptions</a></li>
              <li><a className="dropdown-item" href="login.html">Sign-up</a></li>
            </ul>
          </li>
          <li class="nav-item mx-2">
            <button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#exampleModal">
              <i class="bi bi-bell" style={{color: "white"}}></i>
            </button>
            </li>
            </div>
          </div>
        </nav>
      </section>
      <section>
        <Outlet />
      </section>
      <footer class="text-center text-lg-start bg-light text-muted foot">

    <section class="d-flex justify-content-center justify-content-lg-between p-4 border-bottom" style={{color: "white"}}>

      <div class="me-5 d-none d-lg-block">
        <span>Get connected with us on social networks:</span>
      </div>

      <div>
        <a href="" class="me-4 text-reset">
          <i class="bi bi-instagram"></i>
        </a>
        <a href="" class="me-4 text-reset">
          <i class="bi bi-facebook"></i>
        </a>
      </div>
    </section>

    <section class="text-white">
      <div class="container text-center text-md-start mt-5">

        <div class="row mt-3">
          <div class="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">

            <h6 class="text-uppercase fw-bold mb-4">
              <i class="fas fa-gem me-3"></i>Petpal Incorporated
            </h6>
            <p style={{marginTop: "20px",}}>
              Our aim is to connect loving families with their perfect furry companions. We strive to promote
              responsible pet ownership and reduce the number of animals in need by facilitating successful adoptions,
              creating forever homes, and supporting animal welfare organizations.
            </p>
          </div>
          <div class="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">

            <h6 class="text-uppercase fw-bold mb-4" style={{marginLeft: "16px"}}>Contact</h6>
            <p><i class="bi bi-house me-3"></i> 100 Petpal St, Toronto, Ontario</p>
            <p>
              <i class="bi bi-envelope me-3"></i>
              petpal@gmail.com
            </p>
            <p><i class="bi bi-phone me-3"></i> + 01 234 567 88</p>
            <p><i class="bi bi-printer me-3"></i> + 01 234 567 89</p>
          </div>
        </div>
      </div>
    </section>
    <div class="text-center p-4 text-white" style={{backgroundColor: "rgba(0, 0, 0, 0.05)"}}>
      © 2021 Copyright Petpal
    </div>
  </footer>

    </>;

    /*<>
        <header>
            <div>
                <Link to="about">About</Link>
            </div>
            <div>Hello, joe</div>
        </header>
        <main>
            <Outlet />
        </main>
        <footer>
            &copy; CSC309 Lecture 14c
        </footer>
    </>;*/
}

export default Layout;