const express = require('express');
const router = express.Router();

router.use('/files', require('./api/file.route'));

module.exports = router;
