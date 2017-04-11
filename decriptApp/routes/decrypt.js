var express = require('express');
var router = express.Router();

const mongo = require('mongoskin');
const crypto = require('crypto');
const algorithm = 'aes256';
const password = 'asaadsaad';
var decMessage='ad';
const db = mongo.db("mongodb://localhost:27017/Assignment7", { native_parser: true });
db.bind('homework7');

router.get('/', function (req, res, next) {
    db.homework7.findOne({}, function (err, item) {
        decMessage = decrypt(item.message);
        res.render('index',{message:decMessage});
        db.close();
    });

    
});

function decrypt(text) {
    
    var decip = crypto.createDecipher(algorithm, password);
    var dec = decip.update(text, 'hex','utf8');
    dec += decip.final('utf8');
    return dec;
}

module.exports = router;