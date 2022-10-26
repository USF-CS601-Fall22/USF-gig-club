var express = require('express');
var router = express.Router();
var utils = require('../utils/utils');
const { PrismaClient } = require('@prisma/client');
var prisma = new PrismaClient();

router.get('/', async function(req, res, next) {
    try {
        var page = +req.query.page - 1;
        var size = +req.query.size;
        var offset = page * size;
        const classifieds = await prisma.classified.findMany({
            skip: offset,
            take: size,
            include: {
                createdBy: true
            }
        });
        res.status(200).json(utils.constructSuccessJson({ classifieds }));
    } catch(e) {
        console.error(e);
        res.status(400).json(utils.constructErrorJson("failed to fetch classifieds", e));
    }
});

router.post('/', async function(req, res, next) {
    try {
        const classified = await prisma.classified.create({
            data: {
                ...req.body,
                createdBy: {
                    connect: {
                        id: req.user.id
                    }
                }
            }
        })
        res.status(201).json(utils.constructSuccessJson({ classified }));
    } catch (e) {
        console.error(e);
        res.status(400).json(utils.constructErrorJson(e));
    }
});

router.get('/:id', async function (req, res, next) {
    try {
        const classified = await prisma.classified.findUnique({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json(utils.constructSuccessJson({ classified }));
    } catch (e) {
        console.error(e);
        res.status(404).json(utils.constructErrorJson("failed to fetch classified", e));
    }
})

router.put('/:id', async function (req, res, next) {
    try {
        const updateClassified = await prisma.classified.update({
            where: {
                id: req.params.id
            },
            data: {
                ...req.body
            }
        });
        res.status(200).json(utils.constructSuccessJson({ updateClassified }));
    } catch (e) {
        console.error(e);
        res.status(400).json(utils.constructErrorJson("failed to update classified", e))
    }
})

router.delete('/:id', async function (req, res, next) {
    try {
        const deleteClassified = await prisma.classified.delete({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json(utils.constructSuccessJson({ deleteClassified }));
    } catch (e) {
        console.error(e);
        res.status(400).json(utils.constructErrorJson("failed to delete classified", e));
    }
})

module.exports = router;
