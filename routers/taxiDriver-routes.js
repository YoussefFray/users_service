const express = require("express");
const router = express.Router();
const db = require("../models");

// Middleware for error handling
const errorHandler = (res, err) => {
  console.error(err);
  res.status(500).json({ message: "Internal Server Error" });
};

// Create a new taxi driver
router.post("/taxidriver/", async (req, res) => {
  try {
    const newDriver = await db.TaxiDriver.create(req.body);
    res.status(201).json(newDriver);
  } catch (err) {
    errorHandler(res, err);
  }
});

// Get all taxi drivers
router.get("/taxidriver/", async (req, res) => {
  try {
    const drivers = await db.TaxiDriver.findAll();
    res.json(drivers);
  } catch (err) {
    errorHandler(res, err);
  }
});

// Get a specific taxi driver by ID
router.get("/taxidriver/:id", async (req, res) => {
  try {
    const driver = await db.TaxiDriver.findByPk(req.params.id);
    if (!driver) {
      return res.status(404).json({ message: "Driver not found" });
    }
    res.json(driver);
  } catch (err) {
    errorHandler(res, err);
  }
});

module.exports = router;
