'use strict';

const User = require('../models/User');
const Product = require('../models/Product');

const getFavorites = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).populate('favorites');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ favorites: user.favorites });
  } catch (err) {
    next(err);
  }
};

const addFavorite = async (req, res, next) => {
  try {
    const { productId } = req.params;

    if (!productId) {
      return res.status(400).json({ message: 'Product ID is required' });
    }

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const alreadyFavorite = user.favorites.some(
      (favId) => favId.toString() === productId
    );

    if (alreadyFavorite) {
      return res.status(409).json({ message: 'Product already in favorites' });
    }

    user.favorites.push(productId);
    await user.save();
    await user.populate('favorites');

    res.status(201).json({ favorites: user.favorites });
  } catch (err) {
    next(err);
  }
};

const removeFavorite = async (req, res, next) => {
  try {
    const { productId } = req.params;

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const nextFavorites = user.favorites.filter((favId) => favId.toString() !== productId);

    if (nextFavorites.length === user.favorites.length) {
      return res.status(404).json({ message: 'Favorite not found' });
    }

    user.favorites = nextFavorites;
    await user.save();
    await user.populate('favorites');

    res.json({ favorites: user.favorites });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getFavorites,
  addFavorite,
  removeFavorite,
};
