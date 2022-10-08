const Course = require('../Models/course');
const Category = require('../Models/category');
const User = require('../Models/User');

exports.createCourse = async (req, res) => {

    try {
        const course = await Course.create({
            name:req.body.name,
            description:req.body.name,
            category: req.body.category,
            user: req.session.userID
        })
        if (!course) console.log('not created')
        res.status(201).redirect('/courses');
    } catch (error) {

        console.log(error)

        res.status(400).json({
            status: 'fail'
        });
    }
};

exports.getAllCourses = async (req, res) => {
    try {

        const categorySlug = req.query.categories;
        const category = await Category.findOne({ slug: categorySlug })

        let filter = {};
        if (categorySlug) {
            filter = { category: category._id }
        }
        const courses = await Course.find(filter).sort('-createdAt');//başına - koymamız önemli


        const categories = await Category.find();

        res.status(200).render('courses', {
            courses,
            categories,
            page_name: 'courses',
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            error,
        });
    }
};

exports.getCourse = async (req, res) => {
    try {
        const course = await Course.findOne({ slug: req.params.slug }).populate('user');

        res.status(200).render('course', {
            course,
            page_name: 'course',
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            error,
        });
    }
};

exports.enrollCourse = async (req, res) => {
    try {
        const user = await User.findById(user.session.userID);
        await user.courses.push({_id:req.body.course_id});
        await user.save();


        res.status(200).render('course', {
            course,
            page_name: 'course',
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            error,
        });
    }
};

