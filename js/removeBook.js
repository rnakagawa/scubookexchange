function removeBook(){
  var email = prompt("Please enter your SCU email");
  var verification = prompt("Please enter your verfication code");
  var info = {
    email: email,
    verification: verification
  };

  $.ajax({
    type: 'GET',
    url: 'http://students.engr.scu.edu/~lwong/coen168/scubookexchange/php/removeBook.php',
    data: {'info': info}
  }).success(function(response){
    if(response==='success'){
      alert('Your book has been removed!');
      window.location.href = "index.html";
    }
    else{
      alert(response);
    }
  });
}
