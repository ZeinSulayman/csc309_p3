import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from "react";

function Finder(props){
    return (<body>
    <section>
    <div class="container pt-4">
      <div class="d-flex flex-column flex-md-row justify-content-between">
        <div class="row">
          <div class="mb-3 mb-md-0">
            <form class="d-flex">
              <select class="form-control me-2">
                <option value="">Select Location</option>
                <option value="">San Francisco, CA</option>
              </select>
              <select style={{width:"60%"}} class="form-control me-2">
                <option value="">Any Breed</option>
                <option value="">Suspicious Dog</option>
              </select>
              <button class="btn btn-outline-success" type="submit">Search</button>
            </form>
          </div>
        </div>

        <div class="w-100 d-md-none d-block m-3"></div>

        <div class="row justify-content-end">
          <div style={{ marginLeft: '5px', marginBottom: '5px' }} className="col-md-auto">
  <div className="dropdown">
    <button
      className="btn btn-secondary dropdown-toggle"
      style={{ backgroundColor: '#2659F4', borderColor: '#2659F4' }}
      type="button"
      data-bs-toggle="dropdown"
      aria-expanded="false"
    >
      Sort
    </button>
    <ul className="dropdown-menu">
      <li>
        <a
          style={{ paddingRight: '20px' }}
          className="dropdown-item"
          href="./finder_sorted.html"
        >
          Sort by Age
        </a>
      </li>
      <li>
        <a
          style={{ paddingRight: '20px' }}
          className="dropdown-item"
          href="#"
        >
          Sort by Name
        </a>
      </li>
      <li>
        <a
          style={{ paddingRight: '20px' }}
          className="dropdown-item"
          href="#"
        >
          Sort by Size
        </a>
      </li>
    </ul>
  </div>
</div>


          <div style={{marginLeft:"5px", marginBottom:"5px;"}} class="col-md-auto">
            <div class="dropdown">
              <button class="btn btn-secondary dropdown-toggle" style={{backgroundColor:"#1548F3",borderColor:"#2659F4;"}}
                type="button" data-bs-toggle="dropdown" aria-expanded="false">
                Extra Filters
              </button>
              <ul class="dropdown-menu">
                <form action="./finder_filtered.html">

                  <div style={{ width: '350px', paddingLeft: '10px', paddingBottom: '5px', paddingRight: '10px', paddingTop: '10px' }}>
  <div style={{ paddingBottom: '10px' }}>
    <h6>Pet Size:</h6>
    <label htmlFor="Small" style={{ marginLeft: '20px' }}>Small</label>
    <label>
      <input type="radio" id="Small" name="select" value="small"></input>
      <img style={{ width: '15px' }} src="./img/dog_paw.png" alt="Option 1"></img>
    </label>
    <label style={{ paddingLeft: '12px' }} htmlFor="Medium">Medium</label>
    <label>
      <input type="radio" id="Medium" name="select" value="small"></input>
      <img style={{ width: '15px' }} src="./img/cat_paw.png" alt="Option 1"></img>
    </label>
    <label style={{ paddingLeft: '17px' }} htmlFor="Large">Large</label>
    <label>
      <input type="radio" id="Large" name="select" value="small"></input>
      <img style={{ width: '15px' }} src="./img/bird_claw.png" alt="Option 1"></img>
    </label>
  </div>
  <div style={{ paddingBottom: '10px' }}>
    <h6>Pet Age:</h6>
    <label style={{ paddingLeft: '14px', marginLeft: '5px' }} htmlFor="young">Young</label>
    <label>
      <input type="radio" id="young" name="age" value="small"></input>
      <img style={{ width: '15px' }} src="./img/dog_paw.png" alt="Option 1"></img>
    </label>
    <label style={{ paddingLeft: '33px' }} htmlFor="old">Adult</label>
    <label>
      <input type="radio" id="old" name="age" value="small"></input>
      <img style={{ width: '15px' }} src="./img/cat_paw.png" alt="Option 1"></img>
    </label>
    <label style={{ paddingLeft: '10px' }} htmlFor="senior">Senior</label>
    <label>
      <input type="radio" id="senior" name="age" value="small"></input>
      <img style={{ width: '15px' }} src="./img/bird_claw.png" alt="Option 1"></img>
    </label>
  </div>
  <div>
    <h6>Pet Sex:</h6>
    <label style={{ paddingLeft: '27px', marginLeft: '5px' }} htmlFor="male">Male</label>
    <label>
      <input type="radio" id="male" name="sex"></input>
      <img style={{ width: '15px' }} src="./img/dog_paw.png" alt="Option 1"></img>
    </label>
    <label style={{ paddingLeft: '21px' }} htmlFor="female">Female</label>
    <label>
      <input type="radio" id="female" name="sex"></input>
      <img style={{ width: '15px' }} src="./img/cat_paw.png" alt="Option 1"></img>
    </label>
  </div>
  <input
    className="btn btn-outline-success"
    style={{ marginTop: '20px', paddingRight: '10px', paddingLeft: '10px', marginLeft: '210px' }}
    type="submit"
    value="Apply Filter"
  ></input>
</div>

                </form>
              </ul>
            </div>
          </div>
          <div style={{marginLeft:'5px', marginBottom:'5px'}} class="col-md-auto">
            <a class="btn btn-outline-success" href="./finder.html">Reset Filter/Sort</a>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section>
    <div class="container text-center" style={{marginTop: "30px;"}}>
      <div class="row">
        <div class="col">
          <div class="card h-100">
            <img src="https://i.kym-cdn.com/entries/icons/original/000/041/444/sdc.jpg" class="card-img-top"
              style={{height: "30%;"}} alt="..."></img>
            <div class="card-body">
              <h5 class="card-title"><a href="./petdetail.html">Jack</a></h5>
              <p class="card-text"><strong>Breed:</strong> Suspicious Dog</p>
              <p class="card-text"><strong>Gender</strong> Male</p>
              <p class="card-text"><strong>Age:</strong> 2 yrs old</p>
              <p class="card-text"><strong>Size:</strong> Medium</p>
              <p class="card-text"><strong>Description:</strong> This is a very suspicious dog, but it will vibe with you
              </p>
              <p class="card-text"><strong>Location:</strong> San Francisco, CA</p>
              <a href="petdetailerror.html" class="btn btn-primary">Find out about Jack</a>
            </div>
            <div class="card-footer">
              <small class="text-body-secondary">Published: 22/12/2022</small>
            </div>
          </div>
        </div>

        <div class="w-100 d-md-none d-block m-3"></div>

        <div class="col">
          <div class="card h-100">
           <img
                  src="https://www.williamwalker.de/cdn/shop/articles/friendsofwilliamwalker_BreedProfileYorkshireTerrier4zu3_1024x.jpg?v=1628603961"
                  className="card-img-top"
                  style={{ height: '30%' }}
                  alt="..."
                />
                <div className="card-body">
                  <h5 className="card-title">
                    <a
                      style={{ textDecoration: 'none', color: 'black' }}
                      href="adopt.html"
                    >
                      Fredrick
                    </a>
                  </h5>
                </div>
              <p class="card-text"><strong>Breed:</strong> Yorkshire Terrier</p>
              <p class="card-text"><strong>Gender:</strong> Male</p>
              <p class="card-text"><strong>Age:</strong> 3 yrs old</p>
              <p class="card-text"><strong>Size:</strong> Small</p>
              <p class="card-text"><strong>Description:</strong> This is a very suspicious dog, but it will vibe with
                you</p>
              <p class="card-text"><strong>Location:</strong> Hamilton, ON</p>
              <a href="petdetail.html" class="btn btn-primary">Find out about Fredrick</a>
            </div>
            <div class="card-footer">
              <small class="text-body-secondary">Published: 22/12/2022</small>
            </div>
          </div>
        </div>

        <div class="w-100 d-md-none d-block m-3"></div>

        <div class="col">
          <div class="card h-100">
            <img src="img\american-bobtail.webp" class="card-img-top"
              style={{height: "30%;"}} alt="..."></img>
            <div class="card-body">
              <h5 class="card-title"><a style={{textDecoration:"none", color:"black;"}} href="./petdetail.html">Habib</a></h5>
              <p class="card-text"><strong>Breed:</strong> American Bobtail</p>
              <p class="card-text"><strong>Gender</strong> Male</p>
              <p class="card-text"><strong>Age:</strong> 6 yrs old</p>
              <p class="card-text"><strong>Size:</strong> Medium</p>
              <p class="card-text"><strong>Description:</strong> This is a very suspicious cat, but it will vibe with you
              </p>
              <p class="card-text"><strong>Location:</strong> San Francisco, CA</p>
              <a href="petdetailerror.html" class="btn btn-primary">Find out about Habib</a>
            </div>
            <div class="card-footer">
              <small class="text-body-secondary">Published: 22/12/2022</small>
            </div>
          </div>
        </div>
      </div>
      <div>
        <nav aria-label="Page navigation example">
          <ul class="pagination justify-content-center">
            <li class="page-item"><a class="page-link" href="#">Previous</a></li>
            <li class="page-item"><a class="page-link" href="#">1</a></li>
            <li class="page-item"><a class="page-link" href="#">2</a></li>
            <li class="page-item"><a class="page-link" href="#">3</a></li>
            <li class="page-item"><a class="page-link" href="#">Next</a></li>
          </ul>
        </nav>
      </div>
  </section>
  </body>
  );
};


export default Finder;