import React, { Component } from "react";
import axios from "axios";
import './zipsearch.css';

class ZipSearch extends Component {
    
    constructor() {
        super(); 
        this.state = this.initialState; //blank
        this.stateChange = this.stateChange.bind(this);
    }
    get initialState() {
        return {
            //variables that will be assigned from API
            zipCode: "",
            stateName: "",
            cityName: "",
            locationText: "",
            latitude: "",
            longitude: "",
            population: "",
            showInfo: false
        };
    }

    //reset all variables to initial state
    resetState() {
        this.setState(this.initialState);
    }


    stateChange(e) {
        this.setState({ zipCode: e.target.value });
    }

    componentDidUpdate() {
        if (this.state.zipCode.length !== 5) {
            //when zipcodes length is not 5, stop displaying info by setting conditional rendering variable to false
            if (this.state.showInfo === true)
                this.setState({showInfo: false});
        } 
        else {    
            axios.get("http://ctp-zip-api.herokuapp.com/zip/" + this.state.zipCode).then((response) => {
                const data = response.data;

                //hold all the new info from API
                const newZipSearchObj = {
                    stateName: data[0].State,
                    cityName: data[0].City,
                    locationText: data[0].LocationText,
                    latitude: data[0].Lat,
                    longitude: data[0].Long,
                    population: data[0].EstimatedPopulation,
                    showInfo: true
                };

                this.setState(newZipSearchObj);
            }).catch((err) => alert("Not a valid zip code"));
        }
    }

    render() {
        return (
            <>
                <center><h1>Please input a valid zip code </h1></center>
                <input
                    className="zipcode_input"
                    type="text"
                    name="zipcode"
                    value={this.state.zipCode}
                    placeholder="zip code"
                    onChange={this.stateChange.bind(this)}
                />

                <div className="locationInfo_container">
                { /*if axios has data then display informatio, else show "information not valid" prompt */}
                    {this.state.showInfo ?
                        <div className="locationInfo">
                            <h1>{this.state.locationText}</h1>

                            <ul>
                                <li>State: {this.state.stateName}</li>
                                {<li>Location: ({this.state.latitude}, {this.state.longitude})</li>}
                                {this.state.population ? <li>Population: {this.state.population}</li> : ""}
                            </ul>

                        </div>
                        // axios get condition was not met yet
                        : <p className="info">input not valid</p>
                    }
                </div>
            </>
        );
    }
}

export default ZipSearch;