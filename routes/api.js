var vcard;

exports.create = function(req, res){
	var model = req.app.db.model;

	var person = {
		"nickname": req.query.nickname,
		"name": req.query.name,
		"tel": req.query.tel
	};

	var card = new model(person);
	card.save();

	res.end();
};

exports.read = function(req, res){
	var model = req.app.db.model;

	var vcard = model.find({}, function(err, vcard) {
		res.send(vcard);
		res.end();
	});
};

exports.update = function(req, res){
	var nickname = req.params.nickname;
	var model = req.app.db.model;
	// model.findOneAndUpdate({"nickname":nickname}, { $set: { "name": req.params.name,"tel":req.params.tel }}, {upsert: true},  function () {
 //  		// if (err) return handleError(err);
 //  		// removed!
	// });
	model.findOne({"nickname":nickname}, function (err, doc) {
   if (err)return handleError(err);
    // console.log("name:"+doc.name+";req.params.name:"+req.query.name);
  doc.name = req.query.name;
  doc.tel = req.query.tel;
  doc.save();
})
	res.end();
};

exports.delete = function(req, res){
	var model = req.app.db.model;
	model.remove({ "nickname": req.params.nickname }, function (err) {
  		if (err) return handleError(err);
  		// removed!
	});
	res.end();
};

exports.upload = function(req, res) {

    var type = req.params.type;   // 'photo' or 'voice'
    var ext;

    switch (type) {
        case 'photo':
            ext = '.jpg';
            break;
        case 'voice':
            ext = '.mp3';
            break;
    }

    var filename = req.params.nickname + ext;
    var newPath = path.join(__dirname, '../frontend/uploads', filename);

    req.busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
        var wstream = fs.createWriteStream(newPath);
        file.pipe(wstream);
    });

    req.busboy.on('end', function() {
        res.json({status: 'ok'});
        res.end();
    });
};
