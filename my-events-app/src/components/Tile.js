import React from 'react';

const Tile = ({ number, onClick }) => {
  return (
    <button className="tile" onClick={() => onClick(number)}>
      {number}
    </button>
  );
};

export default Tile;