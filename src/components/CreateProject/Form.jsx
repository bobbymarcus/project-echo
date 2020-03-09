import React, {PureComponent} from "react";
import { createStyles, makeStyles, withStyles, Theme } from '@material-ui/core/styles';
import styled from "styled-components";
import {CategoryDropdown, SeasonDropdown, YearDropdown} from './Dropdown.jsx';


import "./Form.scss";


const FormWrapper = styled.div`
  position: absolute;
  width: 30%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -70%);
  color: rgba(0,0,0,.3);
  & .dropdown:nth-child(2) {
    width: 40%;
  }
  & .dropdown:nth-child(3) {
    width: 35%;
  }
  & .dropdown:nth-child(4) {
    width: calc(25% - 20px);
    margin: 0;
  }
`;
const TextField = styled.input`
  width: 100%;
  height: 61px;
  border: 1px solid rgba(0,0,0,0.15);
  border-radius: 5px;
  color: rgba(0,0,0,1);
  font-size: 14px;
  padding: 0 25px;
  transition: all .2s;
  margin-bottom: 20px;
  margin-top: 20px;
  &::placeholder {
    color: rgba(0,0,0,.3);
  }
  &:focus {
    outline-style: none;
    border-color: #000;
  }
`;


export default class Form extends PureComponent {
  render() {

    return (
    <FormWrapper>
      <TextField placeholder="Name Your Project*"/>
      <CategoryDropdown  />
      <SeasonDropdown  />
      <YearDropdown  />
      <TextField placeholder="Add Collaborators"/>
    </FormWrapper>


  );
}
}
