import React from 'react';
import Button from 'react-bootstrap/Button';
import {Create} from './create';
import './login.css'
import { useNavigate } from 'react-router-dom';

export function Login() {
  const [username, setUsername] = React.useState(JSON.parse(localStorage.getItem("this-user")).username ?? "");
  const [password, setPassword] = React.useState("");
  const [createAccount, setShow] = React.useState(false);
  const [alert, setAlert] = React.useState(false);
  const navigate = useNavigate();

  const handleClose = () => setShow(false);

  const handleCreateAccount = () => setShow(true);

  const onChangeUser = (e) => {
    setUsername(e.target.value);
  }

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  }

  const onChangeAlert = (b) => {
    setAlert(b);
  }

  return (
    <main>
      <Create show={createAccount} handleClose={handleClose}></Create>
      <div>
        <p>Please login to continue</p>
        <input type="text" placeholder="username" onChange={(e) => onChangeUser(e)} value={username}required />
        <input type="password" placeholder="password" onChange={(e) => onChangePassword(e)}required />
        <Button variant="info" onClick={() => authenticateUser()}>
          Login
        </Button>
        <p>Don't have an account?</p>
        <Button
          variant="info"
          onClick={handleCreateAccount}
        >
          Create Account
        </Button>
      </div>
      <Alert show={alert}></Alert>
    </main>
  );

function Alert({show}){
  return show ? (
    <div
      className="alert alert-danger"
      role="alert"
      id="login-alert"
    >Invalid username or password</div>) : null;
}

async function authenticateUser() {
  onChangeAlert(false);

  if (password === "" || username === "") {
    onChangeAlert(true);
    return;
  }

  let date = new Date();
  let date_str = `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`;

  const response = await fetch("api/auth", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      username: username,
      password: password,
      date: date_str,
    }),
  });

  if (response.ok) {
    let body = await response.json();
    localStorage.setItem("this-user", JSON.stringify(body));
    navigate("/home");
  } else {
    onChangeAlert(true);
  }
}
}
