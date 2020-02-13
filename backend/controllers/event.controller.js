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
            participantsNumber: req.body.participantsNumber,
            time: req.body.time

    });

    newEvent
        .save()
        .then(event => res.json(event))
        .catch(err => console.log(err));
});

router.get("/", auth, (req, res) => {
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



router.get("/id/:id", auth, (req, res) =>{

  Event.findById((req.params.id), (err, events) =>{

    if(err){
      console.log(err);
    } else {
      res.json(events)
    }
  })
})

router.get("/participating", auth, (req, res) =>{
  Event.find({participants : req.user._id}, (err, events)=>{
    if(err){
      console.log(err);
    }else {
      res.json(events)
    }
  })
})


router.get("/postulating", auth, (req, res) =>{
  Event.find({waitingList : req.user._id}, (err, events)=>{
    if(err){
      console.log(err);
    }else {
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
      if(req.body.time) {event.time = req.body.time;}
      event.save();
      res.status(200).json(event)
    }
  })
})

router.delete("/delete/:id", auth, (req, res, next) =>{
  Event.findByIdAndRemove(req.params.id, (err, ev) => {
      if (err)
          return next(error);
      else {
          res.status(200).json({msg: ev});
      }
  });
});


router.put("/postulate/:id", auth, (req, res, next) =>{
  Event.findById(req.params.id, (err, event) =>{
    if(err)
      return next(err);

    var postulantExists = event.waitingList.some((postulant) =>{
      return postulant && postulant.equals(req.user._id)
    });

    if (!postulantExists) {
      if (event.participants.length >= event.participants_number)
          return('Event already full');

      const User = mongoose.model('User');
      User.findById(req.user._id, (err, lol) => {
      });

      var objectId = mongoose.Types.ObjectId;
      event.waitingList.push(req.user._id)
      event.save()
      .then((ev) => {
        res.json(ev)
      }).catch((err) =>{
        res.status(500).send('Error : cannot add postulant');
      });
    } else
      res.status(400).send('already postulating');
  })
});


router.put("/unpostulate/:id", auth, (req, res) =>{
  Event.findById(req.params.id, (err, event) =>{
    if(err)
      return next(err);
    else {
      event.waitingList.splice(event.waitingList.indexOf(req.user._id))
      event.save()
      .then((event) =>{
        res.status(200).json(event)
      }).catch((err) => {
        res.status(500).send('unpostulate failed')
      })
    }
  });
})

router.put("/validate/:id", auth, (req, res, next) =>{
  Event.findById(req.params.id, (err, event) =>{
    if(err)
      return next(err);

    var participantExists = event.participants.some((part) =>{
      return part && part.equals(req.body._id)
    });

    if (!participantExists) {
      if(event.participants.length >= event.participants_number)
        return('Event already full');
      event.participants.push(req.body._id)
      event.waitingList.splice(event.waitingList.indexOf(req.body._id))
      event.save()
      .then((event) => {
        res.status(200).json(event)
      }).catch((err) => {
        res.status(500).send('participation failed')
      });
    }
    else
      res.status(400).send('already participating');
  });
});

router.put("/unvalidate/:id", auth, (req, res) =>{
  Event.findById(req.params.id, (err, event) =>{
    if(err)
      return next(err);
    else {
      event.participants.splice( event.participants.indexOf(req.body._id), 1 )
      event.waitingList.push(req.body._id)

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
