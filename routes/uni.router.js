const { Router } = require('express');
const router = Router();

const controller = require('../controllers/uni.controller');

router.get('/', controller.getAllUnis);
router.get('/:id', controller.getSingleUni);

module.exports = router;
