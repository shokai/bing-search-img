var bing = require(__dirname+'/../libs/bing-search-img.js');

bing.api_key(process.env.BING_KEY);

bing.search('book', function(results){
    console.log(results);
}, function(err){
    console.error(err);
});
