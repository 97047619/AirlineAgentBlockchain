
'use strict';

const { Gateway, Wallets } = require('fabric-network');
// const { FileSystemWallet, Gateway } = require('fabric-network');
const fs = require('fs');
const path = require('path');


// capture network variables from config.json
const configPath = path.join(process.cwd(), '/config.json');
const configJSON = fs.readFileSync(configPath, 'utf8');
const config = JSON.parse(configJSON);
let connection_file = config.connection_file;
let userName = config.userName;
let gatewayDiscovery = config.gatewayDiscovery;

// connect to the connection file
const ccpPath = path.join(process.cwd(), connection_file);
const ccpJSON = fs.readFileSync(ccpPath, 'utf8');
const ccp = JSON.parse(ccpJSON);

// change ticket owner transaction
exports.transferAirlineTicket = async function(airlineTicketId, newOwner) {
    let response = {};
    try {

        // Create a new file system based wallet for managing identities.
		const walletPath = path.join(process.cwd(), 'wallet');
		const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        //const userExists = await wallet.exists(userName);
		const userExists = await wallet.get(userName);
        if (!userExists) {
            console.log('An identity for the user ' + userName + ' does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            response.error = 'An identity for the user ' + userName + ' does not exist in the wallet. Register ' + userName + ' first';
            return response;
        }

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: userName, discovery: gatewayDiscovery });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('channel1');

        // Get the contract from the network.
        const contract = network.getContract('airline-ticket');

        // Submit the specified transaction.
        // transferAirlineTicket transaction - requires 2 args , ex: ('transferAirlineTicket', 'tkt0001', 'x509::/OU=client/CN=user1::/C=US/ST=North Carolina/O=Hyperledger/OU=Fabric/CN=org2ca-ca')
        console.log(airlineTicketId);
        console.log(newOwner);
        await contract.submitTransaction('transferAirlineTicket', airlineTicketId, newOwner);
        console.log('Transaction has been submitted');

        // Disconnect from the gateway.
        await gateway.disconnect();

        response.msg = 'transferAirlineTicket Transaction has been submitted';
        return response;

    } catch (error) {
        console.error(`Failed to submit transaction: ${error}`);
        response.error = error.message;
        return response;
    }
};

// change ticket status transaction
exports.changeAirlineTicketStatus = async function(airlineTicketId, newStatus) {
    let response = {};
    try {

        // Create a new file system based wallet for managing identities.
		const walletPath = path.join(process.cwd(), 'wallet');
		const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        //const userExists = await wallet.exists(userName);
		const userExists = await wallet.get(userName);
        if (!userExists) {
            console.log('An identity for the user ' + userName + ' does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            response.error = 'An identity for the user ' + userName + ' does not exist in the wallet. Register ' + userName + ' first';
            return response;
        }

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: userName, discovery: gatewayDiscovery });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('channel1');

        // Get the contract from the network.
        const contract = network.getContract('airline-ticket');

        // Submit the specified transaction.
        // changeAirlineTicketStatus transaction - requires 2 args , ex: ('changeAirlineTicketStatus', 'tkt0001', 'Cancelled')
        console.log(airlineTicketId);
        console.log(newStatus);
        await contract.submitTransaction('changeAirlineTicketStatus', airlineTicketId, newStatus);
        console.log('Transaction has been submitted');

        // Disconnect from the gateway.
        await gateway.disconnect();

        response.msg = 'changeAirlineTicketStatus Transaction has been submitted';
        return response;

    } catch (error) {
        console.error(`Failed to submit transaction: ${error}`);
        response.error = error.message;
        return response;
    }
};

