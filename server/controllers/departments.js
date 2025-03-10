const express = require('express');
const Department = require('../models/department');

const router = express.Router();

// Get all Departments
router.get('/', async (req, res) => {
  try {
    await Department.find().then((result) => {
      res.status(200).setHeader('X-Total-Count', result.length).json(result);
    });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});

// Get a single Department
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await Department.findById(id).then((result) => {
      if (result) {
        return res.status(200).json(result);
      } else {
        return res.status(404).json({
          message: `Error: Failed to find Department with ID: ${req.params.id}`,
        });
      }
    });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});

// Create a Department
router.post('/', async (req, res) => {
  try {
    const newDepartment = new Department(req.body);
    await newDepartment.save().then((result) => {
      return res.status(201).json(result);
    });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});

// Update a Department
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedDepartment = req.body;
    await Department.findByIdAndUpdate(id, updatedDepartment, {
      new: true,
    }).then((result) => {
      if (result) {
        return res.status(200).json(result);
      } else {
        return res.status(404).json({
          message: `Error: Failed to find Department with ID: ${req.params.id}`,
        });
      }
    });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});

// Delete a Department
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Department.findByIdAndDelete(id).then((result) => {
      if (result) {
        return res.status(200).json(`Deleted Department ${id} successfully`);
      } else {
        return res.status(400).json({
          message: `Error: No Department ID found matching ${req.params.id}`,
        });
      }
    });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});

module.exports = router;
