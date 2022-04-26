/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Gateway, Wallets } = require('fabric-network');
const path = require('path');
const fs = require('fs');


async function main() {
    try {
        // load the network configuration
		const ccpPath = path.resolve(__dirname, 'organizations', 'bspmsp_profile.json');
        const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        const identity = await wallet.get('User1');
        if (!identity) {
            console.log('An identity for the user "User1" does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            return;
        }

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        // MC changed this to false
        await gateway.connect(ccp, { wallet, identity: 'User1', discovery: { enabled: true, asLocalhost: false } });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('channel1');

        // Get the contract from the network.
        //const contract = network.getContract('AirlineTicket');
		const contract = network.getContract('token-erc20');

        // Evaluate the specified transaction.
		//const result = await contract.evaluateTransaction('readAirlineTicket', 'tkt0072');
		//const result = await contract.evaluateTransaction('getAllClientAccountBalances');
        const result1 = await contract.evaluateTransaction('ClientAccountID');
		//const result2 = await contract.evaluateTransaction('ClientAccountBalance');
		//const result3 = await contract.evaluateTransaction('BalanceOf', 'x509::/OU=client/CN=user1::/C=US/ST=North Carolina/O=Hyperledger/OU=Fabric/CN=org1ca-ca');
		//const result4 = await contract.evaluateTransaction('BalanceOf', 'x509::/OU=client/CN=user1::/C=US/ST=North Carolina/O=Hyperledger/OU=Fabric/CN=org2ca-ca');
		//const result5 = await contract.evaluateTransaction('BalanceOf', 'x509::/OU=client/CN=user1::/C=US/ST=North Carolina/O=Hyperledger/OU=Fabric/CN=org3ca-ca');
		//const result6 = await contract.evaluateTransaction('TotalSupply');
        
        
		//console.log(`Transaction has been evaluated, result is: ${result.toString()}`);
		console.log(`Transaction has been evaluated, result1 ClientAccountID is: ${result1.toString()}`);
		//console.log(`Transaction has been evaluated, result2 ClientAccountBalance is: ${result2.toString()}`);
		//console.log(`Transaction has been evaluated, result3 org1ca is: ${result3.toString()}`);
		//console.log(`Transaction has been evaluated, result4 org2ca is: ${result4.toString()}`);
		//console.log(`Transaction has been evaluated, result5 org3ca is: ${result5.toString()}`);
		//console.log(`Transaction has been evaluated, result6 TotalSupply is: ${result6.toString()}`);

        // Disconnect from the gateway.
        await gateway.disconnect();
        
    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        process.exit(1);
    }
}

main();
