import React from 'react';
import {Menu, Form, Button} from 'semantic-ui-react';

const QueryForm = ({districts, categories, resolutions, query, querying, onChange}) => {
  return (
    <Form as={Menu} secondary className="mgn-0 pd-0">
      <Form.Group widths='equal'>
        <Form.Select
          name="properties.district"
          multiple={true}
          options={districts}
          onChange={onChange}
          placeholder="District" />
        <Form.Select
          name="properties.category"
          multiple={true}
          options={categories}
          onChange={onChange}
          placeholder="Category" />
        <Form.Select
          name="properties.resolution"
          multiple={true}
          options={resolutions}
          onChange={onChange}
          placeholder="Resolution" />
      </Form.Group>
      <Menu.Menu position='right'>
        <Button type="submit"
               disabled={querying}
               content={querying ? 'Fetching...': 'Submit'}
               onClick={query} />
      </Menu.Menu>
    </Form>
  );
};

export default QueryForm;
