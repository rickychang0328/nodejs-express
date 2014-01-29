
/*
 * GET users listing.
 */

exports.list = function(req, res){
  res.send("respond with a resource");
};
exports.info = function(req, res){
  //res.send("respond with a resource:"+req.params.username);
  res.render('info',{username:req.params.username});
  // console.log(req.params.username);
  // var obj = { 
  // 	username:req.params.username
  // };
  // req.send(obj);
};