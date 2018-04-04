import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as incidentActions from '../../actions/incidentActions';
import { Grid } from 'semantic-ui-react';
import MapContainer from '../mapContainer/MapContainer';
import SearchMenu from '../searchMenu/SearchMenu';

import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

class MapDashboard extends React.Component{

  constructor(props) {
    super(props);
    this.getData = this.getData.bind(this);
    this.state = {query: {}, dateCounts: [] , timeCounts: []};
    this.updateQueryState = this.updateQueryState.bind(this);
    this.getData = this.getData.bind(this);
  }

  getData(event) {
    event.preventDefault();
    this.props.actions.loadIncidents(this.state.query)
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
        {this.props.dateCounts &&
          <ResponsiveContainer width='100%' height={300}>
            <LineChart width={600} height={300} data={this.props.dateCounts}>
              <XAxis dataKey="date"/>
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="count" activeDote={{r: 1}} />
            </LineChart>
          </ResponsiveContainer>
        }
        {this.props.timeCounts &&
          <ResponsiveContainer width='100%' height={300}>
            <LineChart width={600} height={300} data={this.props.timeCounts}>
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
        <MapContainer mapData={this.props.incidents} className="full-height"/>
      </Grid.Column>
    </Grid>
  </div>);
  }
}

function groupByDate(data) {
  let result = data.reduce((r, a) => {
    let date = new Date(a.properties.date.split('T')[0]).toISOString();
    r[date] = r[date] || [];
    r[date].push(a);
    return r;
  }, Object.create(null));
  return result;
}

function groupBy(data, key) {
  let result = data.reduce((r, a) => {
    r[a.properties[key]] = r[a.properties[key]] || [];
    r[a.properties[key]].push(a);
    return r;
  }, Object.create(null));
  return result;
}

function mapStateToProps(state, ownProps) {
  let incidents = state.incidents.data;
  let props = {
    incidents: incidents
  }

  if (incidents) {
    let byDate = groupByDate(incidents);

    let byTime = groupBy(incidents, 'time');

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

    if (timeCounts) {
      props.timeCounts = timeCounts;
    }

    if (dateCounts) {
      props.dateCounts = dateCounts
    }
  }
  console.log(props);
  return props;
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(incidentActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MapDashboard);
