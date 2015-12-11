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
    if(!validate()){
      return 'error';
    }
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
        sendTheMail(null , info.email, 0, id);
      //enable the submit button
      }
      else {
        alert(response);
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
    if(response==='success'){
      alert('Your book has been listed for sale!');
      window.location.href = "index.html";
    }
    else{
      alert('Error, the verification code does not match. Please try again.');
    }
  });


}
