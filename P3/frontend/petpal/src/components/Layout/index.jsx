import { useContext, useState, useEffect } from "react";
import { Outlet, Link, useLocation } from "react-router-dom"

//import { UserContext } from '../../contexts/UserContext';

import { useUser } from '../../contexts/UserContext';
import ListWithPagination from './pagination'
import 'bootstrap/dist/css/bootstrap.min.css';
import * as Icon from 'react-bootstrap-icons';

function Layout(props){

    const [isAuth, setIsAuth] = useState(false);
    const { user, updateUser } = useUser();
    const {filter, setFilter} = useState("False")

    const [notiList, setNotiList] = useState([]);

  const [showRead, setShowRead] = useState(false);

    /*const filteredNotifications = showUnread
    ? notiList.filter(notification => !notification.read)
    : notiList;*/
     const filteredNotifications = showRead
    ? notiList.filter(notification => notification.read)
    : notiList.filter(notification => !notification.read);


    const get_noti = async (e) => {
        try {
            // Create the POST request using the fetch API
            const response = await fetch("http://127.0.0.1:8000/noti/?read=${filter}", {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                },
            });
            // Check if the request was successful (status code in the range 200-299)
            if (response.ok) {
                const data = await response.json();
                setNotiList(data.results)
            } else {
                // Handle error responses
                console.error('Error:', response.statusText);
            }
        } catch (error) {
            // Handle network errors
            console.error('Network error:', error.message);
        }
    };

     const del = async (e) => {
     console.log(e)
        try {
            // Create the POST request using the fetch API
            const response = await fetch(`http://127.0.0.1:8000/noti/${e}/`, {
                method: 'delete',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                },
            });
            // Check if the request was successful (status code in the range 200-299)
            if (response.ok) {
                //const data = await response.json();
                get_noti();
            } else {
                // Handle error responses
                console.error('Error:', response.statusText);
            }
        } catch (error) {
            // Handle network errors
            console.error('Network error:', error.message);
        }
    };

    const markAsRead = async (id) => {
        //setNotiList((notiList) =>
        //  notiList.map((notification) =>
        //    notification.id === id ? { ...notification, read: true } : notification
          //)
        //);
        console.log(id)
        try {
            // Create the POST request using the fetch API
            const response = await fetch(`http://127.0.0.1:8000/noti/${id}/`, {
                method: 'put',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                },
            });
            // Check if the request was successful (status code in the range 200-299)
            if (response.ok) {
                //console.log('yes')
                const data = await response.json();
                await get_noti();
                //setNotiList(data.results)
            } else {
                // Handle error responses
                console.error('Error:', response.statusText);
            }
        } catch (error) {
            // Handle network errors
            console.error('Network error:', error.message);
        }
    };



   useEffect(() => {
     console.log(localStorage.getItem('shelter') )
     if (localStorage.getItem('access_token') !== null) {
        setIsAuth(true);
        get_noti();
        console.log(isAuth)
        console.log(notiList)
     }
      console.log(notiList)
    }, [isAuth]);

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
                  href="/map"
                  style={{ fontWeight: 'bold', color: 'skyblue' }}
                >
                  Map
                </a>
              </li>
              <li className="nav-item mx-2">
                <a
                  className="nav-link active"
                  aria-current="page"
                  href="/api/user/"
                  style={{ fontWeight: 'bold', color: 'skyblue' }}
                >
                  Login
                </a>
              </li>
              <li className="nav-item mx-2">
            <a className="nav-link" href="/finder" style={{color: "white"}}>Finder</a>
          </li>{isAuth ? (
           localStorage.getItem('shelter') === 'true' ? (
                <li className="nav-item dropdown mx-2">
            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"
              style={{color: "white"}}>
              Shelter
            </a>
            <ul className="dropdown-menu dropdown-menu-start">
              <li><a className="dropdown-item" href="/shelter">Manage Account</a></li>
              <li><a className="dropdown-item" href="/applications">Manage Adoptions</a></li>
              <li><a className="dropdown-item" href="/api/newuser">Sign-up</a></li>
            </ul>
          </li>
          ) : (
               <li className="nav-item dropdown mx-2">
            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"
              style={{color: "white"}}>
              Seeker
            </a>
            <ul className="dropdown-menu dropdown-menu-start">
              <li><a className="dropdown-item" href="/seeker">Manage Account</a></li>
              <li><a className="dropdown-item" href="/applications">Manage Adoptions</a></li>
              <li><a className="dropdown-item" href="/api/newuser">Sign-up</a></li>
            </ul>
          </li>
              )):null}
          <li class="nav-item mx-2">
            <button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#exampleModal">
              <Icon.Bell class="bi bi-bell" style={{color: "white"}}></Icon.Bell>
            </button>
            </li>
            </div>
          </div>
        </nav>
      </section>

          <section>
      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Notifications</h5>

              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
<button onClick={() => setShowRead(!showRead)}>
        {showRead ? 'Show Unread Notifications' : 'Show Read Notifications'}
      </button>
    <ListWithPagination items={filteredNotifications} itemsPerPage={5} />;

            {/*<div class="modal-body">
              <ul class="list-group">
                {notiList && notiList.map((notification) => (
                  <li class="list-group-item" key={notification.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div
                style={{
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  display: 'inline-block',
                  marginRight: '5px',
                  backgroundColor: notification.read ? 'green' : 'red',
                }}
              />
                  <a onClick={() => markAsRead(notification.id)} style={{ textDecoration: 'none', color: 'black', cursor: 'pointer' }} href={notification.link}>{notification.content}</a>
                    <div>
                    <button type="button" onClick={() => del(notification.id)}>
                        <Icon.Trash className="bi bi-bell" style={{ color: 'black' }}></Icon.Trash>
                </button>

                      </div>
              </li>
                ))}
              </ul>
            </div>*/}
          </div>
        </div>
      </div>
    </section>

      <section>
        <Outlet />
      </section>

      <footer className="text-center text-lg-start bg-light text-muted foot">

    <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom" style={{color: "white"}}>

      <div className="me-5 d-none d-lg-block">
        <span>Get connected with us on social networks:</span>
      </div>

      <div>
        <a href="" className="me-4 text-reset">
          <i className="bi bi-instagram"></i>
        </a>
        <a href="" className="me-4 text-reset">
          <i className="bi bi-facebook"></i>
        </a>
      </div>
    </section>

    <section className="text-white">
      <div className="container text-center text-md-start mt-5">

        <div className="row mt-3">
          <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">

            <h6 className="text-uppercase fw-bold mb-4">
              <i className="fas fa-gem me-3"></i>Petpal Incorporated
            </h6>
            <p style={{marginTop: "20px",}}>
              Our aim is to connect loving families with their perfect furry companions. We strive to promote
              responsible pet ownership and reduce the number of animals in need by facilitating successful adoptions,
              creating forever homes, and supporting animal welfare organizations.
            </p>
          </div>
          <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">

            <h6 className="text-uppercase fw-bold mb-4" style={{marginLeft: "16px"}}>Contact</h6>
            <p><i className="bi bi-house me-3"></i> 100 Petpal St, Toronto, Ontario</p>
            <p>
              <i className="bi bi-envelope me-3"></i>
              petpal@gmail.com
            </p>
            <p><i className="bi bi-phone me-3"></i> + 01 234 567 88</p>
            <p><i className="bi bi-printer me-3"></i> + 01 234 567 89</p>
          </div>
        </div>
      </div>
    </section>
    <div className="text-center p-4 text-white" style={{backgroundColor: "rgba(0, 0, 0, 0.05)"}}>
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