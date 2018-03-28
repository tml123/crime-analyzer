import React from 'react'
import axios from 'axios';
import { Sidebar, Segment, Button, Menu, Image, Icon, Header } from 'semantic-ui-react'
import QueryForm from '../searchForm/searchForm';

class SearchMenu extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      visible: this.props.visible,
      districts: [],
      resolutions: [],
      categories: []
    }
  }

  componentDidMount() {
    axios.get('/api/uniques').then((response) => {
      const districts = response.data.district.map(d => ({key: d, text: d, value: d}));
      const resolutions = response.data.resolution.map(d => ({key: d, text: d, value: d}));
      const categories = response.data.category.map(d => ({key: d, text: d, value: d}));
      this.setState({districts, resolutions, categories})
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({visible: nextProps.visible});
  }

  render() {
    const { visible } = this.state

    return (
      <QueryForm
        districts={this.state.districts}
        resolutions={this.state.resolutions}
        categories={this.state.categories}
        query={this.props.getData}
        onChange={this.props.updateQueryState}/>
    )
  }
}

export default SearchMenu;
