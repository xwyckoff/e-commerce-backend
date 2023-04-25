const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  Tag.findAll({
    include: Product
  }).then(tag => {
    res.json(tag);
  }).catch(err => {
    res.status(500).json(err)
  })
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  Tag.findByPk(req.params.id, {
    include: Product
  }).then(tag => {
    res.json(tag)
  }).catch(err => {
    res.status(500).json(err);
  })
});

router.post('/', (req, res) => {
  //create a new tag
  Tag.create({
    tag_name: req.body.tag_name
  }).then(newTag => {
    res.json(newTag);
  }).catch(err => {
    res.status(500).json(err)
  })
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update({
    tag_name: req.body.tag_name
  },
  {
    where: {
      id: req.params.id
    }
  }).then(updatedTag => {
    res.json(updatedTag)
  }).catch(err => {
    res.status(500).json(err)
  })
});

router.delete('/:id', (req, res) => {
  Tag.destroy({
    where: {
      id: req.params.id
    }
  }).then(deletedTag => {
    res.json(deletedTag)
  }).catch(err => {
    res.status(500).json(err)
  })
});

module.exports = router;
