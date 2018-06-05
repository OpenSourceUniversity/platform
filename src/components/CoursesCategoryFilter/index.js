import React from 'react';
import { Form } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { addCategoryToFilter, removeCategoryFromFilter } from '../../util/search/filter';
import fetchCategories from '../../util/search/fetchCategories';


class CoursesCategoryFilter extends Form {
  componentDidMount() {
    this.props.fetchCategories();
  }

  toggle(event) {
    const checkbox = event.currentTarget.getElementsByTagName('input')[0];
    const checked = !checkbox.checked;
    const { name } = checkbox;
    if (checked) {
      this.props.addCategoryToFilter(name);
    } else {
      this.props.removeCategoryFromFilter(name);
    }
  }

  render() {
    console.log(this.props.filteredCategories);
    return (
      <Form>
        <Form.Group grouped>
          {this.renderCategories()}
        </Form.Group>
      </Form>
    );
  }

  renderCategories() {
    return this.props.categories.map(category => (
      <Form.Checkbox
        label={category.name}
        name={category.id}
        key={category.id}
        value={category.name}
        onChange={(event) => { this.toggle(event); }}
      />));
  }
}

function mapStateToProps(state) {
  return {
    categories: state.search.categories,
    filteredCategories: state.search.filteredCategories,
  };
}


function mapDispatchToProps(dispatch) {
  return {
    fetchCategories() {
      dispatch(fetchCategories());
    },
    addCategoryToFilter(id) {
      dispatch(addCategoryToFilter(id));
    },
    removeCategoryFromFilter(id) {
      dispatch(removeCategoryFromFilter(id));
    },
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(CoursesCategoryFilter);
