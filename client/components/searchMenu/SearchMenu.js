import React from 'react'
import { Sidebar, Segment, Button, Menu, Image, Icon, Header } from 'semantic-ui-react'
import QueryForm from '../searchForm/searchForm';

class SearchMenu extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      visible: this.props.visible
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({visible: nextProps.visible});
  }

  render() {
    const { visible } = this.state
    const districts = [
      {
        key: 'Bayview',
        text: 'Bayview',
        value: 'BAYVIEW'
      },
      {
        key: 'Other',
        text: 'Other',
        value: 'OTHER'
      }
    ];
    const resolutions = [
      {
        key: 'Arrest, Booked',
        text: 'Arrest, Booked',
        value: 'ARREST, BOOKED'
      }
    ];
    const categories = [
      {
        key: 'Assault',
        text: 'Assault',
        value: 'ASSAULT'
      }
    ];
    return (
      <Menu secondary className="mgn-0 pd-0">
        <QueryForm
          districts={districts}
          resolutions={resolutions}
          categories={categories}
          query={this.props.getData}
          onChange={this.props.updateQueryState}/>
      </Menu>
    )
  }
}

export default SearchMenu;
