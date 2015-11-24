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
    url: 'php/TitleSearch.php',
    dataType: 'text',
    data: {'title': title}
  }).success(function(response){
    retrieveResults(response);
  });
}


function searchISBN(isbn){
  $.ajax({
    type: 'GET',
    url: 'php/searchISBN.php',
    dataType: 'text',
    data: {'isbn': isbn}
  }).success(function(response){
    retrieveResults(response);
  });
}

function retrieveResults(xml){
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
    $html = '<div class="item" onclick="selectBook(W'+$r[$i].isbn[0]+')" id="W'+$r[$i].isbn[0]+'">'+
      '<img class="img" src=""></img>'+
      '<div class="bookInfo">';

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
		loadSellers(response);
	});
}

function loadSellers(response){
  $data=JSON.parse(response);
  if($data.length==0){
    $('#sellers').html('Sorry, no one currently has this book for sale');
  }
  else{
    $.each($data, function(seller, info){
      $price = info['price'];
      $condition = info['condition'];
      $sellerId = info['sellerId'];
      $html='<div class="seller"><p class="price">$'+$price
        +'</p><p class="condition">'+$condition
        +'</p><p><button class="buy" onclick="contactSeller('+$sellerId+')">Contact Seller</button></p></div>';
      $('#sellers').append($html);
    });
  }
}

function contactSeller(id){
  $sellerId = id;
  var buyer = prompt("Please enter your Novell ID");
  $.ajax({
    type: 'POST',
    url: 'php/getEmail.php',
    data: {'sellerId': $sellerId}
  }).success(function(response){
    $sellerEmail=response;
    buyer=buyer+"@scu.edu";
    sendTheMail(buyer, $sellerEmail, 1);
  });
}

function getBookInfo(){
  $title = getUrlParameter('title');
  $author = getUrlParameter('author');
  $isbn = getUrlParameter('isbn');
  $('#title').html($title);
  $('#author').html($author);
  $('#isbn').html($isbn);
}

