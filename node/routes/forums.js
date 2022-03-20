const express = require('express');
const router = express.Router();
let forums = [
  {
    title: 'Some Title',
    date: '2022-04-04',
    body: 'the topic is about given title',
    author: 'tom',
  },
];
router.get('/', function (req, res) {
  res.json(forums);
});
router.post('/', function (req, res) {
  forums.push(req.body);
  res.send({ status: 'Product added Successfully' });
});
router.delete('/:ind', function (req, res) {
  let newforums = forums.filter((val, index) => {
    if (index === Number(req.params.ind)) {
      return false;
    } else {
      return true;
    }
  });
  forums = newforums;
  res.send({ status: 'deleted item successfully' });
});
router.put('/clearAll', function (req, res) {
  forums = [];
  res.send({ status: 'deleted all forums' });
});
module.exports = router;
