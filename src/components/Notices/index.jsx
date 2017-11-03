import React from 'react';
import PropTypes from 'prop-types';

const Notices = ({ notices }) => (
  <div>
    <ul>{notices.map(notice => <li key={notice.time}>{notice.body}</li>)}</ul>
  </div>
);

Notices.propTypes = {
  notices: PropTypes.arrayOf(PropTypes.shape({
    body: PropTypes.string,
    time: PropTypes.date,
  })).isRequired,
};

export default Notices;
