function searchISBN(){
  $.ajax({
    type: 'GET',
    url: 'SearchByISBN.php',
    dataType: 'text',
    data: {'isbn': $isbn}
  }).success(function(response){
    $xml=response;
    console.log($xml);
  });
}
function retrieveByISBN(){
  $.ajax({
    type: 'GET',
    url: 'retrieveResults.php',
    data: $xml
  }).success(function(response){
    renderResults(response);
  });
}
function renderResults(response){
  $r = JSON.parse(response);
  $tail='</div></div><hr>';
  for($i = 0; $i<$r.length; $i++){
    $head = '<div class="item" onclick="selectBook(W'+$r[$i].isbn[0]+')" id="W'+$r[$i].isbn[0]+'">'+
      '<img class="img" src=""></img>'+
      '<div class="bookInfo">';
    $html=$head;
    $.each($r[$i], function(key, value){
      if(value[1]){
        $html+=('<p class="'+key+'">'+value[0]+', '+value[1]+'</p>');
      }
      else{
        $html+=('<p class="'+key+'">'+value[0]+'</p>');
      }
    });
    $html+=$tail;
    $('#results').append($html);
  }
}
function selectBook(elem){
  $isbn=elem.getElementsByClassName('isbn')[0].innerHTML;
  $author=elem.getElementsByClassName('author')[0].innerHTML;
  $ed=elem.getElementsByClassName('ed')[0].innerHTML;
  $title=elem.getElementsByClassName('title')[0].innerHTML;
  var info={
    title: $title,
    author: $author,
    ed: $ed,
    isbn: $isbn
  };
  info=JSON.stringify(info);
  window.location.href='book.php?'+info;
  window.location.href="book.php?title=$title&author=$author&ed=$ed&isbn=$isbn";
}
