'use strict';

require('dotenv').config();

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const connectDB = require('../config/db');
const User = require('../models/User');
const Product = require('../models/Product');

const products = [
  {
    title: 'Wireless Earbuds',
    description: 'Compact earbuds with noise cancellation and 24-hour battery life.',
    price: 59.99,
    image: 'https://picsum.photos/seed/earbuds/600/400',
  },
  {
    title: 'Smart Water Bottle',
    description: 'Tracks hydration and glows to remind you to drink more water.',
    price: 39.5,
    image: 'https://picsum.photos/seed/bottle/600/400',
  },
  {
    title: 'Minimalist Desk Lamp',
    description: 'Adjustable LED lamp perfect for late-night work sessions.',
    price: 72.0,
    image: 'https://picsum.photos/seed/lamp/600/400',
  },
  {
    title: 'Ergonomic Office Chair',
    description: 'Breathable mesh chair with lumbar support for long work days.',
    price: 189.99,
    image: 'https://picsum.photos/seed/chair/600/400',
  },
  {
    title: 'Portable Projector',
    description: 'Pocket-sized projector for movie nights wherever you go.',
    price: 129.0,
    image: 'https://picsum.photos/seed/projector/600/400',
  },
  {
    title: 'Fitness Smartwatch',
    description: 'Monitor heart rate, steps, and workouts on a bright AMOLED screen.',
    price: 149.99,
    image: 'https://picsum.photos/seed/watch/600/400',
  },
  {
    title: 'Mechanical Keyboard',
    description: 'Hot-swappable switches and customizable RGB lighting.',
    price: 98.75,
    image: 'https://picsum.photos/seed/keyboard/600/400',
  },
  {
    title: 'Reusable Notebook',
    description: 'Wipeable notebook that syncs notes to the cloud.',
    price: 24.99,
    image: 'https://picsum.photos/seed/notebook/600/400',
  },
  {
    title: 'Travel Backpack',
    description: 'Water-resistant backpack with multiple compartments and USB port.',
    price: 84.5,
    image: 'https://picsum.photos/seed/backpack/600/400',
  },
  {
    title: 'Artisan Coffee Grinder',
    description: 'Handcrafted wooden grinder with adjustable ceramic burr.',
    price: 54.25,
    image: 'https://picsum.photos/seed/grinder/600/400',
  },
];

const users = [
  {
    name: 'Test User One',
    email: 'test1@example.com',
    password: '123456',
  },
  {
    name: 'Test User Two',
    email: 'test2@example.com',
    password: '123456',
  },
];

const closeConnection = async (code) => {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.connection.close();
  }
  process.exit(code);
};

const hashUserPasswords = async () =>
  Promise.all(
    users.map(async (user) => ({
      ...user,
      password: await bcrypt.hash(user.password, 10),
    }))
  );

const seed = async () => {
  try {
    await connectDB();
    console.log('Connected to database');

    await Promise.all([User.deleteMany(), Product.deleteMany()]);
    console.log('Deleted existing data');

    const insertedProducts = await Product.insertMany(products, { ordered: true });
    if (insertedProducts.length !== products.length) {
      throw new Error('Failed to insert the expected number of products');
    }
    console.log('Inserted 10 products');

    const usersWithHashedPasswords = await hashUserPasswords();
    const insertedUsers = await User.insertMany(usersWithHashedPasswords, { ordered: true });
    if (insertedUsers.length !== users.length) {
      throw new Error('Failed to insert the expected number of users');
    }
    console.log('Inserted 2 users');

    console.log('Database seeded successfully');
    await closeConnection(0);
  } catch (err) {
    console.error('Seeding failed:', err);
    await closeConnection(1);
  }
};

seed();
