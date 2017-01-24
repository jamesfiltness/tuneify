const AWS = require('aws-sdk');
const uuid = require('node-uuid');

const docClient = new AWS.DynamoDB.DocumentClient();

preparePlaylistData = (playlist) => {
  
}

module.exports.savePlaylist = (event, context, callback) => {
  const jsonPayload = JSON.parse(event.body);
  const userId = event.requestContext.authorizer.userId;
  const playlistId = uuid.v4();
  const playlist = JSON.stringify(jsonPayload.playlist);

  const params = {
    TableName: 'playlists',
    Item: {
      id: playlistId,
      name: jsonPayload.playlistName,
      userid: userId,
      tracks: playlist
    }
  }

  docClient.put(params, function(err, data) {
    if (err) { 
      console.log(error);
      callback(err);
    }
    else { 
      const response = {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin" : "*"
        },
        body: JSON.stringify({
          data: data,
          input: event,
        }),
      };
      
      callback(null, response);
    }
  });
}

module.exports.getPlaylistsByUserId = (event, context, callback) => {
  const userId = event.requestContext.authorizer.userId;
  const params = {
    TableName: 'playlists',
    IndexName: 'PlaylistUsers',
    KeyConditionExpression: "userid = :a",
    ExpressionAttributeValues: {
      ":a": userId
    }
  }

  docClient.query(params, function(err, data) {
    if (err) { 
      console.log(err);
    } else { 
      const response = {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin" : "*"
        },
        body: JSON.stringify({
          data: data
        }),
      };
      callback(null, response);
    }
  });
};

