'use strict';

const AWS = require('aws-sdk');

const docClient = new AWS.DynamoDB.DocumentClient();

module.exports.playlist = (event, context, callback) => {
  const params = {
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
      const response = {
        statusCode: 200,
        body: JSON.stringify({
          data: data,
          input: event,
        }),
      };
      
      callback(null, response);
    }
  });
};

