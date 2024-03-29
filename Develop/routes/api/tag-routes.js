const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// GET all tags
router.get('/', async (req, res) => {
  try {
    const tags = await Tag.findAll({
      include: { model: Product, through: ProductTag }
    });
    res.json(tags);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET a single tag by id
router.get('/:id', async (req, res) => {
  try {
    const tag = await Tag.findByPk(req.params.id, {
      include: { model: Product, through: ProductTag }
    });
    if (!tag) {
      return res.status(404).json({ error: 'Tag not found' });
    }
    res.json(tag);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create a new tag
router.post('/', async (req, res) => {
  try {
    const tag = await Tag.create(req.body);
    res.status(201).json(tag);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update a tag by id
router.put('/:id', async (req, res) => {
  try {
    const [rowsAffected] = await Tag.update(req.body, {
      where: { id: req.params.id }
    });
    if (rowsAffected === 0) {
      return res.status(404).json({ error: 'Tag not found' });
    }
    const updatedTag = await Tag.findByPk(req.params.id);
    res.json(updatedTag);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete a tag by id
router.delete('/:id', async (req, res) => {
  try {
    const rowsAffected = await Tag.destroy({
      where: { id: req.params.id }
    });
    if (rowsAffected === 0) {
      return res.status(404).json({ error: 'Tag not found' });
    }
    res.status(204).end(); // No content to send
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
