import React from "react";

const initialValues = {
  id: "",
  title: "",
  director: "",
  metascore: "",
  stars: [],
};

export default function AddMovie() {
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
        {/* <input
          type="text"
          name="metascore"
          value={item.metascore}
          onChange={handleChange}
          placeholder="Metascore"
        /> */}
        <br />
      </form>
    </div>
  );
}
