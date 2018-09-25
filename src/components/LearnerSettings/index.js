import 'rc-slider/assets/index.css';
import React from 'react';
import { Form, Button, Header, Divider, Input, Message, Checkbox, Dimmer, Loader } from 'semantic-ui-react';
import { connect } from 'react-redux';
import AvatarEditor from 'react-avatar-editor';
import Slider from 'rc-slider';
import Countries from '../../data/countriesList';
import { saveSettings, resetSaveProfileProps } from '../../util/profiles/saveSettings';

const dataURLtoBlob = (dataURI) => {
  const bytes = dataURI.split(',')[0].indexOf('base64') >= 0 ?
    atob(dataURI.split(',')[1]) :
    unescape(dataURI.split(',')[1]);
  const mime = dataURI.split(',')[0].split(':')[1].split(';')[0];
  const max = bytes.length;
  const ia = new Uint8Array(max);
  for (let i = 0; i < max; i += 1) {
    ia[i] = bytes.charCodeAt(i);
  }
  return new Blob([ia], { type: mime });
};

class LearnerSettings extends React.Component {
  /* eslint-disable react/no-unused-state */
  state = {
    buffer: null,
    src: null,
    zoom: 1,
    maxSizeError: null,
  }

  componentDidMount() {
    this.props.resetSaveProfileProps();
  }

  getCountry(obj) {
    const needle = this.props.profiles.learner_country;
    for (let i = 0; i < obj.length; i += 1) {
      if (obj[i].text === needle) {
        return obj[i].value;
      }
    }
    return null;
  }

  setEditorRef = (editor) => {
    this.editor = editor;
  }

  handleZoom = (value) => {
    this.setState({ zoom: value / 33 });
  }

  handleImageChange = () => {
    try {
      this.editor.getImage();
      const canvasScaled = this.editor.getImageScaledToCanvas();
      const dataURL = canvasScaled.toDataURL('image/png');
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(dataURLtoBlob(dataURL));
      fileReader.onloadend = () => this.convertToBuffer(fileReader);
    } catch (e) {
      return null;
    }
    return null;
  }

  saveSettings(event, component) {
    event.preventDefault();
    const profileData = {
      first_name: event.target.elements.first_name.value,
      last_name: event.target.elements.last_name.value,
      learner_position: event.target.elements.learner_position.value,
      learner_specialisation: event.target.elements.learner_specialisation.value,
      learner_about: event.target.elements.learner_about.value,
      public_profile: event.target.elements.public_profile.checked,
      learner_email: event.target.elements.learner_email.value,
      phone_number: event.target.elements.phone_number.value,
      learner_site: event.target.elements.learner_site.value,
      learner_country: event.target.elements[9].parentElement.children[1].textContent === 'Select Country' ? null : event.target.elements[9].parentElement.children[1].textContent,
    };
    component.props.saveSettings(profileData, 'learner', component.state.buffer);
  }

