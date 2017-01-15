'use strict';

const AWS = require('aws-sdk');

const docClient = new AWS.DynamoDB.DocumentClient();

module.exports.playlist = (event, context, callback) => {
//  const params = {
//    TableName: 'playlists',
//    Item: {
//      id: 'aa22a194-2d60-35c7-9d56-0e1dba20cd45',
//      userid: 'some-user-id',
//      tracks: [
//        {
//          id: 492635,
//          name: 'My Sunday Playlist' 
//        },
//        {
//          id: 555987,
//          name: 'Another brilliant playlist'
//        }
//      ]
//    }
//  }
console.log('event: ', event);
console.log('context:', context);

var params = {
  TableName: 'playlists',
  IndexName: 'PlaylistUsers',
  KeyConditionExpression: "userid = :a",
  ExpressionAttributeValues: {
    ":a": "some-user-id"
  }
}

docClient.query(params, function(err, data) {
  if (err) { 
    console.log(err);
  } else { 
    const response = {
      statusCode: 200,
      body: JSON.stringify({
        data: data
      }),
    };
    callback(null, response);
  }
});
//  docClient.put(params, function(err, data) {
//    if (err) { 
//      callback(err);
//    }
//    else { 
//      const response = {
//        statusCode: 200,
//        body: JSON.stringify({
//          data: data,
//          input: event,
//        }),
//      };
//      
//      callback(null, response);
//    }
//  });

};

