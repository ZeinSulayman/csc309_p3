import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import doggy from '../../images/dog-png-30.png';

const Home = () => {
  return (<body>
  <section class="banner text-sm-start text-center p-4">
    <div class="container">
      <div class="d-sm-flex justify-content-center align-items-center">
        <div>
          <h1>Finding Forever Homes, One Paw at a Time.</h1>
          <p>Welcome to <span>PetPal</span>! At our site,
            we believe in the magic of companionship and the joy that pets bring to our lives. We're more than just a
            pet adoption platform; we're matchmakers, bringing together loving families and adorable pets in need of a
            home. Our dedicated team works tirelessly to ensure that every pet on our platform is not just a statistic,
            but a soul deserving of love and care. From playful kittens to loyal dogs and everything in between, our
            site is a virtual sanctuary where hearts meet furry paws.</p>
        </div>
        <img class="img-fluid" src={doggy} alt=""></img>
      </div>
    </div>
  </section>

  <section class="container p-5">
    <div class="row">
      <div class="col-md-4 mb-4">
        <div class="homecards card h-100 text-center">
          <div class="card-body">
            <h2 class="card-title">Save a Life</h2>
            <p class="card-text">By adopting a pet, you are giving a homeless animal a second chance at life. Many
              animals in shelters are euthanized due to overcrowding, and adopting saves them from this fate.</p>
          </div>
        </div>
      </div>
      <div class="col-md-4 mb-4">
        <div class="card h-100 text-center homecards">
          <div class="card-body">
            <h2 class="card-title">Unconditional Love</h2>
            <p class="card-text">Adopted pets are incredibly grateful and show immense loyalty and love to their
              adopters. They often understand that they've been given a second chance and reciprocate with unconditional
              love.</p>
          </div>
        </div>
      </div>
      <div class="col-md-4 mb-4">
        <div class="card h-100 text-center homecards">
          <div class="card-body">
            <h2 class="card-title">Health Benefits</h2>
            <p class="card-text">Studies have shown that having pets can lower blood pressure, reduce stress, and
              improve overall mental and physical health. The companionship of a pet can bring joy and reduce feelings
              of loneliness.</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section>
    <div class="container">
      <h1 class="">Recent Adoptions</h1>
    </div>
    <div class="container border border-secondary border-3 py-5 rounded-2" style={{backgroundColor: "lightgray"}}>
      <div id="carouselExampleCaptions" class="carousel slide vertical mx-5" data-bs-ride="carousel">
        <div class="carousel-indicators">
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active"
            aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1"
            aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2"
            aria-label="Slide 3"></button>
        </div>
        <div class="carousel-inner">
          <div class="carousel-item active h-100">
            <img
              src="https://people.com/thmb/BJO005QLK6f4YcZHW0iONQxoJ1g=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():focal(999x0:1001x2)/family-adopt-dog-6c2f1eedd593433f85549e94e07af8bf.jpg"
              class="d-block w-100" style={{ height: '100%', objectFit: 'fill' }}></img>
            <div class="carousel-caption d-none d-md-block">
              <h5>Jack and Joe</h5>
            </div>
          </div>
          <div class="carousel-item h-100">
            <img
              src="https://images.contentstack.io/v3/assets/blt6f84e20c72a89efa/bltd3894bd280c131a6/6261d197787c0839e4c667c5/zpc_og_article_benefits-adopting-pet.jpg"
              class="d-block w-100" style={{ height: '100%', objectFit: 'fill' }}></img>
            <div class="carousel-caption d-none d-md-block">
              <h5>Sparky and Maria</h5>
            </div>
          </div>
          <div class="carousel-item h-100 ">
            <img src="https://i.kym-cdn.com/entries/icons/original/000/041/444/sdc.jpg" class="d-block w-100"
              style={{ height: '100%', objectFit: 'fill' }}></img>
            <div class="carousel-caption d-none d-md-block">
              <h5>Thomas and Alpha</h5>
            </div>
          </div>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions"
          data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions"
          data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  </section>

  <section class="container p-5">
    <div class="row">
      <div class="col-md-4 mb-4">
        <div class="card h-100 d-flex flex-column">

          <div class="card-body d-flex flex-column">
            <blockquote class="blockquote mb-0 flex-grow-1">
              <p>"The best things in life are rescued."</p>

            </blockquote>
          </div>
          <footer class="blockquote-footer mx-2">Tim <cite title="Source Title">Johnson</cite></footer>
        </div>
      </div>
      <div class="col-md-4 mb-4" >
        <div class="card h-100 d-flex flex-column">

          <div class="card-body d-flex flex-column">
            <blockquote class="blockquote mb-1 flex-grow-1">
              <p>"Your new best friend is waiting for you at the shelter."</p>

            </blockquote>

          </div>
          <footer class="blockquote-footer mx-2">Mary <cite title="Source Title">Moe</cite></footer>
        </div>
      </div>
      <div class="col-md-4 mb-4" >
        <div class="card h-100 d-flex flex-column">

          <div class="card-body d-flex flex-column">
            <blockquote class="blockquote mb-1 flex-grow-1">
              <p>"Adopting a pet may not change the world, but for that pet, the world changes
                forever."</p>

            </blockquote>
          </div>
          <footer class="blockquote-footer mx-2">Joe <cite title="Source Title">Brown</cite></footer>
        </div>
      </div>
    </div>
  </section>

  <section>
    <div class="bubble-container">
      <div class="bubble small" style={{position: 'absolute', top: '10%', left: '10%' }}></div>
      <div class="bubble medium"  style={{ position: 'absolute', top: '20%', left: '30%' }}></div>
      <div class="bubble large"  style={{ position: 'absolute', top: '40%', left: '50%' }}></div>
      <div class="bubble small"  style={{ position: 'absolute', top: '60%', left: '70%' }}></div>
      <div class="bubble medium"  style={{ position: 'absolute', top: '80%', left: '20%' }}></div>
      <div class="bubble large"  style={{ position: 'absolute', top: '90%', left: '80%' }}></div>
      <div class="container-fluid my-5 h-100">
        <div class="row h-100">
          <div class="col">
            <img src="https://www.pngall.com/wp-content/uploads/13/Black-Cat-Transparent.png" class="img-fluid"
              alt="..."></img>
          </div>
          <div class="col">
            <a href="/api/newuser" class="get-started-text">
              <div class="get-started-button d-flex justify-content-center align-items-center" style={{color: "white"}}>
                <p class="mb-0">Get Started Today!</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
  </body>
  );
};

export default Home;
