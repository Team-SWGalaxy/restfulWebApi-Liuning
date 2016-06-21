var express = require('express');
var router = express.Router();
var fs = require('fs');

router.get('/products', function (req, res, next) {

    fs.readFile('./items.json', 'utf-8', function (err, data) {
        if (err) {
            return next(err);
        }
        var data = JSON.parse(data);
        res.status('200').send(data);
    });
});
router.use(function (err, req, res, next) {
    console.error(err);
    res.status('404').send();
});

module.exports = router;