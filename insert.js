var express = require('express');
var router = express.Router();
var fs = require('fs');

var max = 1;

function lackProtery(req) {
    return !(req.body.hasOwnProperty('barcode') && req.body.hasOwnProperty('name') && req.body.hasOwnProperty("unit") && req.body.hasOwnProperty("price") && req.body.hasOwnProperty("count"));
}
function errType(req) {
    return !(typeof req.body.barcode === 'string' && typeof req.body.name === 'string' && typeof req.body.unit === 'string' && typeof req.body.price === 'number' && typeof req.body.count === 'number');
}
function getItem(req) {
    return {
        "barcode": req.body.barcode,
        "name": req.body.name,
        "unit": req.body.unit,
        "price": req.body.price,
        "count": req.body.count,
        "_id": max++
    };
}
function writeFile(data, res, req) {
    var item = getItem(req);
    data.push(item);
    fs.writeFile('./items.json', JSON.stringify(data), function (err) {
        if (err) {
            res.sendStatus('404');

            return;
        }
        res.status('201').send(item);

    });
}
function insert(data, res, req) {
    if (lackProtery(req)) {
        res.sendStatus('400');

        return;
    }
    else if (errType(req)) {
        res.sendStatus('408');

        return;
    }
    writeFile(data, res, req);
}
router.post('/products', function (req, res) {
    fs.readFile('./items.json', 'utf-8', function (err, data) {
        if (err) {
            res.sendStatus('401');

            return;
        }
        var data = JSON.parse(data);

        insert(data, res, req);
    });
});

module.exports = router;