import React, { Fragment as F } from 'react';
import format from 'date-fns/format';
import { arrayOfCandidates } from 'shapes/candidate';
import { arrayOfNominations } from 'shapes/nomination';
import electionShape from 'shapes/election';
import Candidates from 'components/Candidates';
import Nominations from 'components/Nominations';

const Overview = ({ candidates, nominations, election: { requestedDates, date, status } }) => (
  <F>
    <h2>Election Overview</h2>
    {status === 'Requested' && (
      <F>
        <h4>Requested Dates</h4>
        <ul>
          {requestedDates.map(reqDate => <li key={reqDate}>{format(reqDate, 'MMMM Do, YYYY')}</li>)}
        </ul>
      </F>
    )}
    {status !== 'Requested' && <h3>Date: {format(date, 'MMMM Do, YYYY')}</h3>}
    <br />
    <h3>Candidates</h3>
    <Candidates candidates={candidates} />
    <Nominations nominations={nominations} />
  </F>
);

Overview.propTypes = {
  candidates: arrayOfCandidates.isRequired,
  nominations: arrayOfNominations.isRequired,
  election: electionShape.isRequired,
};

export default Overview;
