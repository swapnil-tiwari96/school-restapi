const Classes = require("../models/class");

exports.addStudent = (req, res) =>
{
    const classes = new Classes({
        classNames: req.body.classNames,
        name: [
            {
                year: req.body.year,
                class: req.body.class_teacher,
                subject_list: ["Physics", "Maths", "Chemistry", "PT", "Computer", "English"],
                students: req.body.studentID
            }
        ]
    });
    classes.save()
        .then(result => res.status(200).send(result))
        .catch(error => res.status(500).send(error));
}

exports.getAll = (req, res) =>
{
    Classes.find()
        .populate('students')
        .then(result => res.send(result))
        .catch(err => res.send(err))
}

exports.getOne = (req, res) =>
{
    Classes.find({
        'name.students.subject': "Physics"
    }, function (err, system)
    {
        if (err) { console.log(err); }
        else
        {
            res.send(system)
            console.log(system);
        }
    });
}

