import React, {useState, useEffect} from "react";
import { Axios } from "axios";
import './employee-viewpage.css';

export default function EmployeeViewPage() {
    return(
        <>
  <meta charSet="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Employee Page</title>
  <link rel="stylesheet" href="styles.css" />
  <div className="employee-container">
    <div className="employee-info">
      <div className="profile-picture">
        <img src="placeholder.jpg" alt="Profile Picture" />
      </div>
      <div className="employee-details">
        <h2>John Doe</h2>
        <p>Email: johndoe@example.com</p>
        <p>Phone: +1234567890</p>
      </div>
    </div>
    <label htmlFor="profile-picture" className="add-picture-label">
      Add Picture
    </label>
    <input type="file" id="profile-picture" accept="image/*" />
  </div>
</>

    )
}