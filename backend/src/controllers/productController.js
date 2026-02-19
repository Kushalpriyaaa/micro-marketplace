'use strict';

const Product = require('../models/Product');

const getProducts = async (req, res, next) => {
  try {
    const search = typeof req.query.search === 'string' ? req.query.search.trim() : '';
    const page = Math.max(parseInt(req.query.page, 10) || 1, 1);
    const limit = Math.max(parseInt(req.query.limit, 10) || 10, 1);
    const filters = search
      ? {
          title: {
            $regex: search,
            $options: 'i',
          },
        }
      : {};

    const total = await Product.countDocuments(filters);
    const products = await Product.find(filters)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    const pages = total > 0 ? Math.ceil(total / limit) : 0;

    res.json({
      products,
      total,
      page,
      pages,
    });
  } catch (err) {
    next(err);
  }
};

const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id).lean();

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({ product });
  } catch (err) {
    next(err);
  }
};

const createProduct = async (req, res, next) => {
  try {
    const { title, price, description, image } = req.body;

    if (!title || !description || !image || price === undefined) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const trimmedTitle = title.trim();
    const trimmedDescription = description.trim();
    const trimmedImage = image.trim();
    const numericPrice = Number(price);

    if (!trimmedTitle || !trimmedDescription || !trimmedImage) {
      return res.status(400).json({ message: 'Fields cannot be empty' });
    }

    if (Number.isNaN(numericPrice) || numericPrice < 0) {
      return res.status(400).json({ message: 'Price must be a positive number' });
    }

    const product = await Product.create({
      title: trimmedTitle,
      description: trimmedDescription,
      image: trimmedImage,
      price: numericPrice,
    });

    res.status(201).json({ product });
  } catch (err) {
    next(err);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const { title, price, description, image } = req.body;

    if (title !== undefined) {
      if (!title.trim()) {
        return res.status(400).json({ message: 'Title cannot be empty' });
      }
      product.title = title.trim();
    }

    if (description !== undefined) {
      if (!description.trim()) {
        return res.status(400).json({ message: 'Description cannot be empty' });
      }
      product.description = description.trim();
    }

    if (image !== undefined) {
      if (!image.trim()) {
        return res.status(400).json({ message: 'Image cannot be empty' });
      }
      product.image = image.trim();
    }

    if (price !== undefined) {
      const numericPrice = Number(price);
      if (Number.isNaN(numericPrice) || numericPrice < 0) {
        return res.status(400).json({ message: 'Price must be a positive number' });
      }
      product.price = numericPrice;
    }

    await product.save();

    res.json({ product });
  } catch (err) {
    next(err);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    await product.deleteOne();

    res.json({ message: 'Product deleted' });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
