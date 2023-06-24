/*
  File: car.js
  Author: Jatin Saili
  Student ID: 301206076
  Web App Name: Used Car Store

  Description: This JavaScript file contains controllers.
*/
// create a reference to the model
let CarModel = require("../models/car");

/**
 * Retrieves all cars from the database and renders the page to list them all.
 */
module.exports.carList = async function (req, res, next) {
  try {
    let carsList = await CarModel.find({});

    res.render("cars/list", {
      title: "Cars List",
      CarsList: carsList,
      userName: req.user ? req.user.username : "",
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

/**
 * Retrieves a car by ID and renders the details page.
 */
module.exports.details = async (req, res, next) => {
  try {
    let id = req.params.id;

    let carToShow = await CarModel.findById(id);

    res.render("cars/details", {
      title: "Car Details",
      car: carToShow,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

/**
 * Renders the Add form using the add_edit.ejs template.
 */
module.exports.displayAddPage = (req, res, next) => {
  // Render the add form
  console.log("displayAddPage");
  // const car = new CarModel();
  // console.log("car", car);
  res.render("cars/add_edit", {
    title: "Add a new Car",
    car: null,
    userName: req.user ? req.user.username : "",
  });
};
/**
 * Processes the data submitted from the Add form to create a new car.
 */
module.exports.processAddPage = async (req, res, next) => {
  // Add a new car to the database
  console.log("processAddPage");
  const car = new CarModel(req.body);
  console.log("car", car);
  try {
    await CarModel.create(car);
    res.redirect("/cars/list");
  } catch (error) {
    console.log(error);
    next(error);
  }
};

/**
 * Gets a car by ID and renders the Edit form using the add_edit.ejs template.
 */
module.exports.displayEditPage = async (req, res, next) => {
  // Gets a car by ID and renders the Edit form
  console.log("displayEditPage");
  let id = req.params.id;
  try {
    let carToEdit = await CarModel.findById(id);
    res.render("cars/add_edit", {
      title: "Edit Car Details",
      car: carToEdit,
      userName: req.user ? req.user.username : "",
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

/**
 * Processes the data submitted from the Edit form to update a car.
 */
module.exports.processEditPage = async (req, res, next) => {
  // Processes the data submitted from the Edit form to update a car
  console.log("processEditPage");
  let id = req.params.id;
  try {
    let carToEdit = await CarModel.findById(id);
    carToEdit.set(req.body);
    await carToEdit.save();
    res.redirect("/cars/list");
  } catch (error) {
    console.log(error);
    next(error);
  }
};

/**
 * Deletes a car based on its ID.
 */
module.exports.performDelete = async (req, res, next) => {
  // Deletes a car based on its ID
  console.log("performDelete");
  let id = req.params.id;
  try {
    await CarModel.deleteOne({ _id: id });
    res.redirect("/cars/list");
  } catch (error) {
    console.log(error);
    next(error);
  }
};
