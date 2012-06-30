var cache = require('memory-cache');
var bing = require(process.env.PWD+'/libs/bing-search-img.js');
if(!process.env.BING_KEY){
  console.error('BING_KEY not exists');
}
bing.api_key(process.env.BING_KEY);

exports.search = function(req, res){
  var word = req.query.word || 'book';

  var send_response = function(results){
    res.contentType('application/json');
    if(req.query.callback){
      res.send(req.query.callback+'('+JSON.stringify(results)+')');
    }
    else res.send(JSON.stringify(results), 200);
  };

  var cached_results = cache.get(word);
  if(cached_results){
    send_response(cached_results);
  }
  else{
    bing.search(word, function(results){
      send_response(results);
      cache.put(word, results, 3600*6*1000);
    }, function(err){
      res.send(err, 500);
    });
  }
};
