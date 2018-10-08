import React from 'react';
import Dropzone from 'react-dropzone';
import { Form, Button, Header, Divider, Input, Message, Checkbox, Dimmer, Loader, Container, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import AvatarEditor from 'react-avatar-editor';
import Slider from 'rc-slider';
import Countries from '../../data/countriesList';
import { saveSettings, resetSaveProfileProps } from '../../util/profiles/saveSettings';

const dataURLtoBlob = (dataURL) => {
  const bytes = dataURL.split(',')[0].indexOf('base64') >= 0 ?
    atob(dataURL.split(',')[1]) :
    unescape(dataURL.split(',')[1]);
  const mime = dataURL.split(',')[0].split(':')[1].split(';')[0];
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
    if (!this.state.src) {
      return null;
    }
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
    let learnerSite = event.target.elements.learner_site.value;
    if (!!learnerSite && learnerSite.indexOf('http') !== 0) {
      learnerSite = `http://${learnerSite}`;
    }
    const profileData = {
      full_name: event.target.elements.full_name.value,
      learner_position: event.target.elements.learner_position.value,
      learner_specialisation: event.target.elements.learner_specialisation.value,
      learner_about: event.target.elements.learner_about.value,
      public_profile: event.target.elements.public_profile.checked,
      learner_email: event.target.elements.learner_email.value,
      phone_number: event.target.elements.phone_number.value,
      learner_site: learnerSite,
      learner_country: event.target.elements[8].parentElement.children[1].textContent === 'Select Country' ? null : event.target.elements[8].parentElement.children[1].textContent,
    };
    component.props.saveSettings(profileData, 'learner', component.state.buffer);
  }

  captureFile = (file) => {
    if (file) {
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
  /* eslint-disable jsx-a11y/label-has-for */
  render() {
    /* eslint-disable global-require */
    const loader = require('../../icons/osu-loader.svg');
    /* eslint-enable global-require */
    return (
      <div>
        <Dimmer className="belowNavBar" active={this.props.isFetching} inverted>
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
        <Header>
          Personal Information
        </Header>
        <Divider clearing />
        <Form onSubmit={(event) => { this.saveSettings(event, this); }}>
          <Form.Group widths="equal">
            <Form.Field
              required
              name="full_name"
              maxLength={70}
              label="Full name"
              key={`full_name:${this.props.profiles.full_name || ''}`}
              defaultValue={this.props.profiles.full_name ? this.props.profiles.full_name : ''}
              control="input"
              placeholder="Full name"
            />
          </Form.Group>
          <Form.Field
            name="learner_position"
            maxLength={130}
            label="Current position"
            key={`learner_position:${this.props.profiles.learner_position || ''}`}
            defaultValue={this.props.profiles.learner_position ? this.props.profiles.learner_position : ''}
            control="input"
            placeholder="Your current position"
          />
          <Form.Field
            name="learner_specialisation"
            maxLength={130}
            label="Your specialisation"
            key={`learner_specialisation:${this.props.profiles.learner_specialisation || ''}`}
            defaultValue={this.props.profiles.learner_specialisation ? this.props.profiles.learner_specialisation : ''}
            control="input"
            placeholder="Your specialisation"
          />
          <Form.TextArea
            name="learner_about"
            label="About"
            maxLength={2048}
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
            maxLength={130}
            label="Email"
            key={`learner_email:${this.props.profiles.learner_email || ''}`}
            defaultValue={this.props.profiles.learner_email ? this.props.profiles.learner_email : ''}
            control="input"
            type="email"
            placeholder="Your email"
          />
          <Form.Field
            name="phone_number"
            maxLength={70}
            label="Phone number"
            key={`phone_number:${this.props.profiles.phone_number || ''}`}
            defaultValue={this.props.profiles.phone_number ? this.props.profiles.phone_number : ''}
            autoComplete="tel"
            control="input"
            type="tel"
            placeholder="Phone number"
          />
          <Form.Field>
            <label htmlFor="learner_site">
              My website
            </label>
            <Input
              id="learner_site"
              name="learner_site"
              maxLength={70}
              label="http://"
              labelPosition="left"
              placeholder="example.com"
              key={`learner_site:${this.props.profiles.learner_site || ''}`}
              defaultValue={
                (() => {
                  if (this.props.profiles.learner_site) {
                    const url = this.props.profiles.learner_site;
                    if (url.indexOf('http://') === 0) {
                      return url.slice(7);
                    }
                    if (url.indexOf('https://') === 0) {
                      return url.slice(8);
                    }
                    return url;
                  }
                  return '';
                })()
              }
            />
          </Form.Field>
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
            <Dropzone
              id="file"
              style={{ align: 'center', height: '100px', marginBottom: '1em' }}
              accept="image/*"
              name="learner_avatar"
              onDrop={
                (accepted, rejected) => {
                  if (accepted.length > 0 && rejected.length === 0) {
                    const file = accepted[0];
                    this.setState({ fileString: accepted[0].name });
                    if (file.size > 5242880) {
                      /* eslint-disable react/no-unused-state */
                      this.setState({ buffer: null });
                      /* eslint-enable react/no-unused-state */
                      this.setState({ fileString: 'This file is too big. Max size is 5 MB' });
                      this.setState({ src: null });
                    } else {
                      this.captureFile(file);
                      this.setState({ fileString: file.name });
                    }
                  }
                  if (rejected.length > 0 && accepted.length === 0) {
                    this.setState({ src: null });
                    /* eslint-disable react/no-unused-state */
                    this.setState({ buffer: null });
                    /* eslint-enable react/no-unused-state */
                    this.setState({ fileString: 'Wrong file format. Accept only Images' });
                  }
                }
              }
            >
              <Container
                textAlign="center"
                style={{ border: '2px dashed grey', height: '100%', borderRadius: '5px' }}
              >
                <div style={{ padding: '37px 15px 15px 15px', textAlign: 'center' }}>
                  <Icon name="upload" />
                  {this.state.fileString ? this.state.fileString : 'Avatar image Dropzone'}
                </div>
              </Container>
            </Dropzone>
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
