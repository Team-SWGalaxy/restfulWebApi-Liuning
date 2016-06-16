var fs = require('fs');
fs.stat('./items.json', function (err, stat) {
    if (!(stat && stat.isFile())) {
        fs.open('./items.json', 'a+', function (err) {
            if (err) {

                return;
            }
            fs.writeFile('items.json', '[]', function (err) {
                if (err) {
                    throw err;
                }
            });
        });
    }
});