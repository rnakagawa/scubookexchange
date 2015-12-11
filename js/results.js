function getResults(){
  var keyword = getUrlParameter('srchTerm');
  var option = getUrlParameter('searchParam')
  if(option=='ISBN'){
    keyword=keyword.replace(/-/g,"");
    keyword=keyword.replace(/ /g,"");
    searchISBN(keyword);
  }
  else if(option=='Title'){
    searchTitle(keyword);
  }
}

function searchTitle(title){
  $.ajax({
    type: 'GET',
    url: 'http://students.engr.scu.edu/~lwong/coen168/scubookexchange/php/TitleSearch.php',
    dataType: 'text',
    data: {'title': title}
  }).success(function(response){
    retrieveResults(response);
  });
}


function searchISBN(isbn){
  $.ajax({
    type: 'GET',
    url: 'http://students.engr.scu.edu/~lwong/coen168/scubookexchange/php/searchISBN.php',
    dataType: 'text',
    data: {'isbn': isbn}
  }).success(function(response){
    retrieveResults(response);
  });
}
function retrieveResults(xml){
  $.ajax({
    type: 'POST',
    url: 'http://students.engr.scu.edu/~lwong/coen168/scubookexchange/php/retrieveResults.php',
    data: {'xml': xml}
  }).success(function(response){
    renderResults(response);
  });
}

function renderResults(response){
  $r = JSON.parse(response);
  $tail='</div></div><hr>';
  for($i = 0; $i<$r.length; $i++){
    $isbn = $r[$i].isbn[0];
    $author= $r[$i].author;
    $image = $r[$i].image[0];
    $edition = $r[$i].edition;
    $html = '<div class="item" onclick="selectBook(W'+$r[$i].isbn[0]+')" id="W'+$r[$i].isbn[0]+'">'+
      '<img class="img" src="' + $r[$i].image[0]+ '"></img>'+
      '<div class="bookInfo">';

    $.each($r[$i], function(key, value){
      if(key != 'image'){
        if(value[1]){
          $html+=('<p class="'+key+'">'+value[0]+', '+value[1]+'</p>');
        }
        else{
          $html+=('<p class="'+key+'">'+value[0]+'</p>');
        }
      }
    });

    $html+=$tail;
    $('#results').append($html);
  }
}

function selectBook(elem){
  $isbn=elem.getElementsByClassName('isbn')[0].innerHTML;
  $author=elem.getElementsByClassName('author')[0].innerHTML;
  $edition = elem.getElementsByClassName('ed')[0].innerHTML;
  $title=elem.getElementsByClassName('title')[0].innerHTML;
  window.location.href="sellers.html?title="+$title+"&author="+$author+"&edition="+$edition+"&isbn="+$isbn;
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