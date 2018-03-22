import React, {PropTypes} from 'react';

class Layer extends React.Component {

  componentDidMount() {
    const {map} = this.context;

    this.mapBox = map;

    const {id, type, source, paint, layout, filter} = this.props;

    const layer = this.createLayerObject(id, type, source, paint, layout, filter);

    this.mapBox.addLayer(layer);
  }

  componentWillUnmount() {
    this.mapBox.removeLayer(this.props.id);
  }

  createLayerObject(id, type, source, paint, layout, filter) {
    const layerObject = {
      id,
      type,
      source,
      paint
    }
    if (layout) {
      layerObject['layout'] = layout;
    }
    if (filter) {
      layerObject['filter'] = filter;
    }
    return layerObject
  }

  render() {
    return null;
  }
}

Layer.contextTypes = {
  map: PropTypes.object
};

Layer.propTypes = {
  id: PropTypes.string.isRequired,
  source: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  paint: PropTypes.object,
  layout: PropTypes.object,
  filter: PropTypes.array
};

Layer.defaultProps = {
  paint: {},
  layout: {}
};

export default Layer;
