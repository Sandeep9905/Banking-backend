const express = require('express');
const router = express.Router({mergeParams:true});
const {createTransiction ,getTransicition } = require('../handlers/transiction');

router.route("/").post(createTransiction);

router.route("/")
      .get(getTransicition);
      
module.exports = router;