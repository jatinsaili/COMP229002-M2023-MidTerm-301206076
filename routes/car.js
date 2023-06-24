/*
  File: car.js
  Author: Jatin Saili
  Student ID: 301206076
  Web App Name: Used Car Store

  Description: This JavaScript file contains the middleware function and route handler
  for requiring authentication and handling successful authentication redirects in the
  Used Car Store web application.
*/
var express = require("express");
var router = express.Router();

let carController = require("../controllers/car");

// Helper function for guard purposes
function requireAuth(req, res, next) {}

/* GET list of items */
router.get("/list", carController.carList);

// Route for Details
router.get("/details/:id", carController.details);

// Routers for edit
router.get("/edit/:id", requireAuth, carController.displayEditPage);
router.post("/edit/:id", requireAuth, carController.processEditPage);

// Delete
router.get("/delete/:id", requireAuth, carController.performDelete);

/* GET Route for displaying the Add page - CREATE Operation */
router.get("/add", requireAuth, carController.displayAddPage);

/* POST Route for processing the Add page - CREATE Operation */
router.post("/add", requireAuth, carController.processAddPage);

module.exports = router;
