const express = require('express');
const router = express.Router();
let products = [
  {
    name: 'redmi Mobile',
    price: '300',
    description: 'good camera',
    category: 'toys',
    status: 'available',
  },
];
router.get('/', function (req, res) {
  res.json(products);
});
router.post('/', function (req, res) {
  products.push(req.body);
  res.send({ status: 'Product added Successfully' });
});
router.delete('/:ind', function (req, res) {
  let newProducts = products.filter((val, index) => {
    if (index === Number(req.params.ind)) {
      return false;
    } else {
      return true;
    }
  });
  products = newProducts;
  res.send({ status: 'deleted item successfully' });
});
router.put('/', function (req, res) {
  products = [];
  res.send({ status: 'deleted all products' });
});
module.exports = router;
