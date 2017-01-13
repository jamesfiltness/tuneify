'use strict';

var AWS = require('aws-sdk');
var jwt = require('jsonwebtoken');

var docClient = new AWS.DynamoDB.DocumentClient();

// Replace this function with something based on the official AWS customAuthorizer blueprint
function generatePolicyDocument(principalId, effect, resource) {
	var authResponse = {};
	authResponse.principalId = principalId;
	if (effect && resource) {
		var policyDocument = {};
		policyDocument.Version = '2012-10-17'; // default version
		policyDocument.Statement = [];
		var statementOne = {};
		statementOne.Action = 'execute-api:Invoke'; // default action
		statementOne.Effect = effect;
		statementOne.Resource = resource;
		policyDocument.Statement[0] = statementOne;
		authResponse.policyDocument = policyDocument;
	}
	return authResponse;
}

module.exports.Playlist = (event, context, callback) => {
  var params = {
    TableName: 'playlists',
    Item: {
      id: 'ea92a194-2d60-35c7-9d56-0e1dba20cd45',
      tracks: [
        {
          artist: 'Radiohead', track: 'Airbag'
        }
      ]
    }
  }

  docClient.put(params, function(err, data) {
    if (err) { 
      callback(err);
    }
    else { 
      callback(null, {});
    }
  });
};


module.exports.Authorise = (event, context, callback) => {
  var token = event.authorizationToken;
  var secret = process.env.AUTH0_SECRET;
  
  jwt.verify(token, secret, function(err, decoded) {
    if (err) {
      callback("Unauthorized");
    } else if (decoded) {
      callback(null, generatePolicyDocument('jamesasid', 'Allow', event.methodArn));
    }
  });
};
