import React from 'react';
import styled from 'styled-components';

const { Raven } = window;

const InlinePre = styled.pre`
  display: inline-block;
  background: #dadada;
  padding: 3px;
  font-family: 'Fira Code', menlo, monospace;
`;

const NotFound = () => {
  const { pathname } = window.location;
  Raven.captureException(new Error('Not Found error'), {
    level: 'info',
  });
  Raven.showReportDialog();
  return (
    <div>
      <h1>Page not found.</h1>
      <p>You were trying to access .</p>
      <InlinePre styles={{ display: 'inline' }}>{pathname}</InlinePre>
    </div>
  );
};

export default NotFound;
