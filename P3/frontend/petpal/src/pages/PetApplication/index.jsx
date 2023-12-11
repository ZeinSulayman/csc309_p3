import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';

const PetApplication = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dob, setDOB] = useState('');
  const [address, setAddress] = useState('');
  const [occupation, setOccupation] = useState('');
  const [email, setEmail] = useState('');
  const [hoursAwayWeekdays, setHoursAwayWeekdays] = useState('');
  const [hoursAwayWeekends, setHoursAwayWeekends] = useState('');
  const [medicalHistory, setMedicalHistory] = useState('');
  const [criminalHistory, setCriminalHistory] = useState('');
  const [previousPet, setPreviousPet] = useState(false);
  const [reasonForAdoption, setReasonForAdoption] = useState('');
  const [termsAgreement, setTermsAgreement] = useState(false);

  const { petId } = useParams();
  const [pet, setPet] = useState(null);

    useEffect(() => {
      const fetchPet = async () => {
        // Fetch pet details
        const petResponse = await fetch(`https://three09-p3-backend.onrender.com/pets/details/${petId}/`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
          }
        });
        const petData = await petResponse.json();
        setPet(petData);
      }
      fetchPet();
      }, [petId]);

      const handleSubmit = async (e) => {
        const petApplication = {
          first_name: firstName,
          last_name: lastName,
          dob: dob,
          address: address,
          occupation: occupation,
          email: email,
          hours_away_weekdays: hoursAwayWeekdays,
          hours_away_weekends: hoursAwayWeekends,
          medical_history: medicalHistory,
          criminal_history: criminalHistory,
          first_time_pet_owner: previousPet,
          description: reasonForAdoption
        }

        console.log("Pet Application: ", petApplication)

        try {
          // Create the POST request using the fetch API
          const response = await fetch(`https://three09-p3-backend.onrender.com/pets/${petId}/application/`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('access_token')}`
            },
            body: JSON.stringify(petApplication),
          });
          window.location.href = "/applications/";
        } catch (error) {
          // Handle network errors
          console.error('Network error:', error.message);
        }

        console.log({
          firstName,
          lastName,
          dob,
          address,
          occupation,
          email,
          hoursAwayWeekdays,
          hoursAwayWeekends,
          medicalHistory,
          criminalHistory,
          previousPet,
          reasonForAdoption,
          termsAgreement,
        });

        // Reset form fields after submission
        setFirstName('');
        setLastName('');
        setDOB('');
        setAddress('');
        setOccupation('');
        setEmail('');
        setHoursAwayWeekdays('');
        setHoursAwayWeekends('');
        setMedicalHistory('');
        setCriminalHistory('');
        setPreviousPet(false);
        setReasonForAdoption('');
        setTermsAgreement(false);
      };


  if (!pet) {
    return <p>Loading...</p>;
  }

  const handleCheckboxPreviousPet = (event) => {
    setPreviousPet(event.target.checked);
  };

  return (
    <section className="adoptapp-background">
      <div className="container mt-5 mb-5">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card" style={{ backgroundColor: '#e6f7ff' }}>
              <div className="card-body">
                <h2 className="mb-4 text-center">Pet Adoption Application for {pet.name}</h2>

                <form className="needs-validation" onSubmit={handleSubmit}>

                  <h5 className="text-center mb-4"><strong>Pet Name: </strong> {pet.name}</h5>
                  <p className="text-center"><strong>Code: </strong> #{petId}</p>

                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <div className="input-group">
                        <span className="input-group-text"><i className="fas fa-user"></i></span>
                        <input type="text" className="form-control" id="firstName" placeholder="First Name" onChange={e => setFirstName(e.target.value)} required />
                      </div>
                    </div>

                    <div className="col-md-6 mb-3">
                      <div className="input-group">
                        <span className="input-group-text"><i className="fas fa-user"></i></span>
                        <input type="text" className="form-control" id="surname" placeholder="Surname" onChange={e => setLastName(e.target.value)} required />
                      </div>
                    </div>
                  </div>

                  <div className="mb-3 input-group">
                    <span className="input-group-text"><i className="fas fa-birthday-cake"></i></span>
                    <input type="date" className="form-control" id="dob" placeholder="Date of Birth" onChange={e => setDOB(e.target.value)} />
                  </div>

                  <div className="mb-3 input-group">
                    <span className="input-group-text"><i className="fas fa-envelope"></i></span>
                    <input type="email" className="form-control" id="email" placeholder="Email" onChange={e => setEmail(e.target.value)}/>
                  </div>

                  <div className="mb-3 input-group">
                    <span className="input-group-text"><i className="fas fa-home"></i></span>
                    <input type="text" className="form-control" id="address" placeholder="Address" onChange={e => setAddress(e.target.value)} />
                  </div>

                  <div className="mb-3 input-group">
                    <span className="input-group-text"><i className="fas fa-briefcase"></i></span>
                    <input type="text" className="form-control" id="occupation" placeholder="Occupation" onChange={e => setOccupation(e.target.value)} />
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <div className="input-group">
                        <span className="input-group-text"><i className="fas fa-clock"></i></span>
                        <select className="form-select" id="awayWeekdays" defaultValue={""} onChange={e => setHoursAwayWeekdays(e.target.value)} required>
                          <option>--</option>
                          <option>1-3 hours</option>
                          <option>4-6 hours</option>
                          <option>7-9 hours</option>
                          <option>10+ hours</option>
                        </select>
                      </div>
                    </div>

                    <div className="col-md-6 mb-3">
                      <div className="input-group">
                        <span className="input-group-text"><i className="fas fa-clock"></i></span>
                        <select className="form-select" id="awayWeekends" required defaultValue={""} onChange={e => setHoursAwayWeekends(e.target.value)}>
                          <option>--</option>
                          <option>1-3 hours</option>
                          <option>4-6 hours</option>
                          <option>7-9 hours</option>
                          <option>10+ hours</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="mb-3 input-group">
                    <span className="input-group-text"><i className="fas fa-heartbeat"></i></span>
                    <select className="form-select" id="healthCondition" required defaultValue={""} onChange={e => setMedicalHistory(e.target.value)}>
                      <option>--</option>
                      <option>Healthy</option>
                      <option>Not Healthy</option>
                    </select>
                  </div>

                  <div className="mb-3 input-group">
                    <span className="input-group-text"><i className="fas fa-gavel"></i></span>
                    <select className="form-select" id="criminalHistory" required defaultValue={""} onChange={e => setCriminalHistory(e.target.value)}>
                      <option>--</option>
                      <option>Exists</option>
                      <option>Doesn't Exist</option>
                    </select>
                  </div>

                  <div className="mb-3 input-group">
                    <input className="form-check-input" type={"checkbox"} value={""} id="hadPetBefore" defaultValue={""} checked={previousPet} onChange={handleCheckboxPreviousPet} />
                    <label className={"form-check-label"} htmlFor={"hadPetBefore"} style={{paddingLeft: "10px"}}>
                      Have you owned a pet before?
                    </label>
                  </div>

                  <div className="mb-3 input-group">
                    <span className="input-group-text"><i className="fas fa-comment"></i></span>
                    <textarea className="form-control" id="reason" placeholder="Reason for Adoption" rows="3" onChange={e => setReasonForAdoption(e.target.value)}></textarea>
                  </div>

                  <div className="form-check mb-3">
                    <input className="form-check-input" type="checkbox" value="" id="invalidCheck" required />
                    <label className="form-check-label" htmlFor="invalidCheck">
                      Agree to terms and conditions
                    </label>
                    <div className="invalid-feedback">
                      You must agree before submitting.
                    </div>
                  </div>

                  <button type="submit" className="btn btn-primary w-100 mt-3">
                    Submit Application
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PetApplication;