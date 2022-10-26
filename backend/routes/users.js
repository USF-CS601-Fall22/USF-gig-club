var express = require('express');
var router = express.Router();
var utils = require('../utils/utils');
var mailer = require('../utils/mailer');

var jwtutils = require('../utils/jwt');

const { PrismaClient } = require('@prisma/client');
var prisma = new PrismaClient();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/signup', async function(req, res, next) {
  try {
    let activation_key = utils.createUniqueUUID();
    const user = await prisma.user.create({
      data: {
        ...req.body,
        activation_key: activation_key,
        password: utils.createHash(req.body.password)
      }
    })
    // Find a better way to handle this...
    var token = jwtutils.createToken(user);
    mailer.sendMail("admin@usfca.edu", user.email, "Email confirmation cglist", "Please click the link to activate your cglist account <a href="+"http://localhost:3000/activate/"+activation_key+">Verify my account</a>");
    res.status(201).json(utils.constructSuccessJson({ token }));
  } catch (e) {
    console.error(e);
    res.status(400).json(utils.constructErrorJson("an error occured", e));
  }
  
})

router.post('/login', async function(req, res, next) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: req.body.email
      }
    });
    if (user) {
      if (utils.verifyHash(req.body.password, user.password)) {
        var token = jwtutils.createToken(user);
        if(!user.is_active){
          return res.status(403).json(utils.constructErrorJson("unauthorized", "Account status inactive. Please activate using the link sent to your email."));
        }
  
        res.status(200).json(utils.constructSuccessJson({ token }));
      } else {
        res.status(401).json(utils.constructErrorJson("unauthorized", "emailid/password is invalid"));
      }
    } else {
      res.status(404).json(utils.constructErrorJson("not found", "user not found"));
    }
  } catch (e) {
    console.error(e);
    return res.status(400).json(utils.constructErrorJson("an error occured", e));
  }
})

module.exports = router;
