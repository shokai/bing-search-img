var qs = require('querystring');
var request = require('request');

exports.api_endpoint = 'http://api.bing.net/json.aspx?';

exports.api_key = function(key){
  exports.__api_key = key;
};

exports.base_query = {
  Version: 2.2,
  Market: 'ja-JP',
  Sources: 'Image',
  'Image.Count': 50,
  'image.Offset': 0,
  'Adult': 'off',
  Query: 'book',
};

exports.request = function(query, callback, errback){
  if(!query) query = {};
  for(var k in exports.base_query){
    if(!query[k]) query[k] = exports.base_query[k];
  };
  query.AppId = exports.__api_key;
  var uri = exports.api_endpoint + qs.stringify(query);
  request(uri, function(err, res, body){
    if(err || res.statusCode != 200){
      if(typeof errback === 'function') errback('HTTP Status ('+res.statusCode+')');
      return;
    }
    try{
      var data = JSON.parse(body);
    }
    catch(e){
      if(typeof errback === 'function') errback('JSON Parse Error');
      return;
    }
    try{
      var results = data.SearchResponse.Image.Results;
    }
    catch(e){
      if(typeof errback === 'function') errback(data.SearchResponse.Errors[0].Message);
      return;
    }
    if(typeof callback === 'function') callback(results);
  });
};

exports.search = function(word, callback, errback){
  exports.request({Query: word}, callback, errback);
};