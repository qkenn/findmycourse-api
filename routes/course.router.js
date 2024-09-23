const { Router } = require('express');
const router = Router();

const controller = require('../controllers/course.controller');

router.get('/', controller.getAllCourses);
router.get('/:id', controller.getSingleCourse);

module.exports = router;
