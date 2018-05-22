"use strict";
import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchStaff, fetchClients } from "../../actions/fetchingActions";
import Navbar from "../navbar";
import Directory from '../directory/directory'
import moment from 'moment-timezone';

import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Search from '@material-ui/icons/Search';


class MainStaff extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      filter:''
    }
  }

  componentWillMount(){
    this.props.fetchClients();
    this.props.fetchStaff();
  }

  handleInputChange = (event) => {
    this.setState({filter:event.target.value})
  }

  filter(){
    var checker = this.state.filter;
    return this.props.staff.filter(
      function(a){
        if (a['name'].toUpperCase().includes(checker.toUpperCase())){
          return a;
        }
      })
  }

  render() {
    return (
      <div className='directoryRoot'>
          <Navbar />
          <div className="topBar">  
            <img src="/images/rsz_peachy_logo.png" className="logo" />
            <h1 className="headers topBarHeader"> Hello, Tracy </h1> 
          </div>
          <div className="dashboardHeaderContainer directoryTitle"> 
          <h1 className='dashboardHeader headers'> Staff information</h1> 
          <h1 className="dashboardDate subheader"> {moment().format('dddd, MMM D')}</h1>
          <TextField
            className='directorySearchBar'
            id="input-with-icon-textfield"
            onChange = {this.handleInputChange.bind(this)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
          />
        </div>
          <Directory directoryType="Staff" content={this.filter()}/>
      </div>);
  }
}

function mapStateToProps(state) {
  return {staff:state.clientReducers.staff, clients:state.clientReducers.clients};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchStaff: fetchStaff, fetchClients: fetchClients }, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(MainStaff);


