const express = require('express');

const router = express.Router();

router.post('/signup', (req, res) => {
    res.send('Signup page');
});



module.exports = router;