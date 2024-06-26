const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// GET all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.findAll({
      include: [Category, { model: Tag, through: ProductTag }]
    });
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET a single product by id
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id, {
      include: [Category, { model: Tag, through: ProductTag }]
    });
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create a new product
router.post('/', async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update a product by id
router.put('/:id', async (req, res) => {
  try {
    const [rowsAffected] = await Product.update(req.body, {
      where: { id: req.params.id }
    });
    if (rowsAffected === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }
    // Fetch the updated product separately
    const updatedProduct = await Product.findByPk(req.params.id);
    res.json(updatedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// Delete a product by id
router.delete('/:id', async (req, res) => {
  try {
    const rowsAffected = await Product.destroy({
      where: { id: req.params.id }
    });
    if (rowsAffected === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }
    // Respond with 200 OK and success message
    res.status(200).json({ message: 'Product has been removed successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


module.exports = router;
