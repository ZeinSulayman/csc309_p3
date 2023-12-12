import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import CommentList from "../../components/Comments";
import Map from "../../components/Map";

const ApplicationView = () => {
  const [status, setStatus] = useState("");
  const [app, setApp] = useState(null);
  const { appId } = useParams();
  const [comments, setComments] = useState(null)
  const [content, setContent] = useState("")

    useEffect(() => {
      const fetchApp = async () => {
        // Fetch app details
        const appResponse = await fetch(`http://127.0.0.1:8000/application/${appId}/`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
          }
        });
        const appData = await appResponse.json();
        setApp(appData);
        console.log("app", appData)
        await get_comments();
      }
      fetchApp();
      console.log("App: ", app)
      }, [appId]);

      const get_comments = async () => {
        try {
            // Create the GET request using the fetch API
            const response = await fetch(`http://127.0.0.1:8000/apps/${appId}/comments/`, {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                },
            });
            // Check if the request was successful (status code in the range 200-299)
            if (response.ok) {
            //console.log(data)
                const data = await response.json();
                setComments(data.results)
                console.log("Comments", data)

            } else {
                // Handle error responses
                console.error('Error:', response.statusText);
            }
        } catch (error) {
            // Handle network errors
            console.error('Network error:', error.message);
        }
      };

      const com = {
            content: content,
            name:localStorage.getItem('name'),
        };
    const post_comments = async (e) => {
        try {
            // Create the POST request using the fetch API
            const response = await fetch(`http://127.0.0.1:8000/apps/${appId}/comments/`, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                },
                 body: JSON.stringify(com),
            });
            // Check if the request was successful (status code in the range 200-299)
            if (response.ok) {
            //console.log(data)
                const data = await response.json();
                setComments(data.results)
                console.log(data)
                window.location.reload();

                setContent("")

            } else {
                // Handle error responses
                console.error('Error:', response.statusText);
            }
        } catch (error) {
            // Handle network errors
            console.error('Network error:', error.message);
        }
    };

      const handleStatusChange = async (e) => {
        const statusJSON = {
          status: status
        }

        try {
          // Create the POST request using the fetch API
          const response = await fetch(`http://127.0.0.1:8000/application/${appId}/status/`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('access_token')}`
            },
            body: JSON.stringify(statusJSON),
          });
        } catch (error) {
          // Handle network errors
          console.error('Network error:', error.message);
        }
        window.location.href = "/applications/";
        // Reset form fields after submission
        setStatus('');
      };

  if (!app) {
    return <p>Loading...</p>;
  }

  return (
    <section className="adoptapp-background">
      <div className="container mt-5 mb-5">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card" style={{ backgroundColor: '#e6f7ff' }}>
              <div className="card-body">
                  {comments ? (
        <CommentList comments={comments} />
      ) : (
        <p>Loading comments...</p> // You can render a loading message or anything else while comments are being fetched or initialized
   )}

<div class="modal fade" id="Modal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Submit a Comment</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
         <textarea class="form-control" style={{marginBottom: "10px"}} aria-label="With textarea" placeholder="Comment" id="review" onChange={e => setContent(e.target.value)}></textarea>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
         <button type="button" class="btn btn-primary" onClick={() => post_comments()} >Submit</button>
      </div>
    </div>
  </div>
</div>
                <h2 className="mb-4 text-center">Pet Adoption Application for {app.pet_name}</h2>
                  <h5 className="text-center mb-4"><strong>Pet Name: </strong> {app.pet_name}</h5>
                  <p className="text-center"><strong>Code: </strong> #{app.pet}</p>

                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <div className="input-group">
                        <span className="input-group-text" style={{height: "40px"}}><i className="fas fa-comment">First Name:</i></span>
                        <p className={"form-control"} style={{height: "40px"}}>{app.first_name}</p>
                      </div>
                    </div>

                    <div className="col-md-6 mb-3">
                      <div className="input-group">
                        <span className="input-group-text" style={{height: "40px"}}><i className="fas fa-comment">Surname:</i></span>
                        <p className={"form-control"} style={{height: "40px"}}>{app.last_name}</p>
                      </div>
                    </div>
                  </div>

                  <div className="mb-3 input-group">
                    <span className="input-group-text" style={{height: "40px"}}><i className="fas fa-comment">Date of Birth:</i></span>
                    <p className={"form-control"} style={{height: "40px"}}>{app.dob}</p>
                  </div>

                  <div className="mb-3 input-group">
                    <span className="input-group-text" style={{height: "40px"}}><i className="fas fa-comment">Email:</i></span>
                    <p className={"form-control"} style={{height: "40px"}}>{app.email}</p>
                  </div>

                  <div className="mb-3 input-group">
                    <span className="input-group-text" style={{height: "40px"}}><i className="fas fa-comment">Address:</i></span>
                    <p className={"form-control"} style={{height: "40px"}}>{app.address}</p>
                  </div>

                  <div className="mb-3 input-group">
                    <span className="input-group-text" style={{height: "40px"}}><i className="fas fa-comment">Occupation:</i></span>
                    <p className={"form-control"} style={{height: "40px"}}>{app.occupation}</p>
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <div className="input-group">
                        <span className="input-group-text" style={{height: "40px"}}><i className="fas fa-comment">Hours away on Weekdays:</i></span>
                        <p className={"form-control"} style={{height: "40px"}}>{app.hours_away_weekdays}</p>
                      </div>
                    </div>

                    <div className="col-md-6 mb-3">
                      <div className="input-group">
                        <span className="input-group-text" style={{height: "40px"}}><i className="fas fa-comment">Hours away on Weekends:</i></span>
                        <p className={"form-control"} style={{height: "40px"}}>{app.hours_away_weekends}</p>
                      </div>
                    </div>
                  </div>

                  <div className="mb-3 input-group">
                    <span className="input-group-text" style={{height: "40px"}}><i className="fas fa-comment">Health Condition:</i></span>
                    <p className={"form-control"} style={{height: "40px"}}>{app.medical_history}</p>
                  </div>

                  <div className="mb-3 input-group">
                    <span className="input-group-text" style={{height: "40px"}}><i className="fas fa-comment">Criminal History:</i></span>
                    <p className={"form-control"} style={{height: "40px"}}>{app.criminal_history}</p>
                  </div>

                  <div className="mb-3 input-group">
                    <span className="input-group-text" style={{height: "40px"}}><i className="fas fa-comment">Had you owned a pet before?</i></span>
                    <p className={"form-control"} style={{height: "40px"}}> {app.first_time_pet_owner ? (
                        <>
                          Yes
                        </>
                      ) : (
                        <>
                          No
                        </>
                      )}</p>
                  </div>

                  <div className="mb-3 input-group">
                    <span className="input-group-text" style={{height: "120px"}}><i className="fas fa-comment">Reason for Adoption</i></span>
                    <p className={"form-control"} style={{height: "120px"}}>{app.description}</p>
                  </div>
                {app.status === "pending"? (
                    <form className="needs-validation" onSubmit={handleStatusChange}>
                  <div className="input-group">
                    <span className="input-group-text"><i className="fas fa-clock"></i></span>
                    <select className="form-select" id="status" required defaultValue={""} onChange={e => setStatus(e.target.value)}>
                      <option>{app.status}</option>
                      {localStorage.getItem('shelter') === "false"? (
                        <>
                          <option>withdrawn</option>
                        </>
                      ) : (
                        <>
                          <option>accepted</option>
                          <option>denied</option>
                        </>
                      )}
                    </select>
                  </div>
                  <button type="submit" className="btn btn-primary w-100 mt-3">
                    Edit Status
                  </button>
                  <button type="submit" className="btn btn-primary w-100 mt-3" >
                        <a style={{color: "#ffffff", textDecoration: "None"}} href={"/applications/"}>
                          Back to Applications
                        </a>
                      </button>
                </form>
                ) : (
                    <>
                      <div className="mb-3 input-group">
                        <span className="input-group-text" style={{height: "40px"}}><i className="fas fa-comment">Status</i></span>
                        <p className={"form-control"} style={{height: "40px"}}>{app.status}</p>
                      </div>
                      <button type="submit" className="btn btn-primary w-100 mt-3" >
                        <a style={{color: "#ffffff", textDecoration: "None"}} href={"/applications/"}>
                          Back to Applications
                        </a>
                      </button>
                    </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ApplicationView;