import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const initialValues = {
  id: "",
  title: "",
  director: "",
  metascore: "",
  stars: [],
  starsInput: "",
};

export default function AddMovie(props) {
  const [inputs, setInputs] = useState(initialValues);
  const history = useHistory();

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:5000/api/movies", inputs).then((res) => {
      console.log(res);
      props.getMovieList();
      history.push("/");
    });
  };
  const addStars = (e) => {
    e.preventDefault();
    setInputs({
      ...inputs,
      stars: [...inputs.stars, inputs.starsInput],
      starsInput: "",
    });
  };
  const deleteStar = (e) => {
    e.preventDefault();
    setInputs({
      ...inputs,
      stars: inputs.stars.filter((star) => star !== e.target.id),
    });
  };
  return (
    <div>
      <h2>Update Movie:</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={inputs.title}
          onChange={handleChange}
          placeholder="Title"
        />
        <br />
        <input
          type="text"
          name="director"
          value={inputs.director}
          onChange={handleChange}
          placeholder="Director"
        />
        <br />
        <input
          type="text"
          name="metascore"
          value={inputs.metascore}
          onChange={handleChange}
          placeholder="Metascore"
        />
        <br />
        <input
          type="text"
          name="starsInput"
          value={inputs.starsInput}
          onChange={handleChange}
          placeholder="Stars"
        />
        <button onClick={addStars}>Add a Star</button>
        <br />
        {inputs.stars.map((star) => {
          return (
            <div>
              <span>{star}</span>
              <button id={star} onClick={deleteStar}>
                X
              </button>
            </div>
          );
        })}
        <br />
        <button>Submit</button>
      </form>
    </div>
  );
}
