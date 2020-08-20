import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";

const initialItem = {
  id: "",
  title: "",
  director: "",
  metascore: "",
  stars: [],
  starsInput: "",
};

export default function UpdateMovie(props) {
  const { id } = useParams();
  const history = useHistory();
  const [item, setItem] = useState(initialItem);
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => {
        console.log(res);
        setItem(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);
  const handleChange = (e) => {
    let value = e.target.value;
    // if (e.target.name === "metascore") {
    //   value = parseInt(value);
    // }
    setItem({ ...item, [e.target.name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/movies/${id}`, item)
      .then((res) => {
        console.log(res);
        props.movieList.filter((mov) => mov.id !== id);
        props.setMovieList([...props.movieList, res.data]);
        props.getMovieList();
        // setItem(initialItem);
        history.push("/");
      })
      .catch((err) => console.log(err));
  };
  const addStars = (e) => {
    e.preventDefault();
    setItem({
      ...item,
      stars: [...item.stars, item.starsInput],
      starsInput: "",
    });
  };
  const deleteStar = (e) => {
    e.preventDefault();
    setItem({
      ...item,
      stars: item.stars.filter((star) => star !== e.target.id),
    });
  };
  return (
    <div>
      <h2>Update Movie:</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={item.title}
          onChange={handleChange}
          placeholder="Title"
        />
        <br />
        <input
          type="text"
          name="director"
          value={item.director}
          onChange={handleChange}
          placeholder="Director"
        />
        <br />
        <input
          type="text"
          name="metascore"
          value={item.metascore}
          onChange={handleChange}
          placeholder="Metascore"
        />
        <br />
        <input
          type="text"
          name="starsInput"
          value={item.starsInput}
          onChange={handleChange}
          placeholder="Stars"
        />
        <button onClick={addStars}>Add a Star</button>
        {item.stars.map((star) => {
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
        <button>Save changes</button>
      </form>
    </div>
  );
}
