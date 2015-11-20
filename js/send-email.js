// Create a function to log the response from the Mandrill API
function log(obj) {
    $('#response').text(JSON.stringify(obj));
}

// create a new instance of the Mandrill class with your API key
var m = new mandrill.Mandrill('Irm8NhatVNDLrlPp-N2aCw');

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
    return email;
  }
}

// create a variable for the API call parameters
var params = {
    "message": {
        "from_email":"scubookexchange@gmail.com",
        "to":[{"email":getEmail()}],
        "subject": "Sending a text email from the Mandrill API",
        "html": "<p>Hey *|USER|*, your verification code is: *|CODE|*.</p>",
        "autotext": true,
        "track_opens": true,
        "track_clicks": true,
        "merge_vars": [
            {
                "rcpt": getEmail(),
                "vars": [
                    {
                        "name": "USER",
                        "content": getEmail()
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

function sendTheMail() {
// Send the email!

    m.messages.send(params, function(res) {
        log(res);
    }, function(err) {
        log(err);
    });
}
