const express = require("express");
const router = express.Router();
const db = require("../models");

// Create a new company
router.post("/company", async (req, res) => {
  try {
    const newCompany = await db.Company.create({
      name: req.body.name,
      address: req.body.address,
      city: req.body.city,
      country: req.body.country,
      email: req.body.email,
      phone: req.body.phone,
    });
    res.status(201).json(newCompany);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Get all companies
router.get("/companies", async (req, res) => {
  try {
    const companies = await db.Company.findAll();
    res.json(companies);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Get a specific company by ID
router.get("/company/:id", async (req, res) => {
  try {
    const company = await db.Company.findByPk(req.params.id);
    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }
    res.json(company);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Update a company by ID
router.put("/company/:id", async (req, res) => {
  try {
    const updatedCompany = await db.Company.update(
      {
        name: req.body.name,
        address: req.body.address,
        city: req.body.city,
        country: req.body.country,
        email: req.body.email,
        phone: req.body.phone,
      },
      {
        where: {
          companyId: req.params.id,
        },
      }
    );
    if (updatedCompany[0] === 0) {
      return res.status(404).json({ message: "Company not found" });
    }
    res.json({ message: "Company updated" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Delete a company by ID
router.delete("/company/:id", async (req, res) => {
  try {
    const deletedCompany = await db.Company.destroy({
      where: {
        companyId: req.params.id,
      },
    });
    if (!deletedCompany) {
      return res.status(404).json({ message: "Company not found" });
    }
    res.json({ message: "Company deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
