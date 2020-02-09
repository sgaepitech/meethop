import React, { Component } from 'react';
import { Map as LeafletMap, Marker, Popup, TileLayer } from 'react-leaflet';

export default class MyMap extends React.Component {
    constructor() {
        super()
        this.state = {
            lat: 6859880.93,
            lng: 651704.82,
            zoom: 13
        }
    }

    render() {
        const position = [this.props.lat, this.props.long];
        console.log(this.props);
        return (
            <LeafletMap center={position} zoom={this.state.zoom}>
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url='https://{s}.tile.osm.org/{z}/{x}/{y}.png'
                />
                <Marker position={position}>
                    <Popup>
                        Take take take take take it away
          </Popup>
                </Marker>
            </LeafletMap>
        );
    }
}