import React from 'react';
import propTypes from 'prop-types';

import styled from 'styled-components';
import candidateShape from 'shapes/candidate';

const BallotStyles = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;

  > p,
  h1,
  hr,
  label {
    width: 100%;

    @media print {
      display: none;
    }
  }

  ul {
    padding-left: 1em;
  }

  .ballot {
    width: 45%;
    margin-bottom: 2em;
  }

  li {
    list-style: none;
    line-height: 20px;
    margin-bottom: 0.5em;

    .box {
      width: 20px;
      height: 20px;
      border: 1px solid black;
      display: inline-block;
      margin-right: 0.5em;
      vertical-align: bottom;
    }
  }
`;

const Ballot = ({ candidates }) => (
  <div className="ballot">
    <p>
      You may vote for as many candidates as you like. A blank ballot is a vote against all
      candidates.
    </p>
    <ul>
      {candidates.map(({ fname, lname, _id }) => (
        <li key={_id}>
          <span className="box" />
          {fname} {lname}
        </li>
      ))}
    </ul>
  </div>
);

Ballot.propTypes = {
  candidates: propTypes.arrayOf(candidateShape).isRequired,
};

class Ballots extends React.Component {
  static propTypes = {
    candidates: propTypes.arrayOf(candidateShape).isRequired,
  };

  state = {
    ballotsPerPage: 4,
  };

  getBallots = () => {
    const { candidates } = this.props;
    const { ballotsPerPage } = this.state;
    const elements = [];
    for (let i = 0; i < ballotsPerPage; i += 1) {
      elements.push(<Ballot key={`ballot-${i}`} candidates={candidates} />);
    }
    return elements;
  };

  ballotCount = ({ target: { value: ballotsPerPage } }) => this.setState({ ballotsPerPage });

  render() {
    const { ballotsPerPage } = this.state;
    return (
      <BallotStyles>
        <h1>Ballots</h1>
        <p>When you print this page, all content other than the ballots will be hidden.</p>
        <label>
          Ballots per page:{' '}
          <input
            type="number"
            name="numberOfBallots"
            value={ballotsPerPage}
            onChange={this.ballotCount}
          />
        </label>
        <hr />
        {this.getBallots()}
      </BallotStyles>
    );
  }
}

export default Ballots;
