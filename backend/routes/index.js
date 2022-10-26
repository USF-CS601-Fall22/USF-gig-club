var express = require('express');
var utils = require('../utils/utils');
var router = express.Router();
const { PrismaClient } = require('@prisma/client');
var prisma = new PrismaClient();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/activate/:uuid', async function(req, res, next) {
  try {
    let uuid = req.params.uuid;
    console.log(uuid);
    const user = await prisma.user.findFirst({
        where: {
          activation_key: uuid
        }
      })

      // Find a better way to handle this...
      if(!user){
        throw Error("User not found or invalid activation id")
      }else{
        await prisma.user.update({
          where:{
            id: user.id
          },
          data:{
            is_active: true
          }
        })
      }
    return res.status(201).json(utils.constructSuccessJson({ message: "Email id confirmed. Please login to continue" }));
  } catch (e) {
    console.error(e);
    return res.status(400).json(utils.constructErrorJson("an error occured", e.message));
  }
  
})

module.exports = router;
