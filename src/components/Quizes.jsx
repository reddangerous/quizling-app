import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
const Quizes = () => {
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  const fetchCategories = async () => {
    try {
      const response = await fetch('https://opentdb.com/api_category.php');
      const data = await response.json();
      setCategories(data.trivia_categories);
    } catch (error) {
      console.log('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const startQuiz = () => {
    navigate(`/questions/${category}`);
  };

  return (
    <div className='quizes'>
      <h1>Quizes</h1>
      <p>Select a category of quizzes</p>
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="" className='option'>Any Category</option>
        {categories.map((category) => (
          <option className='option' key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
      <button onClick={startQuiz} disabled={!category} className='start'>
        Start Quiz
      </button>
    </div>
  );
};

export default Quizes;
