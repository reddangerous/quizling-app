import React from 'react';
import { useLocation } from 'react-router-dom';

const Scoreboard = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const selectedCategory = searchParams.get('category');
  const score = searchParams.get('score');

  return (
    <div className="d-flex justify-content-center align-items-center h-100">
      <table className="table table-bordered text-center">
        <thead>
          <tr>
            <th colSpan="2">Scoreboard</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Your Score in {selectedCategory}</td>
            <td>Score: {score}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Scoreboard;
