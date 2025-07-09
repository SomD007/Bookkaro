import React from 'react';
import { useLocation } from 'react-router-dom'; // to Get recieved data from LoginSignup.jsx page for Admin

function AdminDashboard(){

    const location = useLocation();
    const receivedData = location.state?.receivedData; // Optional chaining for safety
    return(
        <div>
            <h1>AdminDashboard</h1>
            {receivedData ? (
            <pre>{receivedData}</pre> //JSON.stringify(receivedData, null, 2)
          ) : (
            <p>No data received.</p>
          )}

        </div>
    );
}

export default AdminDashboard;