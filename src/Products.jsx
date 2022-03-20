import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Products() {
  const [products, setProducts] = useState([
    {
      name: 'Mobile',
      price: '300',
      description: 'good camera',
      category: 'toys',
      status: 'available',
    },
  ]);
  const getProducts = () => {
    axios
      .get('/products')
      .then((res) => {
        setProducts(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getProducts();
  }, []);
  const addProduct = (event) => {
    event.preventDefault();
    const productObj = {
      name: event.target.name.value,
      price: event.target.price.value,
      description: event.target.description.value,
      category: event.target.category.value,
      status: event.target.status.value,
    };
    axios
      .post('/products', productObj)
      .then((res) => {
        console.log(res);
        getProducts();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const deleteItem = (index) => {
    axios
      .delete(`/products/${index}`)
      .then((res) => {
        console.log(res.data);
        getProducts();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const deleteAll = () => {
    axios
      .put('/products')
      .then((res) => {
        getProducts();
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="products-container">
      <div className="products-form">
        <h1>Add Product</h1>
        <form onSubmit={addProduct}>
          <p>
            <input type="text" name="name" placeholder="Enter product name" />
          </p>
          <p>
            <input
              type="number"
              name="price"
              placeholder="Enter product Price"
            />
          </p>
          <p>
            <textarea placeholder="Enter description" name="description" />
          </p>
          <p>
            <b>Select Category:</b>
            <select name="category">
              <option value="toys">Toys</option>
              <option value="clothes">Clothes</option>
              <option value="fooditems">FoodItems</option>
            </select>
          </p>
          <p>
            <b>Select Status:</b>
            <select name="status">
              <option value="available">Available</option>
              <option value="notavailable">Not Available</option>
            </select>
          </p>
          <button type="submit">Add Product</button>
        </form>
        <button type="button" onClick={deleteAll}>
          Delete All Products
        </button>
      </div>
      <div className="products-list">
        <h1>Products List</h1>
        <div className="products-list-box">
          {products.map((val, ind) => (
            <div className="products-item">
              <div className="name">{val.name}</div>
              <div className="price">{val.price}$</div>
              <div className="description">{val.description}</div>
              <div className="category">Category: {val.category}</div>
              <div className="status">Status: {val.status}</div>
              <div>
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
          ))}
        </div>
      </div>
    </div>
  );
}
export default Products;
