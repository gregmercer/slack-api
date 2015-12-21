var request = require('request');
var nconf = require('nconf');
var util = require('util');

/* NCONF SETTINGS */
// Parse environment variables
nconf.env();

function testInviteGroup() {

  var apiToken = nconf.get('API_TOKEN');
  var apiUrl = 'https://slack.com/api/groups.invite';

  var options = {
    token : apiToken,
    channel : '<channel id>',
    user : '<user id>',
  };

  doPost(apiUrl, options, null);
}

function testCreateGroup() {

  var apiToken = nconf.get('API_TOKEN');
  var apiUrl = 'https://slack.com/api/groups.create';

  var options = {
    token : apiToken,
    name : '<group name>',
  };

  doPost(apiUrl, options, null);
}

function testArchiveChannel() {

  var apiToken = nconf.get('API_TOKEN');
  var apiUrl = 'https://slack.com/api/channels.archive';

  var options = {
    token : apiToken,
    channel : '<channel id>',
  };

  doPost(apiUrl, options, null);
}

function testCreateChannel() {

  var apiToken = nconf.get('API_TOKEN');
  var apiUrl = 'https://slack.com/api/channels.create';

  var options = {
    token : apiToken,
    name : '<channel name>',
  };

  doPost(apiUrl, options, null);
}

function testChannelsList() {

  var apiToken = nconf.get('API_TOKEN');
  var apiUrl = 'https://slack.com/api/channels.list';

  options = {
    token : apiToken,
  }

  doPost(apiUrl, options, null);
}

function testUsersList() {

  var apiToken = nconf.get('API_TOKEN');
  var apiUrl = 'https://slack.com/api/users.list';

  options = {
    token : apiToken,
  }

  doPost(apiUrl, options, null);
}

function writeBody(body) {

  var fs = require('fs');

  fs.writeFile("test.out", body, function(err) {
    if (err) {
      return console.log(err);
    }
  });
}

function doPost(apiUrl, options, callback) {

  var result =
  request.post({
    url : apiUrl,
    json : true,
    headers : {'content-type': 'application/json'},
    qs : options
  }, function(err, resp, body) {

    console.log("returned from post: err = " + err);
    console.log(body);

    if (callback != null) {
      if (body === 'ok') {
        return callback(null, body);
      } else {
        return callback(err || body);
      }
    }

  });

  return result;
}

testUsersList();
