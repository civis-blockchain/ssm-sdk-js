# Signing State Machines JavaScript SDK

This is the JavaScript SDK for the [Signing State Machines Blockchain](https://github.com/civis-blockchain/blockchain-ssm).

## How to use

### Node.js

Use the [Node.js SDK](sdk/node/README.md) to setup a REST server for a running SSM deployment such as the [SSM local deployment](https://github.com/civis-blockchain/blockchain-ssm/tree/master/deployment/local) for instance,
and also to access this deployment on the command-line with Node.js.

### Web client

The [web SDK](sdk/www/README.md) provides the actual [SSM JavaScript API](sdk/www/ssm-api.js) that will let a user perform queries and transactions on the SSM chaincode.
Use the web SDK sample application to access a running SSM deployment through the Node.js SDK REST server.
