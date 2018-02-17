import React from 'react';
import propTypes from 'prop-types';
import userShape from 'shapes/user';
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
  user: userShape.isRequired,
};

export default ChapterCell;
