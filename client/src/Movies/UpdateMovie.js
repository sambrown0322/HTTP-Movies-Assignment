import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";

const initialItem = {
  id: "",
  title: "",
  director: "",
  metascore: "",
  stars: [],
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
        {/* <input
          type="text"
          name="title"
          value={item.title}
          onChange={handleChange}
          placeholder="Title"
        /> */}
        <button>Save changes</button>
      </form>
    </div>
  );
}
