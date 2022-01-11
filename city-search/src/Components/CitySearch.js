import React, { Component } from "react";
import axios from "axios";
import './citysearch.css';
class CitySearch extends Component {
    state = {
      city: "",
      zips: []
    };

    handleOnChange = (event) => {
      this.setState({ city: event.target.value });
    };
  
    handleSearch = () => {
      this.connectApi(this.state.city);
    };
  
    connectApi = (input) => {
      input = input.toUpperCase()
        axios.get("http://ctp-zip-api.herokuapp.com/city/" + input).then((response) =>{
            const data = response.data;
            console.log(data);
            this.setState({
            zips: data,
            loading:false
          })
        }).catch(error => { alert("couldnt find")})
    }
  
    render() {
      return (
          <>
        <ul id="main">
          <h1>Please enter a valid city</h1>
          <input id = "text_input" type="text" placeholder="City" onChange={event => this.handleOnChange(event)}  value={this.state.city} />
          <button onClick={this.handleSearch}>Search</button>
          <h3>list of zip codes</h3>
          {this.state.zips ? (
            <ul id="zips-container"> {this.state.zips.map((city, index) => (
                <li className="single-city" key={index}>  {city} </li>)
                )}
            </ul>
          ) : (
            <p>null</p>
          )}
        </ul>
        </>
      );
    }
  }
  export default CitySearch;