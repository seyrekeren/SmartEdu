const Course = require('../Models/course');
const Category = require('../Models/category');

exports.createCourse = async (req, res) => {

    try {
        const course = await Course.create(req.body)
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
        const course = await Course.findOne({ slug: req.params.slug });

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