// getAllAirlineTickets transaction
exports.getAllAirlineTickets = async function() {

    let response = {};
    try {
        console.log('getAllAirlineTickets');

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'wallet');
		const wallet = await Wallets.newFileSystemWallet(walletPath);
		console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        //const userExists = await wallet.exists(userName);
		const userExists = await wallet.get(userName);
        if (!userExists) {
            console.log('An identity for the user ' + userName + ' does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            response.error = 'An identity for the user ' + userName + ' does not exist in the wallet. Register ' + userName + ' first';
            return response;
        }

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: userName, discovery: gatewayDiscovery });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('channel1');

        // Get the contract from the network.
        const contract = network.getContract('airline-ticket');

        // Evaluate the specified transaction.
        // getAllAirlineTickets transaction - requires no arguments, ex: ('getAllAirlineTickets')
        const result = await contract.evaluateTransaction('getAllAirlineTickets');
        console.log(`Transaction has been evaluated, result is: ${result.toString()}`);

        return result;

    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        response.error = error.message;
        return response;
    }
};

// readAirlineTicket identified by airlineTicketId
exports.readAirlineTicket = async function(airlineTicketId) {

    let response = {};
    try {
        console.log('readAirlineTicket');

        // Create a new file system based wallet for managing identities.
		const walletPath = path.join(process.cwd(), 'wallet');
		const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        //const userExists = await wallet.exists(userName);
		const userExists = await wallet.get(userName);
        if (!userExists) {
            console.log('An identity for the user ' + userName + ' does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            response.error = 'An identity for the user ' + userName + ' does not exist in the wallet. Register ' + userName + ' first';
            return response;
        }

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: userName, discovery: gatewayDiscovery });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('channel1');

        // Get the contract from the network.
        const contract = network.getContract('airline-ticket');

        // Evaluate the specified transaction.
        // readAirlineTicket transaction - requires 1 argument, ex: 'readAirlineTicket('tkt0001')'
        console.log(airlineTicketId);
        const result = await contract.evaluateTransaction('readAirlineTicket', airlineTicketId);
        //console.log(`Transaction has been evaluated, result is: ${result.toString()}`);

        return result;

    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        response.error = error.message;
        return response;
    }
    
};

// getClientAccountBalance of client account
exports.getClientAccountBalance = async function() {

    let response = {};
    try {
        console.log('getClientAccountBalance');

        // Create a new file system based wallet for managing identities.
		const walletPath = path.join(process.cwd(), 'wallet');
		const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        //const userExists = await wallet.exists(userName);
		const userExists = await wallet.get(userName);
        if (!userExists) {
            console.log('An identity for the user ' + userName + ' does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            response.error = 'An identity for the user ' + userName + ' does not exist in the wallet. Register ' + userName + ' first';
            return response;
        }

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: userName, discovery: gatewayDiscovery });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('channel1');

        // Get the contract from the network.
        const contract = network.getContract('token-erc20');

        // Evaluate the specified transaction
        const result = await contract.evaluateTransaction('ClientAccountBalance');
        console.log(`Transaction has been evaluated, balance is: ${result.toString()}`);

        return result;

    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        response.error = error.message;
        return response;
    }
};

// transfer tokens transaction
exports.transferTokens = async function(to, value) {
    let response = {};
    try {

        // Create a new file system based wallet for managing identities.
		const walletPath = path.join(process.cwd(), 'wallet');
		const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        //const userExists = await wallet.exists(userName);
		const userExists = await wallet.get(userName);
        if (!userExists) {
            console.log('An identity for the user ' + userName + ' does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            response.error = 'An identity for the user ' + userName + ' does not exist in the wallet. Register ' + userName + ' first';
            return response;
        }

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: userName, discovery: gatewayDiscovery });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('channel1');

        // Get the contract from the network.
        const contract = network.getContract('token-erc20');

        // Submit the specified transaction.
        // transferTokens transaction - requires 2 args , ex: ('x509::/OU=client/CN=user1::/C=US/ST=North Carolina/O=Hyperledger/OU=Fabric/CN=org3ca-ca', '100')
        console.log(to);
        console.log(value);
        await contract.submitTransaction('Transfer', to, value);
        console.log('Transaction has been submitted');

        // Disconnect from the gateway.
        await gateway.disconnect();

        response.msg = 'transferTokens Transaction has been submitted';
        return response;

    } catch (error) {
        console.error(`Failed to submit transaction: ${error}`);
        response.error = error.message;
        return response;
    }
    
};
