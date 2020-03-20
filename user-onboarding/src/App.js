import React, { useState } from "react";
import axios from "axios";
import "./App.css";
import Form from "./Form.js";

function App() {
  const [sendState, setSendState] = useState([]);
  const [userList, setUserList] = useState([]);

  const userHandler = createUser => {
    setSendState([...sendState, createUser]);
    axios
      .post("https://reqres.in/api/users", { createUser })
      .then(response => {
        console.log("This is your response: ", response);
        setUserList([response.data]);
      })
      .catch(error => {
        console.log("We have an error: ", error);
      });
  };

  console.log("userList", userList);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Profile</h1>
        <Form submitUser={userHandler} />
        {userList.map(user => {
          return (
            <div>
              <ul>
                <li>Name: {user.createUser.name}</li>
                <li>Email: {user.createUser.email}</li>
                <li>Password: {user.createUser.password}</li>
                <li>{user.createUser.tos === true ? "yes" : ""}</li>
              </ul>
            </div>
          );
        })}
      </header>
    </div>
  );
}

export default App;
