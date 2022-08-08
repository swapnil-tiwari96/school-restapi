const Student = require("../models/student");

exports.addStudent = (req, res) =>
{
    const student = new Student({
        name: req.body.name,
        dob: req.body.dob,
        sub: [req.body.sub]
    });
    student.save()
        .then(result => res.status(200).send(result))
        .catch(error => res.status(500).send(error));
}

exports.getAll = (req, res) =>
{
    Student.find()
        .populate('product')
        .then(result => res.send(result))
        .catch(err => res.send(err))
}
