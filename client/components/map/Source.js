import React, {PropTypes} from 'react';

class Source extends React.Component {

  state = {
    source: undefined
  }

  getChildContext () {
    return {map: this.context.map};
  }

  componentDidMount() {

    const {map} = this.context;

    this.mapBox = map;
    const source = {
        type: 'geojson',
        data: this.props.data
    }

    if (this.props.cluster) {
      source['cluster'] = true;
      source['clusterMaxZoom'] = this.props.clusterMaxZoom;
      source['clusterRadius'] = this.props.clusterRadius;
    }

    this.mapBox.addSource(this.props.id, source);
    this.setState({source: this.props.data, hasData: true});
  }

  componentWillReceiveProps = (nextProps) => {
    if (this.state.hasData && (nextProps.data.features.length !== this.props.data.features.length)) {
      console.log('updating');
      this.mapBox.getSource(this.props.id).setData(nextProps.data);
    }
  }

  componentWillUnmount() {
    this.mapBox.removeSource(this.props.id);
  }

  render() {
    if (this.state.source) {
      if (this.props.children) {
        return <div>{this.props.children}</div>;
      }
      return this.props.children || null;
    }
    return null;
  }
}


Source.contextTypes = {
  map: PropTypes.object
};

Source.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string,
  data: PropTypes.object.isRequired,
  cluster: PropTypes.bool,
  clusterMaxZoom: PropTypes.number,
  clusterRadius: PropTypes.number
}

Source.childContextTypes = {
  map: PropTypes.object
};

export default Source;
