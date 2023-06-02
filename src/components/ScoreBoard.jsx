import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';

const Scoreboard = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const selectedCategory = searchParams.get('category');
  const score = searchParams.get('score');
  const [userScoreTable, setUserScoreTable] = useState([]);
  const user = useUser();

  useEffect(() => {
    const savedScores = localStorage.getItem('userScores');
    if (savedScores) {
      setUserScoreTable(JSON.parse(savedScores));
    }
  }, []);

  useEffect(() => {
    if (user) {
      const updatedScores = userScoreTable.map((scoreData) => {
        if (scoreData.userId === user.id) {
          return { ...scoreData, category: selectedCategory, score: score };
        }
        return scoreData;
      });

      const userExists = updatedScores.some((scoreData) => scoreData.userId === user.id);
      if (!userExists) {
        updatedScores.push({ userId: user.id, category: selectedCategory, score: score });
      }

      setUserScoreTable(updatedScores);
      localStorage.setItem('userScores', JSON.stringify(updatedScores));
    }
  }, [selectedCategory, score, user, userScoreTable]);

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
            <th>Category</th>
            <th>Score</th>
          </tr>
          {userScoreTable
            .filter((scoreData) => scoreData.userId === user.id)
            .map((scoreData, index) => (
              <tr key={index}>
                <td>{scoreData.category}</td>
                <td>{scoreData.score}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Scoreboard;

