import React, { useState } from "react";

interface NameStepProps {
  cb: (field: string, value: string) => void;
}

const NameStep: React.FC<NameStepProps> = (props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  return (
    <>
      <div>
        First Name:{" "}
        <input
          type="firstName"
          onChange={({ target: { value } }) => {
            setFirstName(value);
          }}
          value={firstName}
          required
        ></input>
      </div>
      <div>
        Last Name:{" "}
        <input
          type="lastName"
          onChange={({ target: { value } }) => {
            setLastName(value);
          }}
          value={lastName}
          required
        ></input>
      </div>
      <button onClick={() => props.cb("name", firstName + " " + lastName)}>
        Next
      </button>
    </>
  );
};

export default NameStep;
