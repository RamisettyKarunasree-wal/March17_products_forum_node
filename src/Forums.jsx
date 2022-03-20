import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';

function Forums() {
  const [forums, setforums] = useState([]);
  const getforums = () => {
    axios
      .get('/forums')
      .then((res) => {
        setforums(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getforums();
  }, []);
  const formik = useFormik({
    initialValues: {
      title: 'Title',
      date: '2022-02-02',
      body: 'the topic is about given title',
      author: 'tom',
    },
    onSubmit(values) {
      const forumObj = {
        title: values.title,
        date: values.date,
        body: values.body,
        author: values.author,
      };
      axios
        .post('/forums', forumObj)
        .then((res) => {
          console.log(res.data.status);
          getforums();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    validate() {
      const regEx = /^[0-9a-zA-Z]+$/;
      const errors = {};
      if (formik.values.title.length < 10 || formik.values.title.length > 100) {
        errors.title = '*title should have min 10 and max 100 chars';
      }
      if (formik.values.body.length < 50 || formik.values.title.length > 500) {
        errors.body = '*forum body should have min 50 and max 500 chars';
      }
      if (formik.values.author.length < 5 || formik.values.author.length > 50) {
        errors.author = '*author name should have min 5 and max 50 chars';
      }
      if (!formik.values.author.match(regEx)) {
        errors.author = '*author name should be alpha numeric';
      }
      return errors;
    },
  });
  const deleteItem = (index) => {
    axios
      .delete(`/forums/${index}`)
      .then((res) => {
        console.log(res.data);
        getforums();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const deleteAll = () => {
    axios
      .put('/forums/clearAll')
      .then((res) => {
        getforums();
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="forums-container">
      <div className="forums-form">
        <h1>Add Forum</h1>
        <form onSubmit={formik.handleSubmit} noValidate>
          <p>
            <input
              type="text"
              name="title"
              placeholder="Enter forum title"
              value={formik.values.title}
              onChange={formik.handleChange}
            />
            <div className="error">
              {formik.errors.title ? formik.errors.title : null}
            </div>
          </p>
          <p>
            <b>Choose date of creation</b>
            <input
              type="date"
              name="date"
              placeholder="Choose date"
              value={formik.values.date}
              onChange={formik.handleChange}
            />
          </p>
          <p>
            <textarea
              placeholder="Enter Forum body"
              name="body"
              value={formik.values.body}
              onChange={formik.handleChange}
            />
            <div className="error">
              {formik.errors.body ? formik.errors.body : null}
            </div>
          </p>
          <p>
            <input
              type="text"
              name="author"
              placeholder="Enter Author name"
              value={formik.values.author}
              onChange={formik.handleChange}
            />
            <div className="error">
              {formik.errors.author ? formik.errors.author : null}
            </div>
          </p>
          <button type="submit">Add Forum</button>
        </form>
        <button type="button" onClick={deleteAll}>
          Delete All forums
        </button>
      </div>
      <div className="forums-list">
        <h1>Forums List</h1>
        <div className="forums-list-box">
          {forums.map((val, ind) => (
            <div className="forums-item">
              <div className="title">{val.title}</div>
              <div className="body">{val.body}</div>
              <div className="forum-info">
                <div className="author">
                  posted by <b>{val.author}</b>
                </div>
                <div className="date">
                  posted on <b>{val.date}</b>
                </div>
                <div className="forum-del-button">
                  <button
                    type="button"
                    onClick={() => {
                      deleteItem(ind);
                    }}
                  >
                    delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default Forums;
