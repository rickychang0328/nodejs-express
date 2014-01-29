var vcard;
var fs = require('fs');
var path = require('path');
//readfile 範例
//讀取JSON FILE,第二個參數是非同步處理,會在檔案讀完後再進行匿名函數裡的動作
fs.readFile(path.join(__dirname, '/db.json'), function(err, data) {
    vcard = JSON.parse(data);
});

exports.create = function(req, res){
	var person = {
		nickname: "",
		name: "",
		tel: ""
	};

	person.nickname = req.params.nickname;

	person.tel =  req.query.tel;
	person.name = req.query.name;

	vcard.push(person);
	console.log('create success');
	res.end();
};

exports.read = function(req, res){
	res.send(vcard);
	res.end();
};

exports.update = function(req, res){
	var nickname = req.params.nickname;

	vcard.forEach(function (entry) {
		if (entry.nickname === nickname) {
			console.log('found!');

			entry.name =  req.query.name;
			entry.tel =  req.query.tel;
		}
	});
	//一定要下response.end,不然瀏覽器不會結束請求
	res.end();
};

exports.delete = function(req, res){
	var idx = 0;
	var nickname = req.params.nickname;
	vcard.forEach(function (entry) {
		var selectedidx = 0;
		if (entry.nickname === nickname) {
			console.log('found!');
			idx = selectedidx;
			entry.name =  req.query.name;
			entry.tel =  req.query.tel;
		}
		selectedidx++;
	});
	vcard.splice(idx,1);
	res.end();
};

exports.upload = function(req, res) {
    var fs = require('fs');
    var path = require('path');
    var filename = req.params.nickname + '.jpg';
    var type = req.params.type;   // 'photo' or 'voice'

    fs.readFile(req.files.file.path, function (err, data) {
        var newPath = path.join(__dirname, '../frontend/', 'uploads',  filename);

        fs.writeFile(newPath, data, function (err) {
            if (err) {
                res.json({status: 'error', message: err});
            } else {
                res.json({status: 'ok'});
            }
        });
    });
};
