# Signing State Machines Node.js gateway


## Getting started

### Installing

  * Local SSM deployment

This example uses a [SSM local deployment](https://github.com/civis-blockchain/blockchain-ssm/tree/master/deployment/local) from the blockchain-ssm sources,
installed next to the ssm-sdk-js. Redefine your environment accordingly.

```
SSM_SDK_NODE_HOME=$PWD
SSM_DEPLOYMENT_LOCAL_HOME=../../../blockchain-ssm/deployment/local
```

  * Local JS installation

We'il install a local copy of the [blockchain-coop](https://github.com/civis-blockchain/blockchain-coop) proxy for Hyperledger fabric and fabric-ca client,
and use it with our ssm local deployment configuration.

```
cd ${SSM_DEPLOYMENT_LOCAL_HOME}
npm install ${SSM_SDK_NODE_HOME}
```

  * Node.js SDK local configuration

Here we'll create a specific configuration for our local deployment

```
cat << EOF > config.json
{
  "network": {
    "orderer": {
      "url": "grpcs://127.0.0.1:7050",
      "serverHostname": "orderer.bclocal",
      "tlsCacerts": "crypto-config/ordererOrganizations/bclocal/orderers/orderer.bclocal/msp/tlscacerts/tlsca.bclocal-cert.pem"
    },
    "organisations": {
      "bclocal": {
        "name": "BlockchainLocalOrg",
        "mspid": "BlockchainLocalOrgMSP",
        "ca": {
          "url": "https://127.0.0.1:7054",
          "name": "ca",
          "tlsCacerts": "crypto-config/peerOrganizations/bc-org.bclocal/users/Admin@bc-org.bclocal/msp/tlscacerts/tlsca.bc-org.bclocal-cert.pem"
        },
        "peers": {
          "peer0": {
            "requests": "grpcs://127.0.0.1:7051",
            "events": "grpcs://127.0.0.1:7053",
            "serverHostname": "peer0.bc-org.bclocal",
            "tlsCacerts": "crypto-config/peerOrganizations/bc-org.bclocal/peers/peer0.bc-org.bclocal/msp/tlscacerts/tlsca.bc-org.bclocal-cert.pem"
          }
        }
      }
    }
  }
}
EOF
```

### Node.js command line


  * Testing js SDK access

```
export PATH=$PWD/node_modules/blockchain-coop:$PATH
source .env
```

Enroll the bclocal organization admin and check access

```
bcc-cli.js enroll $ca__ADMIN $ca__PASSWD bclocal
bcc-cli.js check $ca__ADMIN
```

Run a query to list the existing SSM users. Should be "bob" ans "sam" with the local installation.

```
bcc-cli.js query $ca__ADMIN peer0 bclocal sandbox ssm list user
```

  * bcc-cli.js reference

```
bcc-cli.js
Usage:
	bcc-cli.js <register|enroll|check|invoke|query> [args]* 
```

```
bcc-cli.js register
Usage:
	bcc-cli.js register <user> <password> <org> <newuser> <newpass>
```

```
bcc-cli.js enroll
Usage:
	bcc-cli.js enroll <user> <password> <org>
```

```
bcc-cli.js check
Usage:
	bcc-cli.js check <user>
```

```
bcc-cli.js invoke
Usage:
	bcc-cli.js invoke <user> <endorsers> <channel> <ccid> <fcn> [transaction args]*
endorsers list format: peer0:org0,peer1:org0,peerx:orgx...
```

```
bcc-cli.js query
Usage:
	bcc-cli.js query <user> <peer> <org> <channel> <ccid> <fcn> [query args]*
```


### Node.js REST server

  * Running a REST server

Run a REST server that can be accessed with the example web client application.

```
bcc-rest.js 8080 $ca__ADMIN peer0:bclocal sandbox ssm
```

