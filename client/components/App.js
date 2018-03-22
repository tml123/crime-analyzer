import React, {PropTypes} from 'react';
import MapDashboard from './dashboard/MapDashboard';


const style = {
  div: {
    minHeight: '100vh'
  },
};

class App extends React.Component {

  render () {
    return (
      <div style={style.div}>
        <MapDashboard />
      </div>
    );
  }
}

export default App;
