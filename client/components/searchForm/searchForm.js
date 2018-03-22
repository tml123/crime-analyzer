import React from 'react';
import {Form, Button} from 'semantic-ui-react';

const QueryForm = ({districts, categories, resolutions, query, querying, onChange}) => {
  return (
    <Form>
      <Form.Group widths='equal'>
        <Form.Select
          name="properties.district"
          options={districts}
          onChange={onChange}
          placeholder="District" />
        <Form.Select
          name="properties.category"
          options={categories}
          onChange={onChange}
          placeholder="Category" />
        <Form.Select
          name="properties.resolution"
          options={resolutions}
          onChange={onChange}
          placeholder="Resolution" />
          <Button type="submit"
                 disabled={querying}
                 content={querying ? 'Fetching...': 'Submit'}
                 onClick={query} />
      </Form.Group>
    </Form>
  );
};

export default QueryForm;
