const express = require('express');
const router = express.Router();
const db = require('../models');

// Create a new user-company relationship
router.post('/usercompany', async (req, res) => {
  try {
    const newUserCompany = await db.UserCompany.create({
      userId: req.body.userId,
      companyId: req.body.companyId,
    });
    res.status(201).json(newUserCompany);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Get all user-company relationships
router.get('/usercompanies', async (req, res) => {
  try {
    const userCompanies = await db.UserCompany.findAll();
    res.json(userCompanies);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Get user-company relationships for a specific user
router.get('/usercompanies/user/:userId', async (req, res) => {
  try {
    const userCompanies = await db.UserCompany.findAll({
      where: {
        userId: req.params.userId,
      },
    });
    res.json(userCompanies);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Get user-company relationships for a specific company
router.get('/usercompanies/company/:companyId', async (req, res) => {
  try {
    const userCompanies = await db.UserCompany.findAll({
      where: {
        companyId: req.params.companyId,
      },
    });
    res.json(userCompanies);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Delete a user-company relationship by ID
router.delete('/usercompany/:id', async (req, res) => {
  try {
    const deletedUserCompany = await db.UserCompany.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!deletedUserCompany) {
      return res.status(404).json({ message: 'User-Company relationship not found' });
    }
    res.json({ message: 'User-Company relationship deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
