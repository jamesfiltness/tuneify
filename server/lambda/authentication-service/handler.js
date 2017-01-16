const jwt = require('jsonwebtoken');

// TODO: Replace this function with something based on the official AWS customAuthorizer blueprint
function generatePolicyDocument(principalId, effect, resource) {
	const authResponse = {};
	
  authResponse.principalId = principalId;
	if (effect && resource) {
		const policyDocument = {};
		policyDocument.Version = '2012-10-17'; // default version
		policyDocument.Statement = [];
		const statementOne = {};
		statementOne.Action = 'execute-api:Invoke'; // default action
		statementOne.Effect = effect;
		statementOne.Resource = resource;
		policyDocument.Statement[0] = statementOne;
		authResponse.policyDocument = policyDocument;
	}

  authResponse.context = {};
  authResponse.context.userId = principalId;
	
  return authResponse;
}

module.exports.authorise = (event, context, callback) => {
  const token = event.authorizationToken;
  const secret = process.env.AUTH0_SECRET;
  
  jwt.verify(token, secret, function(err, decoded) {
    if (err) {
      callback("Unauthorized");
    } else if (decoded) {
      const userId = decoded.sub;
      callback(null, generatePolicyDocument(userId, 'Allow', '*'));
    }
  });
};
