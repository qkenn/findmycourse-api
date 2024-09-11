const { Router } = require('express');
const router = Router();

const controller = require('../controllers/uni.controller');

router.get('/', controller.getUnis);
router.get('/:id', controller.getSingleUni);

module.exports = router;
