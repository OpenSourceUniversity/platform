import React from 'react';
import Dropzone from 'react-dropzone';
import { connect } from 'react-redux';
import { Input, Form, Button, Header, Divider, Message, Dimmer, Loader, Container, Icon, Image } from 'semantic-ui-react';
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

class BusinessSettings extends React.Component {
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
    const needle = this.props.profiles.company_country;
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
    let companyWebsite = event.target.elements.company_website.value;
    if (companyWebsite.indexOf('http') !== 0) {
      companyWebsite = `http://${companyWebsite}`;
    }
    const profileData = {
      company_name: event.target.elements.company_name.value,
      company_website: companyWebsite,
      company_email: event.target.elements.company_email.value,
      company_country: event.target.elements[3].parentElement.children[1].textContent === 'Select Country' ? null : event.target.elements[3].parentElement.children[1].textContent,
      company_about: event.target.elements.company_about.value,
    };
    component.props.saveSettings(profileData, 'business', component.state.buffer);
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
      <div className="business-settings">
        <Dimmer className="belowNavBar" active={this.props.isFetching} inverted>
          <Loader size="medium">
            <Image src={loader} style={{ display: 'block', margin: '0 auto 10px auto', width: '96px' }} />
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
            maxLength={130}
            placeholder="Your company name"
            key={`company_name:${this.props.profiles.company_name || ''}`}
            defaultValue={this.props.profiles.company_name ? this.props.profiles.company_name : ''}
          />
          <Form.Field required>
            <label htmlFor="company_website">
              Official company website
            </label>
            <Input
              id="company_website"
              name="company_website"
              maxLength={70}
              label="http://"
              labelPosition="left"
              placeholder="example.com"
              key={`company_website:${this.props.profiles.company_website || ''}`}
              defaultValue={
                (() => {
                  if (this.props.profiles.company_website) {
                    const url = this.props.profiles.company_website;
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
          <Form.Field
            required
            name="company_email"
            maxLength={130}
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
            maxLength={2048}
            key={`company_about:${this.props.profiles.company_about || ''}`}
            defaultValue={this.props.profiles.company_about ? this.props.profiles.company_about : ''}
            placeholder="Tell us more about your company..."
          />
          <Form.Field label="Upload logo" control="file">
            <Dropzone
              id="file"
              style={{ align: 'center', height: '100px', marginBottom: '1em' }}
              accept="image/*"
              name="company_logo"
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
