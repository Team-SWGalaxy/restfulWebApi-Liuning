var express = require('express');
var router = express.Router();
var fs = require('fs');

router.get('/products', function (req, res) {

    fs.readFile('./items.json', 'utf-8', function (err, data) {
        if (err) {
            console.error(err.stack);

            return;
        }
        var data = JSON.parse(data);
        res.status('200').send(data);
    });
});
module.exports=router;