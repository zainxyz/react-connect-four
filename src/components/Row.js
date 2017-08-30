import PropTypes from 'prop-types';
import React from 'react';

import Cell from 'components/Cell';

const Row = ({ colors, row, play, }) => (
  <tr>
    {row.map((cell, idx) => (
      <Cell key={idx} value={cell} columnIndex={idx} play={play} colors={colors} />
    ))}
  </tr>
);

Row.propTypes = {
  colors: PropTypes.object,
  play: PropTypes.func,
  row: PropTypes.array,
};

Row.defaultProps = {
  colors: {},
  play: () => {},
  row: [],
};

export default Row;
