const Course = require('../Models/course');

exports.createCourse = async (req, res) => {

    try {
        const course = await Course.create(req.body)
        if (!course) console.log('not created')
        res.status(201).json({
            status: 'success',
            course
        });
    } catch (error) {

        console.log(error)

        res.status(400).json({
            status: 'fail'
        });
    }
};

exports.getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find();

        res.status(200).render('courses', {
            courses,
            page_name: 'courses',
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            error,
        });
    }
};