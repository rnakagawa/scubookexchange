// Create a function to log the response from the Mandrill API
function log(obj) {
    $('#response').text(JSON.stringify(obj));
}

function makeid()
{
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for( var i=0; i < 5; i++ ){
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

function getFormDataNotFound(){
  if(!validateNotFound()){return 'invalid input';}
  if(document.forms.length){
    var form = document.forms[0];
    var title = form.elements["title"].value;
    var isbn = $('#isbn').val();
    var author = form.elements["author"].value;
    var author2 = form.elements["author2"].value;
    var edition = form.elements["edition"].value;
    var condition = form.elements["condition"].value;
    var email = form.elements["email"].value + '@scu.edu';
    var price = form.elements["price"].value;
    var id = makeid();

    var formData = {
      title: title,
      authorOne: author,
      authorTwo: author2,
      isbn: isbn,
      edition: edition,
      condition: condition,
      email: email,
      price: price,
      id: id,
      postDate: new Date().getTime()
    };
    $.ajax({
      type: 'POST',
      url: 'http://students.engr.scu.edu/~lwong/coen168/scubookexchange/php/insertTemp.php',
      data: {'info': formData}
    }).success(function(response){
      if(response == 'success'){
        sendTheMail(null,email,0,id);
      }
      else{
        alert(response);
      }
    })


  }
}

function getEmail() {
  if(document.forms.length){
    var form = document.forms[0];
    var email = form.elements["email"].value;
    email += "@scu.edu";
    //return email;
    var id = makeid();

    sendTheMail(null,email,0,id);
  }
}

function sendTheMail(buyer,seller,flag,id) {
// Send the email!
// create a new instance of the Mandrill class with your API key
    var m = new mandrill.Mandrill('Irm8NhatVNDLrlPp-N2aCw');
    var email = seller;
    var potential = buyer;
    var verification = id;
    //means verification code email
    if(!flag){
      var message = "<p>Hey *|USER|*, your verification code is: *|CODE|*.</p>";
      var fillData = [
          {
              "name": "USER",
              "content": email
          },
          {
              "name": "CODE",
              "content": verification
          }
      ];
      var subject = "Verification Code";
    }
    //notification for seller that there is a potential buyer
    else {
      var message = "<p>Hey *|USER|*, *|BUYER|* is interested in your book. Email the potential buyer or if the book has already been sold then please take the post down with the verification code you received upon initial posting";
      var fillData = [
          {
              "name": "USER",
              "content": email
          },
          {
              "name": "BUYER",
              "content": potential
          }
      ];
      var subject = "Potential Book Buyer";
      console.log('potential buyer');
    }



// create a variable for the API call parameters
    var params = {
        "message": {
            "from_email":"scubookexchange@gmail.com",
            "to":[{"email":email}],
            "subject": subject,
            "html": message,
            "autotext": true,
            "track_opens": true,
            "track_clicks": true,
            "merge_vars": [
                {
                    "rcpt": email,
                    "vars": fillData
                }
            ]
        }
    };

    m.messages.send(params, function(res) {
        log(res);
    }, function(err) {
        log(err);
    });
}
