import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export function Create({show, handleClose}) {
  const [alert, setAlert] = React.useState("");
  const [first, setFirst] = React.useState("");
  const [last, setLast] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirm, setConfirm] = React.useState("");

  const onChangeAlert = (show, msg="") => {
    if(show) setAlert(msg);
    else setAlert("");
  }

  const onChangeFirst = (e) => {
    setFirst(e.target.value);
  }

  const onChangeLast = (e) => {
    setLast(e.target.value);
  }

  const onChangeUsername = (e) => {
    setUsername(e.target.value);
  }

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  }
  
  const onChangeConfirm = (e) => {
    setConfirm(e.target.value);
  }


  return (
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create Account</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div id='account-info'>
              <div>
                First name:
                <input type="text" placeholder="John" onChange={(e) => onChangeFirst(e)} value={first}/>
              </div>
              <div>
                Last name:
                <input type="text" placeholder="Doe" onChange={(e) => onChangeLast(e)} value={last}/>
              </div>

              <div>
                Username:
                <input type="text" placeholder="JohnDoe123" onChange={(e) => onChangeUsername(e)} value={username} />
              </div>

              <div>
                Password:
                <input type="password" placeholder="8 characters minimum" onChange={(e) => onChangePassword(e)} value={password}/>
              </div>
              <div>
                Confirm:
                <input
                  type="password"
                  placeholder="confirm password"
                  onChange={(e) => onChangeConfirm(e)}
                  value={confirm}
                />
              </div>
              <Alert msg={alert}></Alert>
            </div>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Close</Button>
          <Button variant="primary" onClick={() => addUser()}>Save changes</Button>
        </Modal.Footer>
      </Modal>
  );

  function Alert({msg}) {
    return msg!=="" ? <div
                className="alert alert-danger"
                role="alert"
                id="create-profile-alert"
              >{msg}</div> : null;
  }

  async function addUser() {
  onChangeAlert(false);

  let create = validateCreateAccount();

  if (create) {
  let user = {
      first: first,
      last: last,
      username: username,
      password: password,
    };

    const response = await fetch("api/user", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(user),
    });

    if (response.ok) {
      onChangeAlert(false);
      handleClose();
    } else {
      onChangeAlert(true, "Username already taken!");
    }
  }
}

function validateCreateAccount() {
  let valid = true;

  if (first == "") {
    onChangeAlert(true, "Please enter your first name\n");
    valid = false;
  }
  if (last == "") {
    onChangeAlert(true, "Please enter your last name\n");
    valid = false;
  }
  if (username == "") {
    onChangeAlert(true, "Please enter a username\n");
    valid = false;
  } 

  valid = confirmPassword();

  if (password == confirm) {
    if (password.length < 8) {
      onChangeAlert(true, "Password must have at least 8 characters\n");
      valid = false;
    }

    if (password.length > 20) {
      onChangeAlert(true, "Password is too long\n");
      valid = false;
    }

    let regex1 = /[a-z]/;
    if (!regex1.test(password)) {
      onChangeAlert(true, "Password should contain a lowercase letter\n");
      valid = false;
    }

    let regex2 = /[A-Z]/;
    if (!regex2.test(password)) {
      onChangeAlert(true, "Password should contain an uppercase letter\n");
      valid = false;
    }

    let regex3 = /[\d]/;
    if (!regex3.test(password)) {
      onChangeAlert(true, "Password should contain a number\n");
      valid = false;
    }
  }

  return valid;
}

function confirmPassword() {
  let valid = true;

  if (password == "") {
    onChangeAlert(true, "Please enter a password\n");
    //password.style.background = alert_color;
    valid = false;
  } else {
    //password.style.background = "white";
  }

  if (password != confirm || confirm == "") {
    //confirm_pw.style.background = alert_color;
    onChangeAlert(true, "Passwords do not match");
    valid = false;
  } else {
    //confirm_pw.style.background = "white";
  }

  return valid;
}

}