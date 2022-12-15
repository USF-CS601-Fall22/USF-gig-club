var express = require('express');
var router = express.Router();
var utils = require('../utils/utils');
var mailer = require('../utils/mailer');

var jwtutils = require('../utils/jwt');

const { PrismaClient } = require('@prisma/client');
var prisma = new PrismaClient();


router.get('/', async function(req, res, next) {

    
    const user = await prisma.user.findFirst({
        where: {
          email: req.body.email
        },
        include: {
            notifications: true
        }

      });


    if(user){       
        res.status(200).json(utils.constructSuccessJson({ user }));
    }
    else{
        res.status(404).json(utils.constructErrorJson("not found", "user not found"));
    }

});

router.post('/create', async function(req, res, next) {

    console.log(req.user);
    if(!req.user.is_admin){
        return res.status(401).json(utils.constructErrorJson("unauthorized", "only admin can send the notifications"));
    }

    let notification = null;
    let payload = req.body;

    if(payload.to == "*"){
        // send the notification to everyone

        const users = await prisma.user.findMany({
            include: {
                notifications: true
            }
        });
        users.forEach(async function(user){
            notification = await prisma.notifications.create({
                data: {
                    text: payload.text,
                    User: {
                        connect: {
                            email: user.email
                        }
                    }
                }
            });
        });
    }
    else {
        // send the notification to a specific user
        const user = await prisma.user.findFirst({
            where: {
                email: payload.to
            },
            include: {
                notifications: true
            }
        });
        if(user){
            notification = await prisma.notifications.create({
                data: {

                    text: payload.text,

                    User: {
                        connect: {
                            email: user.email
                        }
                    }
                }
            });
        }
    }

    // success response
    res.status(201).json(utils.constructSuccessJson({ notification }));

});

router.patch('/update',async function(req, res, next) {



    // update a notification for a user
    const notification = await prisma.notifications.update({
        where: {
            id: req.body.id
        },
        data: {
            seen : req.body.seen
        }
    });


    res.status(200).json(utils.constructSuccessJson({ notification }));
    
});

  
module.exports = router;
