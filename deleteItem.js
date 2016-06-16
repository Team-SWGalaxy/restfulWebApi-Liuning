var express = require('express');
var router = express.Router();
var fs = require('fs');

function writeFileFn(data, res) {
    fs.writeFile('./items.json', JSON.stringify(data), function (err) {
        if (err) {
            console.error(err.stack);

            return;
        }
        res.sendStatus('204');
    });
}
function deleteItem(data, req, res) {
    var flag = 0;
    for (var i = 0; i < data.length; i++) {
        if (parseInt(req.params.id) === data[i]._id) {
            flag = 1;
            data.splice(i, 1);
            writeFileFn(data,res);

            break;
        }
    }
    return flag;
}
router.delete('/products/:id', function (req, res) {
    fs.readFile('./items.json', 'utf-8', function (err, data) {
        if (err) {
            console.log(err);

            return;
        }
        var data = JSON.parse(data);
        var flag = deleteItem(data, req, res);
        if (!flag) {
            res.status('404').end();
        }
    });
});
module.exports = router;