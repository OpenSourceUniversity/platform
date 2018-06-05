import React from 'react';
import { Form } from 'semantic-ui-react';
import { connect } from 'react-redux';
import autocomplete from '../../util/search/autocomplete';


class HeaderSearchComponent extends Form {
  render() {
    return (
      <Form>
        <Form.Input
          list="suggestions"
          placeholder="Search"
          className="search-bar"
          icon="search"
          onChange={(event) => { this.props.autocomplete(event.currentTarget.value); }}
        />
        <datalist id="suggestions">
          {this.renderAutocomplete()}
        </datalist>
      </Form>
    );
  }

  renderAutocomplete() {
    const options = this.props.suggestions.map(suggestion => suggestion.title);
    return options.map((wallet, index) => (
      <option value={wallet} key={index} />
    ));
  }
}


function mapStateToProps(state) {
  return {
    suggestions: state.search.suggestions,
  };
}


function mapDispatchToProps(dispatch) {
  return {
    autocomplete(query) {
      dispatch(autocomplete(query));
    },
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(HeaderSearchComponent);
