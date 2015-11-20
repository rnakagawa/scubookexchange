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

// create a variable for the API call parameters
var params = {
    "message": {
        "from_email":"scubookexchange@gmail.com",
        "to":[{"email":"rrnroy94@gmail.com"}],
        "subject": "Sending a text email from the Mandrill API",
        "html": "<p>Hey *|USER|*, your verification code is: *|CODE|*.</p>",
        "autotext": true,
        "track_opens": true,
        "track_clicks": true,
        "merge_vars": [
            {
                "rcpt": "rrnroy94@gmail.com",
                "vars": [
                    {
                        "name": "USER",
                        "content": "Ryan"
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
