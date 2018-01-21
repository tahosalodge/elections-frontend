import React from 'react';
import propTypes from 'prop-types';
import { chapters } from 'constants/values';

const ChapterCell = ({ value, user: { capability } }) => {
  const selectedChapter = chapters.find(chapter => chapter.value === value);

  if (capability === 'unit') {
    return <span>{selectedChapter.district}</span>;
  }
  return <span>{selectedChapter.chapter}</span>;
};

ChapterCell.propTypes = {
  value: propTypes.string.isRequired,
  user: propTypes.shape({
    capability: propTypes.string,
  }).isRequired,
};

export default ChapterCell;
