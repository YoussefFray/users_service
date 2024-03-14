const express = require("express");
const router = express.Router();
const db = require("../models");

// Middleware for error handling
const errorHandler = (res, err) => {
  console.error(err);
  res.status(500).json({ message: "Internal Server Error" });
};

// Create a new taxi
router.post("/taxi/", async (req, res) => {
  try {
    const newTaxi = await db.Taxi.create(req.body);
    res.status(201).json(newTaxi);
  } catch (err) {
    errorHandler(res, err);
  }
});

// Get all taxis
router.get("/taxi/", async (req, res) => {
  try {
    const taxis = await db.Taxi.findAll();
    res.json(taxis);
  } catch (err) {
    errorHandler(res, err);
  }
});

// Get a specific taxi by ID
router.get("/taxi/:id", async (req, res) => {
  try {
    const taxi = await db.Taxi.findByPk(req.params.id);
    if (!taxi) {
      return res.status(404).json({ message: "Taxi not found" });
    }
    res.json(taxi);
  } catch (err) {
    errorHandler(res, err);
  }
});

// Update a taxi
router.put("/taxi/:id", async (req, res) => {
  try {
    const updatedTaxi = await db.Taxi.update(req.body, {
      where: { id: req.params.id },
    });
    res.json(updatedTaxi);
  } catch (err) {
    errorHandler(res, err);
  }
});

// Delete a taxi
router.delete("/taxi/:id", async (req, res) => {
  try {
    await db.Taxi.destroy({ where: { id: req.params.id } });
    res.json({ message: "Taxi deleted" });
  } catch (err) {
    errorHandler(res, err);
  }
});

module.exports = router;
