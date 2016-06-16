var express = require('express');
var router = express.Router();
var fs = require('fs');

function writeFileFn(data, res) {
    fs.writeFile('./items.json', JSON.stringify(data), function (err) {
        if (err) {
            console.error(err.stack);

            return;
        }
        res.status('200').json(data);
    });
}
function updataItem(data, res, req) {
    var flag = 0;
    for (var i = 0; i < data.length; i++) {
        if (parseInt(req.params.id) === data[i]._id) {
            flag = 1;
            data[i].name = req.body.name;
            data[i].barcode = req.body.barcode;
            data[i].unit = req.body.unit;
            data[i].price = req.body.price;
            data[i].count = req.body.count;
            writeFileFn(data[i], res);
        }
    }

    return flag;
}
router.put('/products/:id', function (req, res) {
    fs.readFile('./items.json', 'utf-8', function (err, data) {
        if (err) {
            console.error(err);

            return;
        }
        var data = JSON.parse(data);

        var flag = updataItem(data, res, req);
        if (!flag) {
            res.sendStatus('404');
        }
    });
});
module.exports = router;