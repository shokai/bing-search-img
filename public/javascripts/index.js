$(function(){
  $('#sample input[name=search]').click(search);
  $('#sample input[name=word]').keydown(function(e){
    if(e.keyCode === 13) search();
  });
});

var search_status = new function(){
  var dom = $('#sample #status');
  this.show = function(message){
    dom.html(message || '');
  };
  this.hide = function(){
    dom.html('');
  };
}();

var search = function(word){
  if(!word) word = $('#sample input[name=word]').val();
  if(word.length < 1) return;
  search_status.show('search ...');
  $.getJSON('/search.json?word='+word+'&callback=?', function(res){
    var result = $('#sample ul.result');
    search_status.hide();
    result.html('');
    for(var i = 0; i < res.length; i++){
      var img = res[i];
      result.append($('<li>').append(
        $('<a>').attr('href', img.link).append(
          $('<img>').attr('src', img.thumb).attr('alt', img.text).attr('title', img.text)
        )
      ));
    }
  });
};
