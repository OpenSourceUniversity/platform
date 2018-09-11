import React from 'react';
import { connect } from 'react-redux';
import { Container, Header, Divider, Grid, Sticky, Segment, List, Button, Statistic, Dimmer, Loader, Message, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import SkillItem from 'components/SkillItem';
import CertificateItem from 'components/CertificateItem';
import fetchCertificates from '../../util/certificate/fetchCertificates';

const colors = [
  'grey',
];

class LearnerProfile extends React.Component {
  componentDidMount() {
    this.props.fetchCertificates();
  }

  isVerified(certificate) {
    for (let i = 0; i < certificate.verifications.length; i += 1) {
      if (certificate.verifications[i][certificate.verifications[i].length - 1].state === 'verified') {
        return true;
      }
    }
    return false;
  }

  renderCertificates() {
    return this.props.certificates.map((certificate, index) => (
      <Grid.Column
        computer={4}
        largeScreen={4}
        widescreen={4}
        tablet={8}
        mobile={16}
        key={index}
      >
        <CertificateItem certificate={certificate} key={index} />
      </Grid.Column>
    ));
  }

  renderSkills() {
    const { certificates } = this.props;
    certificates.sort((a, b) => b.verified);
    let verifiedSkills = [];
    let notVerifiedSkills = [];
    const skills = [];
    for (let i = 0; i < certificates.length; i += 1) {
      if (this.isVerified(certificates[i])) {
        verifiedSkills = verifiedSkills.concat(certificates[i].skills);
      } else {
        notVerifiedSkills = notVerifiedSkills.concat(certificates[i].skills);
      }
    }
    verifiedSkills = [...new Set(verifiedSkills.map(e => e.name))];
    notVerifiedSkills = [...new Set(notVerifiedSkills.map(e => e.name))];
    notVerifiedSkills = notVerifiedSkills.filter(el => !verifiedSkills.includes(el));

    for (let i = 0; i < verifiedSkills.length; i += 1) {
      skills.push({
        have_icon: true, check: true, name: verifiedSkills[i], basic: true,
      });
    }
    for (let i = 0; i < notVerifiedSkills.length; i += 1) {
      skills.push({
        have_icon: true, check: false, name: notVerifiedSkills[i], basic: true,
      });
    }
    return skills.map((skill, index) => (
      <SkillItem skill={skill} key={index} />
    ));
  }

  render() {
    const avatarPlaceholder = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw8PDxUQDw8VFRUVFRUVFRUVFRUVFRUVFRUWFxUVFRUYHSggGBolHRUVITEhJSkrLi4uFx8zODMtNygtLisBCgoKDQ0NDg0NDisZFRkrKysrKystLSsrKysrKysrKysrKystKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAOEA4QMBIgACEQEDEQH/xAAbAAEBAAMBAQEAAAAAAAAAAAAAAQIEBQMGB//EADQQAQEAAQICCAMIAAcAAAAAAAABAgMRBCEFEjFBUWFxgZGx4SIyM0KhwdHwExUjcoKS8f/EABUBAQEAAAAAAAAAAAAAAAAAAAAB/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8A/XAFQAAAAAAAAAAAAAAAAAAAAQAQEASiAom/kgPYAAAAAAAAAAAAAAAAAAAAEAQQAEAQQAQB7gAAAAAAAA8+I18dPHfL2nffQHpbt2tHX6Twx5Y/avwnxc7iuLy1Lz5Tund7+LXBuanSWreyyek/l4XidS/ny+NeQD1nEak/Pl/2r20+kdWfm39Y1AHX0OlMbyzm3nOcb+OUs3l3njHzL24fiMtO7431ndQfQjw4XisdSbzt754fR7AJSgICAIIAi1iCoig2AAAAAAAAY6upMcbleyOBxOvdTLrX2nhG10txG+XUnZO31c8ABQAAAAABlpatwymWN5x3uG15qYzKe88K+ebXR3EdTPbuy5X9qg7iCAUGNARUoCDHcBU38wG0AAAAAAx1M+rjcr3S34Mmr0pltpXz2n6g4eWVttvbeaAoAAAAAAIAIAD6DhNXr6eOXlz9Zyr1aHQ+X2LPC/ON5AtQSgJRNwEqVLQUTcBuAAAAAANLpj8Of7p8q3Wp0pjvpXysv6/UHDAUAAAAEABAAQAdPobsz/4/u6LQ6Hn2LfG/KfVvoG7Fd0oJUN0ArEqAox3Ab4AAAAADHVw62Nx8ZYyAfM2bXa9yN/pbQ6uXXnZl8/7+7QAAUEVAEABFQBBs9H6HXzm/ZOd/aA6vB6fV08Z5b31vN7UqVArFaxAqUSgWsaJaCjHdQdAAAAAAAAGGtpTPG43sv93cDiNG4ZdXL/2eL6J5cTw+Opjtfa98B86PbieGy079qcu691eCgCAAgCKz0dHLO7Yz+J6gx08LldpOddzhdCaeO07e++NThOFmnPG3tv7Tye1QEpUAS0Y2gWpuVNwGNq2sQN7/AHYTcB0wAAAAAAAAaev0jp48petfL+QbWWMs2s3nhWhr9F43nhdvLtn0a+fSue/LGSe9bGj0phfvS4/rAaOpwGrj+Xf05/V4ZaWU7cb8K+g09bDL7uUvpWYPm5pZd2N+FeunwWrl+Wz15fN3q89TVxx7cpPW7A0NHouTnnlv5Ts+LfwwmM2xm0amt0lpzs3yvlynxrU/zTPffqzbw5/MHXYtPS6Swy5X7N8+c+Lbll5ygVKWpQKxpUASlrECpS1KCbi+4DqAAAAAAPDiuLx05z53unf9Hnx/GTTm055Xs8vOuJnlbd7d7Qe3E8Xnqdt2nhOz6tcFEABGUzynZb8axQGWWple3K/GsFQBBAHpocRlhfs327r7PIB2uF43HPl2ZeH8NivnN3U4Hjet9nK/a7r4/VBvVjVY0CsaVKBuxq1iC7IbIDsAAAAPLiteaeNyvtPGvVxOlNfrZ9WdmPL37/4Bq6mdyttvOsAUEABAAQQBAoIgAIVAEl7xKDtcHxH+Jj5zlf5e+7h8HrdTOXuvK+jt2oJU3KxA3RUoG9/tE2UHYAAAB58Tq9TC5eE/XufOWux0xnthJ435f2OMAgKCAAhQERUASlQBDdAKgUEqCAOzwWr1tOeXK+zi1v8ARWf3sfS/39EHRtQqAIbgG1VjuoOyAACA5XTV54zyv67fw5rodNfex9L83OARUUEABBAEpUARalAYrUBAqAJSsQG10Zf9T2v7VqVtdG/ie1QddjVqUBDcA9/1E9wHbBAEAHJ6Z+9j6fu5zodM/ex9P3c4AEUEEoCKxABALUogCCAIICU3KgDZ6N/E9q1Wz0b+J7VB10VAEVAXYXqgOygAiADk9Nfex9L83OABAUY0oAlKgBUAGNABjQAYpQBKgAlbfRv4k9KAOrCfyCCLf7+igAAP/9k=';
    const email = `mailto:${this.props.profiles.learner_email}`;
    const site = `${this.props.profiles.learner_site}`;
    const phoneNumber = `tel:${this.props.profiles.phone_number}`;


    return (
      <div>
        <Grid>
          {colors.map(color => (
            <Grid.Row className="profileBackground" color={color} key={color}>
              <Grid.Column />
            </Grid.Row>
          ))}
        </Grid>
        <Container>
          <Grid className="profileDetails">
            <Grid.Column mobile={16} tablet={8} computer={5}>
              <Sticky offset={150}>
                <Segment.Group className="profileSegment">
                  <Segment textAlign="center">
                    <Segment
                      textAlign="center"
                      circular
                      className="profilePicSegment"
                      style={{
                        width: 175,
                        height: 175,
                        backgroundImage: `url(${this.props.profiles.learner_avatar ? `https://ipfs.io/ipfs/${this.props.profiles.learner_avatar}` : avatarPlaceholder})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'contain',
                        backgroundPosition: 'center center',
                        borderWidth: 0,
                        cursor: 'auto',
                      }}
                    />
                    <Header size="large">
                      {this.props.profiles.first_name} {this.props.profiles.last_name}
                    </Header>
                    <Header size="small" color="grey">
                      {this.props.profiles.learner_position ? this.props.profiles.learner_position : '-'}
                    </Header>
                  </Segment>
                  <Segment padded="very">
                    <List>
                      <List.Item icon={{ name: 'users', style: { width: '22px' } }} content={this.props.profiles.learner_specialisation ? this.props.profiles.learner_specialisation : '-'} />
                      <List.Item icon={{ name: 'marker', style: { width: '22px' } }} content={this.props.profiles.learner_country ? this.props.profiles.learner_country : '-'} />
                      <List.Item icon={{ name: 'mail', style: { width: '22px' } }} content={<a target="_blank" rel="noopener noreferrer" href={email}>{this.props.profiles.learner_email ? this.props.profiles.learner_email : '-'}</a>} />
                      <List.Item icon={{ name: 'linkify', style: { width: '22px' } }} content={<a target="_blank" rel="noopener noreferrer" href={site}>{this.props.profiles.learner_site ? this.props.profiles.learner_site : '-'}</a>} />
                      <List.Item icon={{ name: 'phone', style: { width: '22px' } }} content={<a target="_blank" rel="noopener noreferrer" href={phoneNumber}>{this.props.profiles.phone_number ? this.props.profiles.phone_number : '-'}</a>} />
                    </List>
                  </Segment>
                  <Segment padded="very">
                    <Statistic.Group size="tiny" color="orange" horizontal>
                      <Statistic>
                        <Statistic.Value>{this.props.certificates.length}</Statistic.Value>
                        <Statistic.Label>Certificates</Statistic.Label>
                      </Statistic>
                    </Statistic.Group>
                  </Segment>
                </Segment.Group>
              </Sticky>
            </Grid.Column>
            <Grid.Column mobile={16} tablet={8} computer={11}>
              <Segment padded="very" size="large">
                <Header>
                  Introduction
                </Header>
                <Divider clearing />
                <div style={{ whiteSpace: 'pre-line' }}>
                  {this.props.profiles.learner_about ? this.props.profiles.learner_about : '-'}
                </div>
                <Divider hidden />
                <Header floated="left">
                  Certificates
                </Header>
                <Button style={{ marginBottom: '1em' }} icon labelPosition="left" positive floated="right" as={Link} to="/certificates/add">
                  <Icon name="plus" />
                  Add Certificate
                </Button>
                <Divider clearing />
                <Dimmer active={this.props.isFetching} inverted>
                  <Loader size="large">Loading</Loader>
                </Dimmer>
                <Message error hidden={!this.props.error}>
                  <p>
                    {this.props.error}
                  </p>
                </Message>

                <Message info hidden={this.props.certificates.length > 0 || !!this.props.error}>
                  <p>
                    You do not have any certificates yet. Go ahead and add some.
                  </p>
                </Message>
                <Grid width={16}>
                  {this.renderCertificates()}
                </Grid>

              </Segment>
              <Segment.Group size="large">
                <Segment padded="very">
                  <Header>
                    Education
                  </Header>
                  <Divider clearing />
                  {
                    this.props.certificates.length ?
                      this.renderSkills() :
                      <div style={{ textAlign: 'center', width: '100%' }}>
                        <p style={{ textAlign: 'center' }}>There is no any skill yet.</p>
                      </div>
                  }
                </Segment>
                <Segment padded="very">
                  <Header>
                    Experience
                  </Header>
                  <Segment style={{
                    textAlign: 'center', background: '#7f8fa6', color: '#fff', borderRadius: '10px', opacity: 0.7,
                  }}
                  >
                      Coming in Beta
                  </Segment>
                  <Divider clearing />
                </Segment>
              </Segment.Group>
              <Segment padded="very" size="large">
                <Header>
                  Reviews
                </Header>
                <Segment style={{
                  textAlign: 'center', background: '#7f8fa6', color: '#fff', borderRadius: '10px', opacity: 0.7,
                }}
                >
                    Coming in Beta
                </Segment>
                <Divider clearing />
              </Segment>
            </Grid.Column>
          </Grid>
        </Container>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    certificates: state.certificates.certificates,
    isFetchingCertificate: state.certificates.isFetching,
    errorCertificate: state.certificates.error,
    profiles: state.profiles.profiles,
  };
}


function mapDispatchToProps(dispatch) {
  return {
    fetchCertificates() {
      dispatch(fetchCertificates());
    },
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(LearnerProfile);
