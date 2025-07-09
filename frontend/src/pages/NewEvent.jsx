// function NewEvent(){
//     return(
//         <div>
//             <h1>new Event</h1>
//         </div>
//     );
// }

// export default NewEvent;

import React, { useState, useEffect} from 'react';
import './NewEvent.css';
import { useLocation } from 'react-router-dom'; // to Get recieved data from LoginSignup.jsx page for Admin
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; //To navigate to pages


const EventForm = () => {

    const location = useLocation();
    const receivedData = location.state?.receivedData;
    //const username = location.state?.username;

  const [formData, setFormData] = useState({
    eventName: '',
    status: 'Live',
    totalTickets: '',
    date: '',
    time: '',
    location: '',
  });

    const navigate = useNavigate();// to navigate to /org page


  //Getting the Username from the backend using Axios 
  const [loading, setLoading] = useState(true);

  // Fetch username from backend
  // useEffect(() => {
  //   const fetchUsername = async () => {
  //     try {
  //       const response = await axios.get('http://localhost:5000/api/get-current-username'); 
  //       const username = response.data.username;

  //       setFormData((prev) => ({
  //         ...prev,
  //         createdBy: username, // Set the USERNAME in formData
  //       }));
  //     } catch (error) {
  //       console.error('Error fetching username:', error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchUsername();
  // }, []);call 


  const [userName, setUserName] = useState('');  // Store the logged-in user's name
  const [username, setUsername] = useState('');  // Store the logged-in user's username


  // Fetch the username and User's name using axios
  useEffect(() => {
    // Call the backend to get the current user details (name and username)
    axios.get('http://localhost:5000/api/get-current-user', { withCredentials: true })
      .then((response) => {
        if (response.data.username && response.data.name) {
          setUsername(response.data.username);  // Store the username
          setUserName(response.data.name);      // Store the name
        } else {
          console.error("Error: User not logged in.");
        }
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
}, []);






//console.log(username);

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value, createdBy: username })); //assignin the username value to the createdBy variable/key
  };


  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch('http://localhost:5000/api/create-event', { //fetch() is used to send post request
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    const result = await response.json();
    

    



    if (response.ok) { //if response is ok means NEW EVENT data is stored in the database 

      navigate('/org');

      alert('✅ Event Created Successfully');
      console.log('Server Response:', result);
    } else {
      alert(`❌ Error: ${result.error}`);
    }
  } catch (error) {
    console.error("Network Error:", error);
    alert('❌ Could not connect to server');
  }
  }; //Handle submit



    
  

  return (
    <div className="event-form-container">
      <form className="event-form" method="POST" action="" onSubmit={handleSubmit}>
        <h2>Create New Event</h2>


        
        <h3><span>Username:</span> {username}</h3><br></br><br></br>





        <label>
          Event Name
          <input
            type="text"
            name="eventName"
            value={formData.eventName}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Status
          <select name="status" value={formData.status} onChange={handleChange}>
            <option value="Live">Live</option>
            <option value="Draft">Draft</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </label>

        <label>
          Total Tickets
          <input
            type="number"
            name="totalTickets"
            value={formData.totalTickets}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Date
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Time
          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Location
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </label>

        <button type="submit" className="submit-btn">Create Event</button>
      </form>
    </div>
  );
};

export default EventForm;
