import React, { useRef } from 'react';

import classes from './AddMovie.module.css';

function AddMovie({ onAddMovie }) {
  const titleRef = useRef('');
  const openingTextRef = useRef('');
  const releaseDateRef = useRef('');

  function submitHandler(event) {
    event.preventDefault();
    const title = titleRef.current.value.trim();
    const openingText = openingTextRef.current.value.trim();
    const releaseDate = releaseDateRef.current.value.trim();

    if (title === '' || openingText === '' || releaseDate === '') {
      alert("Please Input All Credentials");
      return;
    }

    const movie = {
      title,
      openingText,
      releaseDate,
    };

    titleRef.current.value = '';
    openingTextRef.current.value = '';
    releaseDateRef.current.value = '';

    onAddMovie(movie);
  }

  return (
    <form onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor='title'>Title</label>
        <input type='text' id='title' ref={titleRef} aria-label='Movie Title' />
      </div>
      <div className={classes.control}>
        <label htmlFor='opening-text'>Opening Text</label>
        <textarea rows='5' id='opening-text' ref={openingTextRef} aria-label='Opening Text'></textarea>
      </div>
      <div className={classes.control}>
        <label htmlFor='date'>Release Date</label>
        <input type='text' id='date' ref={releaseDateRef} aria-label='Release Date' />
      </div>
      <button>Add Movie</button>
    </form>
  );
}

export default AddMovie;
