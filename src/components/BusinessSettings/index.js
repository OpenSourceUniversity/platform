import React from 'react';
import { connect } from 'react-redux';
import { Input, Form, Button, Header, Divider, Message, Dimmer, Loader } from 'semantic-ui-react';
import Countries from '../../data/countriesList';
import { saveSettings, resetSaveProfileProps } from '../../util/profiles/saveSettings';

class BusinessSettings extends React.Component {
  /* eslint-disable react/no-unused-state */
  state = { buffer: null }

  componentDidMount() {
    this.props.resetSaveProfileProps();
  }

  getCountry(obj) {
    const needle = this.props.profiles.company_country;
    for (let i = 0; i < obj.length; i += 1) {
      if (obj[i].text === needle) {
        return obj[i].value;
      }
    }
    return null;
  }

  saveSettings(event, component) {
    event.preventDefault();
    const profileData = {
      company_name: event.target.elements.company_name.value,
      company_website: event.target.elements.company_website.value,
      company_email: event.target.elements.company_email.value,
      company_country: event.target.elements[3].parentElement.children[1].textContent === 'Select Country' ? null : event.target.elements[3].parentElement.children[1].textContent,
      company_about: event.target.elements.company_about.value,
    };
    component.props.saveSettings(profileData, 'business', component.state.buffer);
  }

  captureFile =(event) => {
    event.stopPropagation();
    event.preventDefault();
    const file = event.target.files[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = () => this.convertToBuffer(reader);
  }

  convertToBuffer = (reader) => {
    // file is converted to a buffer to prepare for uploading to IPFS
    const buffer = Buffer.from(reader.result);
    /* eslint-disable react/no-unused-state */
    this.setState({ buffer });
    /* eslint-enable react/no-unused-state */
  };

  handleDismiss = () => {
    this.props.resetSaveProfileProps();
  }

  render() {
    /* eslint-disable global-require */
    const loader = require('../../icons/osu-loader.svg');
    /* eslint-enable global-require */
    return (
      <div className="business-settings">
        <Dimmer active={this.props.isFetching} inverted>
          <Loader size="medium">
            <svg width="96" height="96" style={{ display: 'block', margin: '0 auto 10px auto' }}>
              <image href={loader} x="0" y="0" width="100%" height="100%" />
            </svg>
            Saving information...
          </Loader>
        </Dimmer>
        {!this.props.businessIsCreated ? (
          <Message
            warning
            header="Profile is not created yet!"
            content="You can't explore the platform with this active account, please, submit this form with yor information, or chose another setuped account."
          />
        ) : null}
        {this.props.isSaved ? (
          <Message
            positive
            header="Successfully saved!"
            onDismiss={this.handleDismiss}
          />
        ) : null}
        {this.props.error ? (
          <Message
            negative
            header="Oops, something went wrong!"
            content={this.props.error}
            onDismiss={this.handleDismiss}
          />
        ) : null}
        <Header>
          Business Information
        </Header>
        <span>
          Fill in the following details to register your business
        </span>
        <Divider clearing />
        <Form onSubmit={(event) => { this.saveSettings(event, this); }}>
          <Form.Field
            required
            label="Company name"
            control="input"
            name="company_name"
            placeholder="Your company name"
            key={`company_name:${this.props.profiles.company_name || ''}`}
            defaultValue={this.props.profiles.company_name ? this.props.profiles.company_name : ''}
          />
          <Form.Field
            required
            label="Official website"
            control="input"
            placeholder="Your website"
            name="company_website"
            key={`company_website:${this.props.profiles.company_website || ''}`}
            defaultValue={this.props.profiles.company_website ? this.props.profiles.company_website : ''}
          />
          <Form.Field
            required
            name="company_email"
            label="Email"
            key={`company_email:${this.props.profiles.company_email || ''}`}
            defaultValue={this.props.profiles.company_email ? this.props.profiles.company_email : ''}
            control="input"
            type="email"
            placeholder="Your email"
          />
          <Form.Dropdown
            id="Country"
            name="company_country"
            key={`company_country:${this.props.profiles.company_country || ''}`}
            placeholder="Select Country"
            label="Country"
            defaultValue={this.getCountry(Countries.Countries)}
            fluid
            search
            selection
            options={Countries.Countries}
          />
          <Form.TextArea
            name="company_about"
            label="About"
            key={`company_about:${this.props.profiles.company_about || ''}`}
            defaultValue={this.props.profiles.company_about ? this.props.profiles.company_about : ''}
            placeholder="Tell us more about your company..."
          />
          <Form.Field label="Upload logo" control="file">
            <Input
              id="file"
              type="file"
              name="company_logo"
              placeholder="Company logo"
              className="input-file"
              color="orange"
              accept=".png,.gif,.jpg,.jpeg"
              onChange={this.captureFile}
            />
          </Form.Field>
          <Divider clearing />
          <Button className="save-button" type="submit" primary>Save Business Settings</Button>
        </Form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    profiles: state.profiles.profiles,
    isSaved: state.profiles.isSaved,
    isFetching: state.profiles.isFetching,
    error: state.profiles.error,
    businessIsCreated: state.profiles.businessIsCreated,
  };
}


function mapDispatchToProps(dispatch) {
  return {
    saveSettings(profileData, account, buffer) {
      dispatch(saveSettings(profileData, account, buffer));
    },
    resetSaveProfileProps() {
      dispatch(resetSaveProfileProps());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(BusinessSettings);
