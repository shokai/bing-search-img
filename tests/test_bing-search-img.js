var bing = require(__dirname+'/../libs/bing-search-img.js');

bing.app_id('C961552C19FAC149BBFD96AFDEF2385A7EEC5994');

bing.search('book', function(results){
    console.log(results);
}, function(err){
    console.error(err);
});
