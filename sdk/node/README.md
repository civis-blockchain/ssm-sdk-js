# Signing State Machines Node.js gateway


## Getting started

  * Local SSM deployment

This example uses a [SSM local deployment](https://github.com/civis-blockchain/blockchain-ssm/tree/master/deployment/local) from the blockchain-ssm sources,
installed next to the ssm-sdk-js. Redefine your environment accordingly.

```
SSM_SDK_NODE_HOME=$PWD
SSM_DEPLOYMENT_LOCAL_HOME=../../../blockchain-ssm/deployment/local
```

  * Local JS installation

We'il install a local copy of the [blockchain-coop](https://github.com/civis-blockchain/blockchain-coop) proxy for Hyperledger fabric and fabric-ca client.

```
cd ${SSM_DEPLOYMENT_LOCAL_HOME}
npm install ${SSM_SDK_NODE_HOME}
```

