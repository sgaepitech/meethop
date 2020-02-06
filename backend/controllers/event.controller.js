const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
require('../models/event.model');
const Event = mongoose.model('Event');
const authevent = require('../auth/event.validator');
const auth = require("../auth/auth");

mongoose.set('useFindAndModify', false);


// ################
// # CREATE EVENT #
// ################

router.post("/create", auth, (req, res) => {
    const { errors, isValid } = authevent(req.body);

    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const newEvent = new Event({
            title: req.body.title,
            description: req.body.description,
            category: req.body.category,
            owner: req.user._id,
            date: req.body.date,
            participantsNumber: req.body.participantsNumber

    });

    newEvent
        .save()
        .then(event => res.json(event))
        .catch(err => console.log(err));
});

router.get("/", auth, (req, res) => {
  console.log('retour de /')
  Event.find((err, events) => {
    if(err){
      console.log(err);
    }else {
      res.json(events);
    }
  });
});

router.get("/owner", auth, (req, res) =>{
  Event.find({owner: req.user._id}, (err, events) => {
    if (err){
      console.log(err);
    } else {
      res.json(events)
    }
  })
})

router.get("/:category", auth, (req, res) =>{
  console.log(req.params.category);
  Event.find({category: req.params.category}, (err, events) =>{
    if(err){
      console.log(err);
    } else {
      res.json(events)
    }
  })
})

router.put("/edit/:id", auth, (req, res, next) =>{
  Event.findById(req.params.id, (err, event) => {
    if (err)
      return next(err);
    else {
      if(req.body.title) {event.title = req.body.title;}
      if(req.body.description) {event.description = req.body.description;}
      if(req.body.category) {event.category = req.body.category;}
      if(req.user._id) {event.owner = req.user._id;}
      if(req.body.date) {event.date = req.body.date;}
      event.save();
      res.status(200).json(event)
    }
  })
})

router.put("/postulate/:id", auth, (req, res, next) =>{
  Event.findById(req.params.id, (err, event) =>{
    if(err)
      return next(err);
    else {
      if (event.waitingList.some((waiter) =>{
        if (waiter){
          console.log('waiter boucle')
        return waiter.equals(req.user._id)
      }
      else return false;
}
)
         == true){
          res.status(400).send('already postulating');
        }


      else{
        if(event.participants.length >= event.participants_number)
            return('Event already full')
        else{
          event.waitingList.push(req.user._id)
          event.save()
          .then((user) => {
                  res.json(user)
                })
          .catch((err) =>{
              console.log(err)
          })
        }

          }
        }
      })
    });


router.put("/unpostulate/:id", auth, (req, res) =>{
  Event.findById(req.params.id, (err, event) =>{
    if(err)
      return next(err);
    else {
      event.waitingList.splice(event.waitingList.indexOf(req.user._id))
    }
  });
})

router.put("/validate/:id", auth, (req, res, next) =>{
  Event.findById(req.params.id, (err, event) =>{
    if(err)
      return next(err);
    else {
      if (event.participants.some((part) =>{
        return part.equals(req.params.id)}) == true)
        res.status(400).send('already participating');

      else{
        if(participants.length >= participants_number)
            return('Event already full')
        else{
          event.participants.push(req.user._id)
          event.waitingList.splice(event.waitingList.indexOf(req.params.id))
          event.save()

  .then((event) => {
        res.status(200).json(user)
      })
  .catch(err =>{
        res.status(400).send('participation failed')
      });
    }}}
  })
})

router.put("/unvalidate/:id", auth, (req, res) =>{
  Event.findById(req.params.id, (err, event) =>{
    if(err)
      return next(err);
    else {
      event.participants.splice( event.participants.indexOf(req.params.id), 1 )
      event.waitingList.push(req.params.id)

          event.save()
          .then((event) => {
            res.status(200).json(event)
          })
          .catch(err =>{
            res.status(400).send('unvalidate non successful')
          });
        }
  })
})

module.exports = router;
