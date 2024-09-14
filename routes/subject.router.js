const { Router } = require('express');
const router = Router();

const controller = require('../controllers/subject.controller');

router.get('/', controller.getAllSubjects);
router.get('/:id', controller.getSingleSubject);

module.exports = router;
