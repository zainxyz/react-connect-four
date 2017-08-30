import PropTypes from 'prop-types';
import React from 'react';

const Cell = ({ value, colors, columnIndex, play, }) => {
  const color = value === 1 ? colors.player_1 : value === 2 ? colors.player_2 : colors.default;

  const outerCellStyle = {
    alignItems: 'center',
    backgroundColor: colors.cellOuter,
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'row',
    height: '70px',
    justifyContent: 'center',
    width: '70px',
  };

  const innerCellStyle = {
    backgroundColor: color,
    borderRadius: '50%',
    height: '60px',
    transition: 'background-color .5s ease-in',
    width: '60px',
  };

  return (
    <td style={{ padding: 0, }}>
      <div style={outerCellStyle} className="cell" onClick={() => play(columnIndex)}>
        <div style={innerCellStyle} />
      </div>
    </td>
  );
};

Cell.propTypes = {
  colors: PropTypes.object,
  columnIndex: PropTypes.number,
  play: PropTypes.func,
  value: PropTypes.number,
};

Cell.defaultProps = {
  colors: {},
  columnIndex: 0,
  play: () => {},
  value: 0,
};

export default Cell;
