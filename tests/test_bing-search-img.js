var bing = require(__dirname+'/../libs/bing-search-img.js');

if(!process.env.BING_KEY){
  console.error('BING_KEY not exists.');
  process.exit(1);
}
bing.api_key(process.env.BING_KEY);

bing.search('book', function(results){
  console.log(results);
}, function(err){
  console.error(err);
});
