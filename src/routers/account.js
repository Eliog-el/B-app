const express = require('express');
const Account = require('../models/account')
const auth = require('../middleware/auth')

const router = new express.Router();


router.post("/accounts/:account", auth, async (req, res) => {
    // const account = new account(req.body);
    const account = new Account({
        ...req.body,
        owner: req.user._id,
        accountNumber: Math.floor(1000000000 + Math.random() * 9000000000),
        openingBalance: 0.0
    })

    try {
        await account.save();
        res.status(201).send(account)
    } catch (e) {
        res.status(500).send(e)
    }
});

router.get('/accounts', auth, async (req, res) => {

    try {
        const accounts = await Account.find({ owner: req.user._id })
        // await req.user.populate('accounts').execPopulate()
        // res.send(req.user.accounts)
        res.send(accounts)
    } catch (e) {
        res.status(500).send()
    }
});


router.get('/accounts/:id', auth, async (req, res) => {
    const _id = req.params.id

    try {
        // const account = await Accouunt.findOne({ _id })
        const account = await Account.findOne({ _id, owner: req.user._id })

        if (!account) {
            return res.status(404).send()
        }

        res.send(account)
    } catch (e) {
        res.status(500).send()
    }
})

router.patch('/accounts/:id', auth, async (req, res) => {
    const _id = req.params.id;


    // allowed to update (property that can be changed)
    const updates = Object.keys(req.body) //convert object into an array of its properties
    const allowedUpdates = ['description', 'completed']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates' })
    }

    try {
        // Find the account
        const account = await Account.findOne({ _id: req.params.id, owner: req.user._id })
        if (!account) {
            return res.status(404).send()
        }

        // update account
        updates.forEach((update) => account[update] = req.body[update])
        await account.save()

        res.send(account)
    } catch (e) {
        res.status(400).send(e)

    }
})

router.delete('/accounts/:id', auth, async (req, res) => {
    const _id = req.params.id;

    try {
        const account = await Account.findOneAndDelete({ _id, owner: req.user._id })

        if (!account) {
            return res.status(400).send()
        }
        res.send(account)
    } catch (error) {
        res.status(500).send(e)
    }
})

module.exports = router