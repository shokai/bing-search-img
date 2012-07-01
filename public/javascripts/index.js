$(function(){
  $('#sample input[name=search]').click(function(e){
    var word = $('#sample input[name=word]').val();
    if(word.length < 1) return;
    console.log('search '+ word);
    $.getJSON('/search.json?word='+word+'&callback=?', function(res){
      var result = $('#sample ul.result');
      result.html('');
      for(var i = 0; i < res.length; i++){
        var img = res[i];
        result.append($('<li>').append(
          $('<a>').attr('href', img.Url).append(
            $('<img>').attr('src', img.Thumbnail.Url).attr('alt', img.Title).attr('title', img.Title)
          )
        ));
      }
    })
  });
});