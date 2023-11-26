import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = () => {
  return (<section class="container p-5">
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
  );
};

export default Home;
