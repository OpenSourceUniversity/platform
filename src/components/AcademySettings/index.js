import React from 'react';
import { connect } from 'react-redux';
import { Input, Form, Button, Header, Divider, Message, Dimmer, Loader } from 'semantic-ui-react';
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

class AcademySettings extends React.Component {
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
    const needle = this.props.profiles.academy_country;
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
      academy_name: event.target.elements.academy_name.value,
      academy_website: event.target.elements.academy_website.value,
      academy_email: event.target.elements.academy_email.value,
      academy_country: event.target.elements[3].parentElement.children[1].textContent === 'Select Country' ? null : event.target.elements[3].parentElement.children[1].textContent,
      academy_about: event.target.elements.academy_about.value,
    };
    component.props.saveSettings(profileData, 'academy', component.state.buffer);
  }

  captureFile =(event) => {
    event.stopPropagation();
    event.preventDefault();
    if (!event.target.files[0].type.match(/image.*/)) {
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
      reader.readAsDataURL(event.target.files[0]);
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
      <div className="academia-settings">
        <Dimmer active={this.props.isFetching} inverted>
          <Loader size="medium">
            <svg width="96" height="96" style={{ display: 'block', margin: '0 auto 10px auto' }}>
              <image href={loader} x="0" y="0" width="100%" height="100%" />
            </svg>
            Saving information...
          </Loader>
        </Dimmer>
        {!this.props.academyIsCreated ? (
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
          Academy Information
        </Header>
        <span>
          Fill in the following details to register your educational institute
        </span>
        <Divider clearing />
        <Form onSubmit={(event) => { this.saveSettings(event, this); }}>
          <Form.Field
            required
            label="Academy name"
            control="input"
            name="academy_name"
            placeholder="Your academy name"
            key={`academy_name:${this.props.profiles.academy_name || ''}`}
            defaultValue={this.props.profiles.academy_name ? this.props.profiles.academy_name : ''}
          />
          <Form.Field
            required
            label="Academy website"
            control="input"
            name="academy_website"
            placeholder="Your academy website"
            key={`academy_website:${this.props.profiles.academy_website || ''}`}
            defaultValue={this.props.profiles.academy_website ? this.props.profiles.academy_website : ''}
          />
          <Form.Field
            required
            name="academy_email"
            label="Email"
            key={`academy_email:${this.props.profiles.academy_email || ''}`}
            defaultValue={this.props.profiles.academy_email ? this.props.profiles.academy_email : ''}
            control="input"
            type="email"
            placeholder="Your email"
          />
          <Form.Dropdown
            id="Country"
            name="academy_country"
            key={`academy_country:${this.props.profiles.academy_country || ''}`}
            placeholder="Select Country"
            label="Country"
            defaultValue={this.getCountry(Countries.Countries)}
            fluid
            search
            selection
            options={Countries.Countries}
          />
          <Form.TextArea
            name="academy_about"
            label="About"
            key={`academy_about:${this.props.profiles.academy_about || ''}`}
            defaultValue={this.props.profiles.academy_about ? this.props.profiles.academy_about : ''}
            placeholder="Tell us more about your academy..."
          />
          <Form.Field label="Upload academy logo" control="file">
            <Input
              id="file"
              type="file"
              name="academy_logo"
              placeholder="Academy logo"
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
          <Divider clearing />
          <Button className="save-button" type="submit" primary>Save Academy Settings</Button>
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
    academyIsCreated: state.profiles.academyIsCreated,
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

export default connect(mapStateToProps, mapDispatchToProps)(AcademySettings);
