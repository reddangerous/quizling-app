import React from 'react'

const Home = () => {
  return (
    <body className='home'>
        <div className='home__container'>
            <h1>Welcome To Quizling</h1>
            <h2>Test your knowledge</h2>
            <button><a href='/quizes'>Go to Quizes</a></button>
        </div>
    </body>

  )
}

export default Home