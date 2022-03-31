const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  Tag.findAll({
    // be sure to include its associated Product data
    include: [{model: Product, through: ProductTag}]
  })
  .then(
    tag => {res.json(tag)}
  )
  .catch( err => res.status(500).json(err));
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  Tag.findOne({
    // be sure to include its associated Product data
    include: [{model: Product, through: ProductTag}],
    where: {
      id: req.params.id
    }
  })
  .then(
    tag => {res.json(tag)}
  )
  .catch( err => res.status(500).json(err));
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create(req.body)
  .then(tag => res.json(tag))
  .catch(err => res.status(400).json(err));
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body, {where: {id: req.params.id}})
  .then(tag => res.json(tag))
  .catch(err => res.status(404).json({message: "Category not found"}));
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({where: {id: req.params.id}})
  .then(tag => res.json(tag))
  .catch(err => res.status(404).json({message: "Category not found"}));
});

module.exports = router;
