
var bing = require(process.env.PWD+'/libs/bing-search-img.js');
if(!process.env.BING_KEY){
  console.error('BING_KEY not exists');
  process.exit(1);
}
bing.api_key(process.env.BING_KEY);

exports.search = function(req, res){
  var word = req.query.word || 'book';
  bing.search(word, function(results){
    res.contentType('application/json');
    if(req.query.callback){
      res.send(req.query.callback+'('+JSON.stringify(results)+')');
    }
    else res.send(JSON.stringify(results), 200);
  }, function(err){
    res.send(err, 500);
  });
};
