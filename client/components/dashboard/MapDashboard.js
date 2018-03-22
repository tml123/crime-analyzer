import React from 'react';
import { Grid } from 'semantic-ui-react';
import axios from 'axios';
import MapContainer from '../mapContainer/MapContainer';
import SearchMenu from '../searchMenu/SearchMenu';

import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

class MapDashboard extends React.Component{

  constructor(props) {
    super(props);
    this.getData = this.getData.bind(this);
    this.state = {mapData: null, query: {}, dateCounts: [] , timeCounts: []};
    this.updateQueryState = this.updateQueryState.bind(this);
    this.getData = this.getData.bind(this);
    this.groupByDate = this.groupByDate.bind(this);
    this.groupBy = this.groupBy.bind(this);
  }

  getData(event) {
    event.preventDefault();
    axios.get('/api/incidents',
      {params: this.state.query}
    )
      .then(response => {
        let byDate = this.groupByDate(response.data);

        let byTime = this.groupBy(response.data, 'time');

        let dateCounts = Object.keys(byDate).map((key) =>
          {
            return {date: key, count: byDate[key].length};
          }).sort((a, b) => {
            let aDate = new Date(a);
            let bDate = new Date(b);
            return aDate - bDate
          });

          let timeCounts = Object.keys(byTime).map((key) => {
            return {time: key, count: byTime[key].length};
          }).sort((a, b) => {
            let aDate = new Date('1970-01-01 ' + a.time);
            let bDate = new Date('1970-01-01 ' + b.time);
            return aDate - bDate;
          });

        this.setState({mapData: response.data, dateCounts: dateCounts, timeCounts: timeCounts});
      }, error => {
        console.log(error);
      });
  }

  groupByDate(data) {
    let result = data.reduce((r, a) => {
      let date = new Date(a.properties.date.split('T')[0]).toISOString();
      r[date] = r[date] || [];
      r[date].push(a);
      return r;
    }, Object.create(null));
    return result;
  }

  groupBy(data, key) {
    let result = data.reduce((r, a) => {
      r[a.properties[key]] = r[a.properties[key]] || [];
      r[a.properties[key]].push(a);
      return r;
    }, Object.create(null));
    return result;
  }

  updateQueryState(event, {name, value}) {
    let query = Object.assign({}, this.state.query);
    query[name] = value;
    return this.setState({query: query});
  }

  render() {
    return (
  <div className="ht-100pct">
    <SearchMenu toggleSidebar={this.toggleSidebar}
                        getData={this.getData}
                        updateQueryState={this.updateQueryState}/>
    <Grid className="mgn-0 pd-0" columns={16}>
      <Grid.Column width={6} stretched={true} className="mgn-0 pd-0">
        {this.state.dateCounts.length > 0 &&
          <ResponsiveContainer width='100%' height={300}>
            <LineChart width={600} height={300} data={this.state.dateCounts}>
              <XAxis dataKey="date"/>
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="count" activeDote={{r: 1}} />
            </LineChart>
          </ResponsiveContainer>
        }
        {this.state.timeCounts.length > 0 &&
          <ResponsiveContainer width='100%' height={300}>
            <LineChart width={600} height={300} data={this.state.timeCounts}>
              <XAxis dataKey="time"/>
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="count" activeDote={{r: 1}} />
            </LineChart>
          </ResponsiveContainer>
        }
      </Grid.Column>
      <Grid.Column width={10} stretched={true}>
        <MapContainer mapData={this.state.mapData} className="full-height"/>
      </Grid.Column>
    </Grid>
  </div>);
  }
}

export default MapDashboard;
