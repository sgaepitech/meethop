const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
require('../models/event.model');
require('../models/category.model');
const Event = mongoose.model('Event');
const Category = mongoose.model('Category');
const authevent = require('../auth/event.validator');
const auth = require("../auth/auth");

mongoose.set('useFindAndModify', false);

router.post("/create", async (req, res) =>{
  Category.findOne(
    {name: req.body.name}
  )
  .then (category =>{
    if(category) {
      return res.status(400).json({name: 'Category already exists'});

    } else{
      const newCategory = new Category({
        name: req.body.name
      })
      .save()
      .then(category => res.json(category))
      .catch(err => console.log(err));
    }
  })
});

router.get("/read", auth, async (req, res) => {
    const category = await Category.findOne({name: req.body.name});
    res.json(user);
});

router.put("/update", auth, (req, res, next) => {
  Category.findById(req.body, (err, category) =>{
    if(err)
      return next(err);
    else {
      if (req.body.name) {category.name = req.body.name;}
      category.save();
      res.status(200).json(category)
    }
  })
})

router.delete("/delete", auth, (req, res, next) => {
  Category.findByIdAndRemove(req.body._id, (err, category) => {
    if (err)
      return next(err);
    else {
      res.status(200).json({msg: category});
    }
  })
})

router.get("/:category", auth, (req, res, next) => {
  Event.find({category: req.params.category}, (err, events) =>{
    if(err){
      console.log(err);
    } else {
      res.json(events)
    }
  })
})

router.get("/all", auth, (req, res) =>{
  Category.find((err, cat) =>{
    if(err){
      console.log(err);
    } else {
      res.json(cat);
    }
  })
})

module.exports = router;
