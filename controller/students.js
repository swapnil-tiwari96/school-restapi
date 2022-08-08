const Student = require("../models/student");

exports.getAll = (req, res) =>
{
    Student.find()
        .exec()
        .then(docs => res.status(200).send(docs)
        )
        .catch(err => res.status(500).send(err))
}

exports.addStudent = (req, res) =>
{
    const student = new Student({
        name: req.body.name,
        dob: req.body.dob
    });
    student.save()
        .then(result => res.status(200).send(result))
        .catch(error => res.status(500).send(error));
}

exports.getOne = (req, res) =>
{
    const id = req.params.orderID;
    res.status(200).send(id);
}

exports.deleteOne = (req, res) =>
{
    const id = req.params.productID;
    Student.deleteOne({ _id: id })
        .exec()
        .then(result => res.status(200).send(result))
        .catch(err => err.status(500).send(err))
}