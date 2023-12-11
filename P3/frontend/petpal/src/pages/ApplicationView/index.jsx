import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';

const ApplicationView = () => {
  const [status, setStatus] = useState("");
  const [app, setApp] = useState(null);
  const { appId } = useParams();

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
        console.log("AppData: ", appData)
      }
      fetchApp();
      console.log("App: ", app)
      }, [appId]);

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
                <h2 className="mb-4 text-center">Pet Adoption Application for {app.pet_name}</h2>
                  <h5 className="text-center mb-4"><strong>Pet Name: </strong> {app.pet_name}</h5>
                  <p className="text-center"><strong>Code: </strong> #{app.pet}</p>

                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <div className="input-group">
                        <span className="input-group-text" style={{height: "40px"}}><i className="fas fa-comment">First Name:</i></span>
                        <p className={"form-control"} style={{height: "40px"}}>First Name: {app.first_name}</p>
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
                      {!localStorage.getItem("shelter") ? (
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