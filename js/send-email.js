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

function getEmail() {
  if(document.forms.length){
    var form = document.forms[0];
    var email = form.elements["email"].value;
    email += "@scu.edu";
    //return email;

    sendTheMail(null,email,0);
  }
}

function sendTheMail(buyer,seller,flag) {
// Send the email!
// create a new instance of the Mandrill class with your API key
    var m = new mandrill.Mandrill('Irm8NhatVNDLrlPp-N2aCw');
    var email = seller;
    var potential = buyer;

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
              "content": makeid()
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
