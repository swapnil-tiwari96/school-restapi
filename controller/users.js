const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");


exports.signUp = (req, res) =>
{
    User.find({ email: req.body.email })
        .exec()
        .then(user =>
        {
            if (user.length >= 1)
            {
                return res.status(409).json({
                    message: "Mail exists"
                });
            } else
            {
                bcrypt.hash(req.body.password, 10, (err, hash) =>
                {
                    if (err)
                    {
                        return res.status(500).json({
                            error: err
                        });
                    } else
                    {
                        const user = new User({
                            email: req.body.email,
                            password: hash,
                            dateCreate: new Date()
                        });
                        user.save()
                            .then(result =>
                            {
                                console.log(result);
                                res.status(201).json({
                                    message: "User created"
                                });
                            })
                            .catch(err =>
                            {
                                console.log(err);
                                res.status(500).json({
                                    error: err
                                });
                            });
                    }
                });
            }
        });
}

exports.login = (req, res) =>
{
    User.find({ email: req.body.email })
        .exec()
        .then(user =>
        {
            console.log(Math.floor((new Date() - user[0].dateCreate) / (1000 * 60 * 60 * 24)));
            if (user.length < 1 || Math.floor((new Date() - user[0].dateCreate) / (1000 * 60 * 60 * 24)) > 30)
            {
                return res.status(401).json({
                    message: "Auth failed"
                });
            }
            bcrypt.compare(req.body.password, user[0].password, (err, result) =>
            {
                if (err)
                {
                    return res.status(401).json({
                        message: "Auth failed"
                    });
                }
                if (result)
                {
                    const token = jwt.sign(
                        {
                            email: user[0].email,
                            userId: user[0]._id
                        },
                        "secret", //should be saved in an .env file
                        {
                            expiresIn: "1h"
                        }
                    );
                    return res.status(200).json({
                        message: "Auth successful",
                        token: token
                    });
                }
                res.status(401).json({
                    message: "Auth failed"
                });
            });
        })
        .catch(err =>
        {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}

exports.deleteOne = (req, res) =>
{
    User.remove({ _id: req.params.userId })
        .exec()
        .then(result =>
        {
            res.status(200).json({
                message: "User deleted"
            });
        })
        .catch(err =>
        {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}