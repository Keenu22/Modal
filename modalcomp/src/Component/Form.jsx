import React, { forwardRef, useImperativeHandle, useRef, useState } from "react";
import "./Form.css";

const Form = forwardRef((props, ref) => {
  const dialogRef = useRef(null);
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [dobError, setDobError] = useState("");

  useImperativeHandle(ref, () => ({
    open: () => {
      if (dialogRef.current) {
        dialogRef.current.showModal();
      }
    },
    close: () => {
      if (dialogRef.current) {
        dialogRef.current.close();
      }
    }
  }));

  const validateEmail = (value) => {
    if (!value.includes("@")) {
      setEmailError("Please enter a valid email address.");
      return false;
    } else {
      setEmailError("");
      return true;
    }
  };

  const validatePhone = (value) => {
    if (value.length !== 10 || isNaN(value)) {
      setPhoneError("Invalid Phone Number. Enter a 10-digit phone number.");
      return false;
    } else {
      setPhoneError("");
      return true;
    }
  };

  const validateDOB = (value) => {
    const dobDate = new Date(value);
    const today = new Date();
    if (dobDate > today) {
      setDobError("Invalid date of birth. Date of Birth cannot be in the future.");
      return false;
    } else {
      setDobError("");
      return true;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isEmailValid = validateEmail(email);
    const isPhoneValid = validatePhone(phone);
    const isDobValid = validateDOB(dob);

    if (isEmailValid && isPhoneValid && isDobValid) {
      alert("Form submitted successfully!");

      // Reset the state variables
      setEmail("");
      setPhone("");
      setDob("");
      setEmailError("");
      setPhoneError("");
      setDobError("");
      setUser("");
    }
  };

  const handleClickOutside = (e) => {
    if (dialogRef.current && e.target === dialogRef.current) {
      dialogRef.current.close();
    }
  };

  return (
    <div className="modal" ref={dialogRef} onClick={handleClickOutside}>
      <div className="modal-content">
        <form className="user-form" onSubmit={handleSubmit}>
          <h1>Fill Details</h1>

          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              required
              onChange={(e) => {
                setEmail(e.target.value);
                validateEmail(e.target.value);
              }}
            />
            {emailError && <small className="error-message">{emailError}</small>}
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone Number:</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={phone}
              required
              onChange={(e) => {
                setPhone(e.target.value);
                validatePhone(e.target.value);
              }}
            />
            {phoneError && <small className="error-message">{phoneError}</small>}
          </div>

          <div className="form-group">
            <label htmlFor="dob">Date of Birth:</label>
            <input
              type="date"
              id="dob"
              name="dob"
              value={dob}
              required
              onChange={(e) => {
                setDob(e.target.value);
                validateDOB(e.target.value);
              }}
            />
            {dobError && <small className="error-message">{dobError}</small>}
          </div>

          <button className="submit-button" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
});

export default Form;
