var express = require('express');
var router = express.Router();
var utils = require('../utils/utils');
const { PrismaClient } = require('@prisma/client');
var prisma = new PrismaClient();

router.get('/:classifiedid', async function(req, res, next) {
    try {
        var page = +req.query.page - 1;
        var size = +req.query.size;
        var offset = page * size;
        const comments = await prisma.comment.findMany({
            skip: offset,
            take: size,
            where: {
                classifiedId: req.params.classifiedid
            }
        });
        res.status(200).json(utils.constructSuccessJson({ comments }));
    } catch (e) {
        console.error(e);
        res.status(400).json(utils.constructErrorJson("failed to fetch comments", e));
    }
})

router.post('/:classifiedid', async function(req, res, next) {
    try {
        const comment = await prisma.comment.create({
            data: {
                ...req.body,
                classified: {
                    connect: {
                        id: req.params.classifiedid
                    }
                },
                createdBy: {
                    connect: {
                        id: req.user.id
                    }
                }
            }
        })
        res.status(201).json(utils.constructSuccessJson({ comment }));
    } catch (e) {
        console.error(e);
        res.status(400).json(utils.constructErrorJson("failed to create a comment", e));
    }
})

router.put('/:classifiedid/:id', async function(req, res, next) {
    try {
        const updateComment = await prisma.comment.update({
            where: {
                id: req.params.id,
            },
            data: {
                ...req.body
            }
        });
        res.status(200).json(utils.constructSuccessJson({ updateComment }));
    } catch (e) {
        console.error(e);
        res.status(400).json(utils.constructErrorJson("failed to update comment", e));
    }
})

router.delete('/:classifiedid/:id', async function(req, res, next) {
    try {
        const deleteComment = await prisma.comment.delete({
            where: {
                id: req.params.id,
                classifiedId: req.params.classifiedid
            }
        })
        res.status(200).json(utils.constructSuccessJson({ deleteComment }));
    } catch (e) {
        console.error(e);
        res.status(400).json(utils.constructErrorJson("failed to delete comment", e));
    }
})

module.exports = router;