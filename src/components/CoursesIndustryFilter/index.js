import React from 'react';
import { Form } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { addIndustryToFilter, removeIndustryFromFilter } from '../../util/search/filter';
import fetchIndustries from '../../util/search/fetchIndustries';


class CoursesIndustryFilter extends Form {
  componentDidMount() {
    this.props.fetchIndustries(this.props.filterType);
  }

  toggle(event) {
    const checkbox = event.currentTarget.getElementsByTagName('input')[0];
    const checked = !checkbox.checked;
    const { name } = checkbox;
    if (checked) {
      this.props.addIndustryToFilter(name);
    } else {
      this.props.removeIndustryFromFilter(name);
    }
  }

  render() {
    return (
      <Form>
        <Form.Group grouped>
          {this.renderIndustries()}
        </Form.Group>
      </Form>
    );
  }

  renderIndustries() {
    return this.props.industries.map(industry => (
      <Form.Checkbox
        label={industry.name}
        name={industry.id}
        key={industry.id}
        value={industry.name}
        onChange={(event) => { this.toggle(event); }}
      />));
  }
}

function mapStateToProps(state) {
  return {
    industries: state.search.industries,
    filteredIndustries: state.search.filteredIndustries,
  };
}


function mapDispatchToProps(dispatch) {
  return {
    fetchIndustries(filterType) {
      dispatch(fetchIndustries(filterType));
    },
    addIndustryToFilter(id) {
      dispatch(addIndustryToFilter(id));
    },
    removeIndustryFromFilter(id) {
      dispatch(removeIndustryFromFilter(id));
    },
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(CoursesIndustryFilter);