  captureFile =(event) => {
    event.stopPropagation();
    event.preventDefault();
    this.setState({ maxSizeError: null });
    const file = event.target.files[0];
    if (!file.type.match(/image.*/)) {
      /* eslint-disable no-param-reassign */
      event.target.value = null;
      this.setState({ buffer: null });
      this.setState({ maxSizeError: 'This file is not an image.' });
      return;
    }
    if (file.size > 5242880) {
      /* eslint-disable no-param-reassign */
      event.target.value = null;
      this.setState({ buffer: null });
      this.setState({ maxSizeError: 'This file is too big. Max size is 5 MB' });
      return;
    }
    if (event.target.files && event.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener(
        'load',
        () =>
          this.setState({
            src: reader.result,
          }),
        false,
      );
      reader.readAsDataURL(file);
    }
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
      <div>
        <Dimmer active={this.props.isFetching} inverted>
          <Loader size="medium">
            <svg width="96" height="96" style={{ display: 'block', margin: '0 auto 10px auto' }}>
              <image href={loader} x="0" y="0" width="100%" height="100%" />
            </svg>
            Saving information...
          </Loader>
        </Dimmer>
        {!this.props.learnerIsCreated ? (
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
        <Message error hidden={!this.state.maxSizeError}>
          <p>{this.state.maxSizeError}</p>
        </Message>
        <Header>
          Personal Information
        </Header>
        <Divider clearing />
        <Form onSubmit={(event) => { this.saveSettings(event, this); }}>
          <Form.Group widths="equal">
            <Form.Field
              required
              name="first_name"
              label="First name"
              key={`first_name:${this.props.profiles.first_name || ''}`}
              defaultValue={this.props.profiles.first_name ? this.props.profiles.first_name : ''}
              control="input"
              placeholder="First name"
            />
            <Form.Field
              required
              name="last_name"
              label="Last name"
              key={`last_name:${this.props.profiles.last_name || ''}`}
              defaultValue={this.props.profiles.last_name ? this.props.profiles.last_name : ''}
              control="input"
              placeholder="Last name"
            />
          </Form.Group>
          <Form.Field
            name="learner_position"
            label="Current position"
            key={`learner_position:${this.props.profiles.learner_position || ''}`}
            defaultValue={this.props.profiles.learner_position ? this.props.profiles.learner_position : ''}
            control="input"
            placeholder="Your current position"
          />
          <Form.Field
            name="learner_specialisation"
            label="Your specialisation"
            key={`learner_specialisation:${this.props.profiles.learner_specialisation || ''}`}
            defaultValue={this.props.profiles.learner_specialisation ? this.props.profiles.learner_specialisation : ''}
            control="input"
            placeholder="Your specialisation"
          />
          <Form.TextArea
            name="learner_about"
            label="About"
            key={`learner_about:${this.props.profiles.learner_about || ''}`}
            defaultValue={this.props.profiles.learner_about ? this.props.profiles.learner_about : ''}
            placeholder="Tell us more about you..."
          />
          <Divider clearing />
          <Checkbox
            name="public_profile"
            label="Make my profile public"
            toggle
            key={`public_profile:${this.props.profiles.public_profile || ''}`}
            defaultChecked={!!this.props.profiles.public_profile}
          />
          <p>
            By clicking this checkbox you agree with the <a style={{ color: 'orange' }} href="https://os.university/static/Terms-And-Conditions.pdf" rel="noopener noreferrer" target="_blank">Terms&Conditions</a>
          </p>
          <Divider clearing />
          <Divider hidden />
          <Header>
            Contact Information
          </Header>
          <Divider clearing />
          <Form.Field
            required
            name="learner_email"
            label="Email"
            key={`learner_email:${this.props.profiles.learner_email || ''}`}
            defaultValue={this.props.profiles.learner_email ? this.props.profiles.learner_email : ''}
            control="input"
            type="email"
            placeholder="Your email"
          />
          <Form.Field
            name="phone_number"
            label="Phone number"
            key={`phone_number:${this.props.profiles.phone_number || ''}`}
            defaultValue={this.props.profiles.phone_number ? this.props.profiles.phone_number : ''}
            autoComplete="tel"
            control="input"
            type="tel"
            placeholder="Phone number"
          />
          <Form.Field
            name="learner_site"
            label="My site"
            key={`learner_site:${this.props.profiles.learner_site || ''}`}
            defaultValue={this.props.profiles.learner_site ? this.props.profiles.learner_site : ''}
            control="input"
            placeholder="Link to your site"
          />
          <Form.Dropdown
            id="Country"
            name="learner_country"
            key={`learner_country:${this.props.profiles.learner_country || ''}`}
            placeholder="Select Country"
            label="Country"
            defaultValue={this.getCountry(Countries.Countries)}
            fluid
            search
            selection
            options={Countries.Countries}
          />
          <Form.Field label="Upload your avatar" control="file">
            <Input
              id="file"
              type="file"
              name="learner_avatar"
              placeholder="My avatar"
              className="input-file"
              color="orange"
              accept=".png,.gif,.jpg,.jpeg"
              onChange={this.captureFile}
            />
          </Form.Field>
          <div style={{ display: this.state.src ? null : 'none', textAlign: 'center' }}>
            <AvatarEditor
              ref={this.setEditorRef}
              onImageChange={this.handleImageChange}
              image={this.state.src}
              width={500}
              height={500}
              border={50}
              color={[255, 255, 255, 0.6]} // RGBA
              scale={this.state.zoom}
              borderRadius={500}
            />
            <Slider min={33} max={99} defaultValue={33} onChange={this.handleZoom} />
          </div>
          <Divider hidden />
          <Button primary type="submit">Save Profile Settings</Button>
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
    learnerIsCreated: state.profiles.learnerIsCreated,
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

export default connect(mapStateToProps, mapDispatchToProps)(LearnerSettings);
