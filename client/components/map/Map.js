import React, {PropTypes} from 'react';
//import mapboxgl from 'mapbox-gl';
import {Button} from 'semantic-ui-react';
import Source from './Source';
import Layer from './Layer';

mapboxgl.accessToken = 'pk.eyJ1IjoidG1tbCIsImEiOiJjamIzMHNtMGEyamJ4MzNvOXkzdzJoamlvIn0.hysxtv8dfXviRmge9Uwg2Q'

class Map extends React.Component {

  componentDidMount() {
    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v9',
      center: [-122.4194, 37.7749],
      zoom: 10
    });
  }

  getChildContext(){
    return {map: this.map};
  }

  render() {

    return (
      <div ref={el => {this.mapContainer = el}} className="absolute top right left bottom">
        { this.props.renderChildren && this.props.children }
      </div>
    )
  }
}

Map.childContextTypes = {
  map: PropTypes.object
};

export default Map;
