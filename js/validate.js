
function validate(){
  if(isNotValidISBN()){
    alert( "Please provide a valid ISBN-13!" );
    document.sub.isbnInput.focus();
    return false;
  }
  else if(noOptionSelected(1)){
    alert( "Please provide the book condition!" );
    document.sub.condition.focus();
    return false;
  }
  else if(document.sub.email.value == ""){
    alert( "Please provide your email" );
    document.sub.email.focus() ;
    return false;
  }
  else if(notPrice(1)){
    alert( "Please provide a price!" );
    document.sub.price.focus() ;
    return false;
   }
   else{
     return true;
   }
}

function validateNotFound(){
  if(document.subNotFound.title.value == ""){
    alert( "Please provide a book title!" );
    document.subNotFound.title.focus();
    return false;
  }
  else if(document.subNotFound.author.value == ""){
    alert( "Please provide an author!" );
    document.subNotFound.author.focus();
    return false;
  }
  else if(document.subNotFound.edition.value == ""){
    alert( "Please provide a book edition!" );
    document.subNotFound.edition.focus();
    return false;
  }
  else if(noOptionSelected(0)){
    alert( "Please provide the book condition!" );
    document.subNotFound.condition.focus();
    return false;
  }
  else if(document.subNotFound.email.value == ""){
    alert( "Please provide your email" );
    document.subNotFound.email.focus() ;
    return false;
  }
  else if(notPrice(0)){
    alert( "Please provide a price!" );
    document.subNotFound.price.focus() ;
    return false;
   }
   else{
     return true;
   }
}

function isNotValidISBN(){
  var isbn = document.sub.isbnInput.value;
  if ((isbn.length < 13) || (isbn.length > 14)) {
    return true;
  }
  else if (charNotNumber(isbn)) {
    return true;
  }
  else {
    return false;
  }
}

function charNotNumber(isbn){
  for (var i = 0; i < isbn.length; i++){
    if (isNaN(isbn.charAt(i))) {
      if (isbn.charAt(i) == '-') {
        continue;
      }
      return true;
    }
  }
  return false;
}

function noOptionSelected(found){
  if (found) {
    var choice = document.getElementById("condition");
  }
  else {
    var choice = document.getElementById("condition")
  }

  if(choice.selectedIndex == -1) {
     return true;
  }
  return false;
}

function notPrice(found){
  if (found) {
    var price = document.sub.price.value;
  }
  else {
    var price = document.subNotFound.price.value;
  }

  if (isNaN(price)) {
    return true;
  }
  else if (price == '') {
    return true;
  }
  return false;
}