
function getResults(){
var keyword = getUrlParameter('srchTerm');
var option = getUrlParameter('searchParam')
if(option=='ISBN'){
  keyword=keyword.replace(/-/g,"");
  searchISBN(keyword);
}
else if(option=='Title'){
  searchByTitle(keyword);
}
}
function searchISBN(isbn){
$.ajax({
  type: 'GET',
  url: 'php/searchISBN.php',
  dataType: 'text',
  data: {'isbn': isbn}
}).success(function(response){
  retrieveByISBN(response);
});
}
function retrieveByISBN(xml){
$.ajax({
  type: 'POST',
  url: 'php/retrieveResults.php',
  data: {'xml': xml}
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
  $title=elem.getElementsByClassName('title')[0].innerHTML;
  var info={
    title: $title,
    author: $author,
    isbn: $isbn
};
info=JSON.stringify(info);
// window.location.href='book.php?'+info;
window.location.href="sellers.html?title="+$title+"&author="+$author+"&isbn="+$isbn;
}
var getUrlParameter = function getUrlParameter(sParam) {
  var sPageURL = decodeURIComponent(window.location.search.substring(1)),
      sURLVariables = sPageURL.split('&'),
      sParameterName,
      i;

  for (i = 0; i < sURLVariables.length; i++) {
      sParameterName = sURLVariables[i].split('=');

      if (sParameterName[0] === sParam) {
          return sParameterName[1] === undefined ? true : sParameterName[1];
      }
  }
};
function getSellers(isbn){
		$.ajax({
		type: "GET",
		url: "php/getSellers.php",
		data: { 'isbn': isbn.toString() }
	}).success(function(response){
		// readSellers(response);
	});
}

function contactSeller(id){
  $sellerId = id;
  $.ajax({
    type: 'POST',
    url: 'php/getEmail.php',
    data: {'sellerId': $sellerId}
  }).success(function(response){
    $seller=response;
    console.log($seller);
    sendTheMail('lrwong@scu.edu', $sellerId, 1);
  });
}
