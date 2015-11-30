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

function getSellers(isbn){
		$.ajax({
		type: "GET",
		url: "http://students.engr.scu.edu/~lwong/coen168/scubookexchange/php/getSellers.php",
		data: { 'isbn': isbn.toString() }
	}).success(function(response){
		loadSellers(response);
	});
}

function loadSellers(response){
  $data=JSON.parse(response);
  if($data.length==0){
    $('#sellers').html('Sorry, no one currently has this book for sale.');
    $('#sellers').css({'text-align': 'center', 'font-size': '14pt', 'padding-top': '10px'});
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
    url: 'http://students.engr.scu.edu/~lwong/coen168/scubookexchange/php/getEmail.php',
    data: {'sellerId': $sellerId}
  }).success(function(response){
    $sellerEmail=response;
    buyer=buyer+"@scu.edu";
    sendTheMail(buyer, $sellerEmail, 1, null);
  });
}

function getBookInfo(){
  $title = getUrlParameter('title');
  $author = getUrlParameter('author');
  $isbn = getUrlParameter('isbn');
  $edition = getUrlParameter('edition')
  $('#title').html($title);
  $('#author').html($author);
  $('#edition').html($edition);
  $('#isbn').html($isbn);
}


function checkAmazon(){
  if(document.forms.length){
    var form = document.forms[0];
    var isbn = form.elements["isbnInput"].value;
    isbn=isbn.replace(/-/g,"");
  }
  $.ajax({
    type: 'GET',
    url: 'http://students.engr.scu.edu/~lwong/coen168/scubookexchange/php/searchISBN.php',
    dataType: 'text',
    data: {'isbn': isbn}
  }).success(function(response){
    handleAmazonCheck(response);
  });
}

function handleAmazonCheck(xml){
  $.ajax({
    type: 'POST',
    url: 'http://students.engr.scu.edu/~lwong/coen168/scubookexchange/php/retrieveResults.php',
    data: {'xml': xml}
  }).success(function(response){
    foundOrNot(response);
  });
}

function foundOrNot(response){
  var num = JSON.parse(response);
  var id=makeid();
  //not found so redirect to different page
  if (num.length == 0) {
    window.location.href = "ISBNnotfound.html";
  }
  //found book so grab content, insert into temp table and send verification code
  else {
    //grab data from 'num' variable to enter into temp table
    var info={
      title: num[0].title[0],
      authorOne: num[0].author[0],
      authorTwo: num[0].author[1],
      isbn: num[0].isbn[0],
      edition: num[0].ed[0],
      id: id,
      condition: $('#condition').val(),
      email: $('#email').val()+"@scu.edu",
      price: $('#price').val(),
      postDate: new Date().getTime()
    };
    $.ajax({
      type: 'POST',
      url: 'http://students.engr.scu.edu/~lwong/coen168/scubookexchange/php/insertTemp.php',
      data: {'info': info}
    }).success(function(response){
      if(response=='success'){
        sendTheMail('' , info.email, 0, id);
      //enable the submit button
      }
      else {
        alert(repsonse);
      }
    });
  }
}

function matchVCode(){
  $check = $('#vCode').val();
  $.ajax({
    type: 'GET',
    url: 'http://students.engr.scu.edu/~lwong/coen168/scubookexchange/php/matchVCode.php',
    data: {'code': $check}
  }).success(function(response){
    if(response==='true'){
      alert('Your book has been listed for sale!');
    }
    else{
      alert('Error, the verification code does not match. Please try again.');
    }
  })

}
