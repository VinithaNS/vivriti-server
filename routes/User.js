const express = require("express");
const UserModel = require("../model/UserModel.js");

const User = require("../model/UserModel.js");

const userRouter = express.Router();
// Create/Register New User



userRouter.post("/register", async (req, res) => {
  const { userid, firstname, lastname, mobile, address, department } = req.body;
  const existuser = await User.find({ userid: userid });

  try {
    if (existuser) {
         res.status(201).send({ msg: "User Id Already Exists" });
    } else {
       
         const newUser = new User({
           userid,
           firstname,
           lastname,
           mobile,
           address,
           department,
         });
         newUser.save();
         res.status(200).send({ msg: "User Registered Successfully" });
    }
  } catch (error) {
    res.status(400).send({ msg: error });
  }
});

// Get All User


userRouter.get("/getalluser", async (req, res) => {
  let employee;
  try {
    employee = await UserModel.find();
  } catch (error) {
    return console.log(error);
  }
  if (!employee) {
    return res.status(404).json({ msg: "No Employee found" });
  } else {
    return res.status(200).json({ employee });
  }
});


// Update the userName


userRouter.put("/:id", async (req, res) => {
  const { firstname, lastname } = req.body;
  const userid = req.params.id;
  let employee;
  try {
    employee = await UserModel.findByIdAndUpdate(userid, {
      firstname,
      lastname,
    });
  } catch (error) {
    return console.log(error);
  }
  if (!employee) {
    return res.status(500).json({ msg: "Unable to Update the Employee" });
  } else {
    return res.status(200).json({ employee });
  }
});
// SIngle user

userRouter.get("/:id", async (req, res) => {
  const userid = req.params.id;
  try {
    const employee = await UserModel.findById(userid);
    res.status(200).json(employee);
  } catch (error) {
     res.status(404).json({ message: "Something went wrong" });
  }
})

// Delete the Userid/userName


userRouter.delete("/:id", async (req, res) => {
  const userid = req.params.id;
  let employee;
  try {
    employee = await UserModel.findByIdAndRemove(userid);
  } catch (err) {
    return console.log(err);
  }
  if (!employee) {
    return res.status(500).json({ message: "Unable to delete" });
  }

  return res.status(200).json({ message: "Deleted Successfully" });
});
module.exports = userRouter;
