const AWS = require('aws-sdk');

const docClient = new AWS.DynamoDB.DocumentClient();

module.exports.savePlaylist = (event, context, callback) => {
  const params = {
    TableName: 'playlists',
    Item: {
      id: 'ea92a194-2d60-35c7-9d56-0e1dba20cd45',
      name: 'My playlist',
      userid: 'c16ba271-f7e8-4a41-ac2c-c74d1dc37c5f',
      tracks: [
        {
          artist: 'Radiohead',
          track: 'airbag' 
        },
        {
          artist: 'Real Estate',
          track: 'Snow Days'
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
}

module.exports.getPlaylistsByUserId = (event, context, callback) => {
  const params = {
    TableName: 'playlists',
    IndexName: 'PlaylistUsers',
    KeyConditionExpression: "userid = :a",
    ExpressionAttributeValues: {
      ":a": "c16ba271-f7e8-4a41-ac2c-c74d1dc37c5f"
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
};

