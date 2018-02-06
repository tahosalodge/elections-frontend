import React, { Fragment as F } from 'react';
import propTypes from 'prop-types';
import format from 'date-fns/format';
import candidateShape from 'shapes/candidate';
import electionShape from 'shapes/election';
import Candidates from 'components/Candidates';

const Overview = ({ candidates, election: { requestedDates, date, status } }) => (
  <F>
    <h1>Election Overview</h1>
    {status === 'Requested' && (
      <F>
        <h4>Requested Dates</h4>
        <ul>
          {requestedDates.map(reqDate => <li key={reqDate}>{format(reqDate, 'MMMM Do, YYYY')}</li>)}
        </ul>
      </F>
    )}
    {status === 'Scheduled' && <p>Election Date: {format(date, 'MMMM Do, YYYY')}</p>}
    <Candidates candidates={candidates} />
  </F>
);

Overview.propTypes = {
  candidates: propTypes.arrayOf(candidateShape).isRequired,
  election: electionShape.isRequired,
};

export default Overview;
