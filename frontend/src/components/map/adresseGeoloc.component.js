import React, { Component } from 'react';
import AsyncSelect from 'react-select/async';
import axios from 'axios';

import MyMap from './map.component';

const promiseOptions = inputValue => {
    const url = `https://cors-anywhere.herokuapp.com/https://api-adresse.data.gouv.fr/search/${inputValue ? '?q=' + inputValue + '&limit=5' : ''}`;
    //console.log(url);
    let adresses = [];
    return axios.get(url)
        .then(res => {
            adresses = res.data.features.map((el => ({
                'label': el.properties.label,
                'value': el
            })));
            console.log(adresses);
            return adresses;
        })
        .catch(err => {
            console.log('some error: ', err);
        });
};

export default class WithPromises extends Component {

    constructor(props) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);

        this.state = {
            adress: '',
            coordinates: [],
            hasOne: false,
        }
    }

    handleChange(option) {
        console.log(option);
        this.setState({
            adress: option.value.properties.label,
            coordinates: option.value.geometry.coordinates,
        });
        console.log('toto ', option.value.properties.label);
    };

    onSubmit(e) {
        e.preventDefault();

        this.setState({
            hasOne: true,
        });

        console.log(`Adress: ${this.state.adress}`);
        console.log(`Longitude (x): ${this.state.coordinates[0]}`);
        console.log(`Latitude (y): ${this.state.coordinates[1]}`);
    }
    render() {
        if (this.state.hasOne)
            return (
                <div>
                    <form onSubmit={this.onSubmit}>
                        <AsyncSelect cacheOptions defaultOptions='false' loadOptions={promiseOptions} onChange={this.handleChange} />
                        <div className="form-group">
                            <input type="submit" value="Validate Adress" className="btn btn-primary" />
                        </div>
                    </form>
                    <MyMap long={this.state.coordinates[0]} lat={this.state.coordinates[1]} />
                </div>
            );
        else {
            return (
                <div>
                    <form onSubmit={this.onSubmit}>
                        <AsyncSelect cacheOptions defaultOptions='false' loadOptions={promiseOptions} onChange={this.handleChange} />
                        <div className="form-group">
                            <input type="submit" value="Validate Adress" className="btn btn-primary" />
                        </div>
                    </form>
                </div>
            );
        }
    }
}