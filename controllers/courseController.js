const Course = require('../Models/course');

exports.createCourse = async (req, res) => {
    const course = await Course(req.body);

    try {
        const course = await Course(req.body);
        res.status(201).json({
            status: 'succes',
            course
        })
    } catch (error){
        res.status(400).json({
            status: 'fail',
            error
        })
    }
}