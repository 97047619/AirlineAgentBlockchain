/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Gateway, Wallets } = require('fabric-network');
const fs = require('fs');
const path = require('path');

async function main() {
    try {
        // load the network configuration
        const ccpPath = path.resolve(__dirname, 'organizations', 'org3msp_profile.json');
        let ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

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
		const contract = network.getContract('myTokens');
		

		//result = await contract.submitTransaction('changeAirlineTicketStatus', 'tkt0003', 'Delayed');

        // Submit the specified transaction.
        //await contract.submitTransaction('Mint', '10000');
		
		//const result = await contract.submitTransaction('transferAirlineTicket', 'tkt0066', 'x509::/OU=client/CN=user1::/C=US/ST=North Carolina/O=Hyperledger/OU=Fabric/CN=org2ca-ca');
		
		//result = await contract.submitTransaction('Transfer', 'x509::/OU=client/CN=user1::/C=US/ST=North Carolina/O=Hyperledger/OU=Fabric/CN=org3ca-ca', '150');
		
		// from 2 to 3
		result = await contract.submitTransaction('TransferFrom', 'x509::/OU=client/CN=user1::/C=US/ST=North Carolina/O=Hyperledger/OU=Fabric/CN=org2ca-ca', 'x509::/OU=client/CN=user1::/C=US/ST=North Carolina/O=Hyperledger/OU=Fabric/CN=org3ca-ca', '1000');
		
        //console.log('Transaction has been submitted');
		console.log(`Transaction has been submited, result is: ${result.toString()}`);

        // Disconnect from the gateway.
        await gateway.disconnect();

    } catch (error) {
        console.error(`Failed to submit transaction: ${error}`);
        process.exit(1);
    }
}

main();
