import React, {PropTypes} from 'react';
//import mapboxgl from 'mapbox-gl';
import {Button} from 'semantic-ui-react';

import Source from '../map/Source';
import Layer from '../map/Layer';
import Map from '../map/Map';

mapboxgl.accessToken = 'pk.eyJ1IjoidG1tbCIsImEiOiJjamIzMHNtMGEyamJ4MzNvOXkzdzJoamlvIn0.hysxtv8dfXviRmge9Uwg2Q'

class MapContainer extends React.Component {

  render() {
    let renderMapData = false;
    if (this.props.mapData) {
      renderMapData = true;
    }

    const sourcePaint = {
      "circle-color": {
          property: "point_count",
          type: "interval",
          stops: [
              [0, "#ffff00"],
              [500, "#ffd800"],
              [1000, "#ffaf00"],
              [1500, "#f98600"],
              [2000, "#e95f00"],
              [3000, "#e95f00"],
              [4000, "#d23a00"],
              [8000, "#b31602"],
              [10000, "#8b0000"]
          ]
      },
      "circle-radius": {
          property: "point_count",
          type: "interval",
          stops: [
              [0, 10],
              [500, 15],
              [1000, 20],
              [1500, 25],
              [2000, 30],
              [3000, 35],
              [4000, 40],
              [8000, 45],
              [10000, 50]
          ]
        }
      }
      const unclusterPaint = {
        "circle-color": "#11b4da",
        "circle-radius": 4,
        "circle-stroke-width": 1,
        "circle-stroke-color": "#fff"
      }
    return (
      <div>
        <Map renderChildren={renderMapData}>
          { this.props.mapData &&
          <Source id="incidents"
                  data={{type: 'FeatureCollection', features: this.props.mapData}}
                  cluster={true}
                  clusterMaxZoom={14}
                  clusterRadius={50}>
            <Layer id="Incidents" type="circle" source="incidents" paint={sourcePaint}/>
            <Layer id="cluster-count"
                   type="symbol"
                   source="incidents"
                   filter={["has", "point_count"]}
                   layout={{"text-field": "{point_count_abbreviated}", "text-size": 12}}/>
            <Layer id="unclustered-point"
                   type="circle"
                   source="incidents"
                   filter={["!has", "point_count"]}
                   paint={unclusterPaint}/>
          </Source>
          }
        </Map>
      </div>
    )
  }
}

export default MapContainer;
