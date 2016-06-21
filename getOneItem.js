var express = require('express');
var router = express.Router();
var fs = require('fs');

function getOneItem(res, req, data) {
    for (var i = 0; i < data.length; i++) {
        if (parseInt(req.params.id) === data[i]._id) {

            var item = data[i];
            res.status('200').send(item);

            return;
        }
    }
    res.sendStatus('404');
}

router.get('/products/:id', function (req, res) {

    fs.readFile('./items.json', 'utf-8', function (err, data) {
        if (err) {
            console.error(err.stack);

            return;
        }

        var data = JSON.parse(data);
        getOneItem(res, req, data);
    });
});
router.use(function (err, req, res, next) {
    console.error(err);
    res.status('404').send();
});
module.exports = router;