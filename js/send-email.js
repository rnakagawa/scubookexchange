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

    sendTheMail(email);
  }
}

function sendTheMail(e) {
// Send the email!
// create a new instance of the Mandrill class with your API key
    var m = new mandrill.Mandrill('Irm8NhatVNDLrlPp-N2aCw');
    var email = e;

// create a variable for the API call parameters
    var params = {
        "message": {
            "from_email":"scubookexchange@gmail.com",
            "to":[{"email":email}],
            "subject": "scubookexchange",
            "html": "<p>Hey *|USER|*, your verification code is: *|CODE|*.</p>",
            "autotext": true,
            "track_opens": true,
            "track_clicks": true,
            "merge_vars": [
                {
                    "rcpt": email,
                    "vars": [
                        {
                            "name": "USER",
                            "content": email
                        },
                        {
                            "name": "CODE",
                            "content": makeid()
                        }
                    ]
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
