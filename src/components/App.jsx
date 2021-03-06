import React from 'react';
import propTypes from 'prop-types';
import { ConnectedRouter } from 'react-router-redux';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Typekit from 'react-typekit';

import Header from 'components/Header';
import Routes from 'components/Routes';
import Toasts from 'components/Toasts';
import userShape from 'shapes/user';
import { userVerifyRequest } from 'redux/state/user';

const GlobalStyles = styled.div`
  font-family: museo-sans, sans-serif;
`;

const Page = styled.div`
  max-width: 1200px;
  width: 90%;
  padding: 2em 5em;
  background: white;
  margin: 2em auto 0;
  min-height: 60vh;
  position: relative;

  @media (max-width: 600px) {
    width: 100%;
    padding: 1em;
    margin-top: 0;
  }

  @media print {
    margin: 0;
    width: 8.5in;
    height: 11in;
    overflow: hidden;
    padding: 10px;
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    align-items: flex-start;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: museo-slab, Georgia, Times, serif;
    font-weight: 500;
    margin-top: 0;
    margin-bottom: 1em;
  }

  p {
    margin-top: 0;
  }
`;

class App extends React.PureComponent {
  static propTypes = {
    history: propTypes.shape().isRequired,
    user: userShape.isRequired,
    userVerifyRequest: propTypes.func.isRequired,
  };

  componentWillMount() {
    this.props.userVerifyRequest();
  }
  render() {
    const { history, user } = this.props;
    return (
      <ConnectedRouter history={history}>
        <GlobalStyles>
          <Header user={user} />
          <Page>
            <Routes />
          </Page>
          <Toasts />
          <Typekit kitId="xbk1ivk" />
        </GlobalStyles>
      </ConnectedRouter>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps, { userVerifyRequest })(App);
