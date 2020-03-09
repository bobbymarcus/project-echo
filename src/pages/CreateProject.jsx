import React from "react";
import Form from '../components/CreateProject/Form';
import styled from "styled-components";
import { Link } from 'react-router-dom';


const SubmitButton = styled.button`
  font-family: 'DIN Alternate Bold', sans-serif;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: normal;
  width: 30%;
  background: #000000;
  height: 91px;
  text-align: center;
  font-size: 14px;
  color: white;
  cursor: pointer;
  position: absolute;
  bottom: 20%;
  left: 50%;
  transform: translateX(-50%);
`;
const PageTitle = styled.h1`
  font-size: 24px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 10%;
  font-weight: normal;

`;
const Logo = styled.img`
  position: absolute;
  left: 5%;
  top: 8%;
  cursor: pointer;
`;
const Close = styled.img`
  position: absolute;
  right: 5%;
  top: 9%;
  cursor: pointer;
`;

const CreateProject = () => {
  return (
    <React.Fragment>
    <Logo src="img/logo.svg" />
    <PageTitle>Create New Project</PageTitle>
    <Close src="img/close.svg" />
    <Link to="/editmode">
    <SubmitButton> Launch Project </SubmitButton>
    </Link>
      <Form />

    </React.Fragment>

  );
}

  export default CreateProject;
