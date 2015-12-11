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
      $html='<div class="seller" id="'+$sellerId+'"><p class="price">$'+$price
        +'</p><p class="condition">'+$condition
        +'</p><p><button class="buy" onclick="contactSeller(\''+$sellerId+'\')">Contact Seller</button></p></div>';
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