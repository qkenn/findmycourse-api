const { Router } = require('express');
const router = Router();

const controller = require('../controllers/programme.controller');

router.get('/', controller.getAllProgrammes);
router.get('/:id', controller.getSingleProgramme);

module.exports = router;
