import React from 'react';
import { Form } from 'semantic-ui-react';

export default {

  CoursesFilterList: {

    qualification: (
      <Form>
        <Form.Group grouped>
          <Form.Checkbox label="All" name="filter" value="All-qualification" />
          <Form.Checkbox label="Certificate &amp; diploma" name="filter" value="Certificate & diploma" />
          <Form.Checkbox label="Bachelor&apos;s degree" name="filter" value="Bachelor's degree" />
          <Form.Checkbox label="Honour&apos;s degree" name="filter" value="Honour's degree" />
          <Form.Checkbox label="Master&apos;s degree" name="filter" value="Master's degree" />
          <Form.Checkbox label="Postgraduate certificate" name="filter" value="Postgraduate certificate" />
          <Form.Checkbox label="Graduate certificate" name="filter" value="Graduate certificate" />
          <Form.Checkbox label="Professional certificate" name="filter" value="Professional certificate" />
        </Form.Group>
      </Form>
    ),

    studyType: (
      <Form>
        <Form.Group grouped>
          <Form.Checkbox label="All" name="filter" value="All-studyType" />
          <Form.Checkbox label="Campus" name="filter" value="Campus" />
          <Form.Checkbox label="Online" name="filter" value="Online" />
        </Form.Group>
      </Form>
    ),

    duration: (
      <Form>
        <Form.Group grouped>
          <Form.Checkbox label="All" name="filter" value="All-duration" />
          <Form.Checkbox label="Short" name="filter" value="Short" />
          <Form.Checkbox label="Medium" name="filter" value="Medium" />
          <Form.Checkbox label="Long" name="filter" value="Long" />
        </Form.Group>
      </Form>
    ),

    dates: (
      <Form>
        <Form.Group grouped>
          <Form.Checkbox label="One" name="filter" value="one" />
          <Form.Checkbox label="Two" name="filter" value="two" />
          <Form.Checkbox label="Three" name="filter" value="three" />
        </Form.Group>
      </Form>
    ),

    price: (
      <Form>
        <Form.Group grouped>
          <Form.Checkbox label="One" name="filter" value="one" />
          <Form.Checkbox label="Two" name="filter" value="two" />
          <Form.Checkbox label="Three" name="filter" value="three" />
        </Form.Group>
      </Form>
    ),
    level: (
      <Form>
        <Form.Group grouped>
          <Form.Checkbox label="All" name="filter" value="All-level" />
          <Form.Checkbox label="Beginner" name="filter" value="Beginner" />
          <Form.Checkbox label="Intermediate" name="filter" value="Intermediate" />
          <Form.Checkbox label="Advanced" name="filter" value="Advanced" />
        </Form.Group>
      </Form>
    ),
    language: (
      <Form>
        <Form.Group grouped>
          <Form.Checkbox label="English" name="filter" value="English" />
          <Form.Checkbox label="Spanish" name="filter" value="Spanish" />
          <Form.Checkbox label="Chinese" name="filter" value="Chinese" />
          <Form.Checkbox label="French" name="filter" value="French" />
          <Form.Checkbox label="German" name="filter" value="German" />
          <Form.Checkbox label="Italian" name="filter" value="Italian" />
          <Form.Checkbox label="Chinese" name="filter" value="Chinese" />
          <Form.Checkbox label="Arabic" name="filter" value="Arabic" />
        </Form.Group>
      </Form>
    ),
  },
};
