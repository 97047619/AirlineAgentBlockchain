/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

// Deterministic JSON.stringify()
const stringify  = require('json-stringify-deterministic');
const sortKeysRecursive  = require('sort-keys-recursive');
const { Contract } = require('fabric-contract-api');

class AirlineTicketContract extends Contract {

    async initLedger(ctx) {
        const assets = [
            {
                ID: 'tkt0001',
                Depart: 'DUB',
                Arrive: 'LHR',
                Owner: 'x509::/OU=client/CN=user1::/C=US/ST=North Carolina/O=Hyperledger/OU=Fabric/CN=org3ca-ca',
                Price: 300,
                Status: 'Scheduled',
            },
            {
                ID: 'tkt0002',
                Depart: 'LHR',
                Arrive: 'DUB',
                Owner: 'x509::/OU=client/CN=user1::/C=US/ST=North Carolina/O=Hyperledger/OU=Fabric/CN=org3ca-ca',
                Price: 200,
                Status: 'Scheduled',
            },
            {
                ID: 'tkt0003',
                Depart: 'DUB',
                Arrive: 'DXB',
                Owner: 'x509::/OU=client/CN=user1::/C=US/ST=North Carolina/O=Hyperledger/OU=Fabric/CN=org3ca-ca',
                Price: 450,
                Status: 'Scheduled',
            },
            {
                ID: 'tkt0004',
                Depart: 'DXB',
                Arrive: 'DUB',
                Owner: 'x509::/OU=client/CN=user1::/C=US/ST=North Carolina/O=Hyperledger/OU=Fabric/CN=org3ca-ca',
                Price: 300,
                Status: 'Scheduled',
            },
            {
                ID: 'tkt0005',
                Depart: 'BFS',
                Arrive: 'LGW',
                Owner: 'x509::/OU=client/CN=user1::/C=US/ST=North Carolina/O=Hyperledger/OU=Fabric/CN=org3ca-ca',
                Price: 100,
                Status: 'Scheduled',
            },
            {
                ID: 'tkt0006',
                Depart: 'LGW',
                Arrive: 'BFS',
                Owner: 'x509::/OU=client/CN=user1::/C=US/ST=North Carolina/O=Hyperledger/OU=Fabric/CN=org3ca-ca',
                Price: 50,
                Status: 'Scheduled',
            },
            {
                ID: 'tkt0007',
                Depart: 'DUB',
                Arrive: 'SFO',
                Owner: 'x509::/OU=client/CN=user1::/C=US/ST=North Carolina/O=Hyperledger/OU=Fabric/CN=org3ca-ca',
                Price: 350,
                Status: 'Scheduled',
            },
            {
                ID: 'tkt0008',
                Depart: 'SFO',
                Arrive: 'DUB',
                Owner: 'x509::/OU=client/CN=user1::/C=US/ST=North Carolina/O=Hyperledger/OU=Fabric/CN=org3ca-ca',
                Price: 300,
                Status: 'Scheduled',
            },
            {
                ID: 'tkt0009',
                Depart: 'DUB',
                Arrive: 'ATL',
                Owner: 'x509::/OU=client/CN=user1::/C=US/ST=North Carolina/O=Hyperledger/OU=Fabric/CN=org3ca-ca',
                Price: 450,
                Status: 'Scheduled',
            },
            {
                ID: 'tkt0010',
                Depart: 'ATL',
                Arrive: 'DUB',
                Owner: 'x509::/OU=client/CN=user1::/C=US/ST=North Carolina/O=Hyperledger/OU=Fabric/CN=org3ca-ca',
                Price: 300,
                Status: 'Scheduled',
            },
        ];

        for (const asset of assets) {
            asset.docType = 'asset';
            // write to world state deterministically
            // use convetion of alphabetic order
            // insert data in alphabetic order using 'json-stringify-deterministic' and 'sort-keys-recursive'
            // when retrieving data, in any lang, the order of data will be the same and consequently also the corresonding hash
            await ctx.stub.putState(asset.ID, Buffer.from(stringify(sortKeysRecursive(asset))));
        }
    }

    async airlineTicketExists(ctx, airlineTicketId) {
        const buffer = await ctx.stub.getState(airlineTicketId);
        return (!!buffer && buffer.length > 0);
    }

    // createAirlineTicket issues a new ticket to the world state with given details.
    async createAirlineTicket(ctx, airlineTicketId, depart, arrive, owner, price, status) {
        const exists = await this.airlineTicketExists(ctx, airlineTicketId);
        if (exists) {
            throw new Error(`The airline ticket ${airlineTicketId} already exists`);
        }
        const asset = {
            ID: airlineTicketId,
            Depart: depart,
            Arrive: arrive,
            Owner: owner,
            Price: parseInt(price),
            Status: status,
        };
        // insert data in alphabetic order using 'json-stringify-deterministic' and 'sort-keys-recursive'
        await ctx.stub.putState(airlineTicketId, Buffer.from(stringify(sortKeysRecursive(asset))));
        return JSON.stringify(asset);
        
        // const buffer = Buffer.from(JSON.stringify(asset));
        // await ctx.stub.putState(airlineTicketId, buffer);
    }

    // readAirlineTicket returns the ticket stored in the world state with given id.
    async readAirlineTicket(ctx, airlineTicketId) {
        const exists = await this.airlineTicketExists(ctx, airlineTicketId);
        if (!exists) {
            throw new Error(`The airline ticket ${airlineTicketId} does not exist`);
        }
        const buffer = await ctx.stub.getState(airlineTicketId);
        //const asset = JSON.parse(buffer.toString());
        //return asset;
        return buffer.toString();
    }

    // updateAirlineTicket updates an existing ticket in the world state with provided parameters.
    async updateAirlineTicket(ctx, airlineTicketId, depart, arrive, owner, price, status) {
        const exists = await this.airlineTicketExists(ctx, airlineTicketId);
        if (!exists) {
            throw new Error(`The airline ticket ${airlineTicketId} does not exist`);
        }
        
        // overwrite original asset with new asset
        const updatedAsset = {
            ID: airlineTicketId,
            Depart: depart,
            Arrive: arrive,
            Owner: owner,
            Price: price,
            Status: status,
        };
        // insert data in alphabetic order using 'json-stringify-deterministic' and 'sort-keys-recursive'
        return ctx.stub.putState(airlineTicketId, Buffer.from(stringify(sortKeysRecursive(updatedAsset))));

        // const buffer = Buffer.from(JSON.stringify(asset));
        // await ctx.stub.putState(airlineTicketId, buffer);
    }

    // deleteAirlineTicket deletes an given ticket from the world state.
    async deleteAirlineTicket(ctx, airlineTicketId) {
        const exists = await this.airlineTicketExists(ctx, airlineTicketId);
        if (!exists) {
            throw new Error(`The airline ticket ${airlineTicketId} does not exist`);
        }

        const ticketString = await this.readAirlineTicket(ctx, airlineTicketId);
        const ticket = JSON.parse(ticketString);
        const ticketOwner = ticket.Owner;
        const ticketStatus = ticket.Status;
        const agent = 'x509::/OU=client/CN=user1::/C=US/ST=North Carolina/O=Hyperledger/OU=Fabric/CN=org2ca-ca'

        if (ticketOwner === agent && ticketStatus === 'Scheduled') {
            throw new Error(`The airline does not have permission to delete this ticket`);
        } else {
            await ctx.stub.deleteState(airlineTicketId);
        }
    }

    // transferAirlineTicket updates the owner field of ticket with given id in the world state.
    async transferAirlineTicket(ctx, airlineTicketId, newOwner) {
        
        const ticketString = await this.readAirlineTicket(ctx, airlineTicketId);
        const ticket = JSON.parse(ticketString);
        const currentOwner = ticket.Owner;
        const price = ticket.Price;

        // Agent wants to buy/transfer ticket
        // 1. check price of ticket
        // 2. check agent balance
        // 3. if balance >= price then transfer ticket to Agent name and transfer tokens from Agent to Airline

        // cross-check balance of new owner on myTokens smart contract on channel1
        
        // cc1Res is going to contain an int
        const cc1Args = ['BalanceOf', newOwner];
        const cc1Res = await ctx.stub.invokeChaincode('myTokens', cc1Args, 'channel1');
        if (cc1Res.status !== 200) {
            throw new Error(cc1Res.message);
        }
        const balance = JSON.parse(cc1Res.payload.toString('utf8'));
                
        if (balance >= price) {
            ticket.Owner = newOwner;
        
            // newowner = sender, currentowner
            const cc1Args2 = ['TransferFrom', newOwner, currentOwner, price.toString()];
            //const cc1Args2 = ['Transfer', currentOwner, price.toString()];
            const cc1Res2 = await ctx.stub.invokeChaincode('myTokens', cc1Args2, 'channel1');
            
            if (cc1Res2.status !== 200) {
                throw new Error(cc1Res2.message);
            }

            // insert data in alphabetic order using 'json-stringify-deterministic' and 'sort-keys-recursive'
            ctx.stub.putState(airlineTicketId, Buffer.from(stringify(sortKeysRecursive(ticket))));

        } else {
            throw new Error(`Agent ${newOwner} has insufficient balance ${balance} `);
        }

        //response = stub.InvokeChaincode("myTokens", invokeArgs, "channel1")
	    
        //if (response.Status != shim.OK) {
		//    throw new Error("Failed to invoke chaincode. Got error: %s", response.Payload);
	    //}
                
        return newOwner;
    }

    // changeAirlineTicketStatus updates the status field of ticket with given id in the world state.
    async changeAirlineTicketStatus(ctx, airlineTicketId, newStatus) {
        
        const ticketString = await this.readAirlineTicket(ctx, airlineTicketId);
        const ticket = JSON.parse(ticketString);
        const currentOwner = ticket.Owner;
        const currentStatus = ticket.Status;
        const price = ticket.Price;
        const airline = 'x509::/OU=client/CN=user1::/C=US/ST=North Carolina/O=Hyperledger/OU=Fabric/CN=org3ca-ca';
        const agent = 'x509::/OU=client/CN=user1::/C=US/ST=North Carolina/O=Hyperledger/OU=Fabric/CN=org2ca-ca'

        if (currentOwner === agent && newStatus === 'Cancelled by Airline') {

            const cc1Args = ['BalanceOf', airline];
            const cc1Res = await ctx.stub.invokeChaincode('myTokens', cc1Args, 'channel1');
            if (cc1Res.status !== 200) {
                throw new Error(cc1Res.message);
            }
            const balance = JSON.parse(cc1Res.payload.toString('utf8'));

            if (balance >= price) {

                const cc1Args2 = ['TransferFrom', airline, agent, price.toString()];
                //const cc1Args2 = ['Transfer', currentOwner, price.toString()];
                const cc1Res2 = await ctx.stub.invokeChaincode('myTokens', cc1Args2, 'channel1');
                
                if (cc1Res2.status !== 200) {
                    throw new Error(cc1Res2.message);
                }

            } else {
                throw new Error(`Airline has insufficient balance ${balance} `);
            }
        }

        if (currentOwner === agent && newStatus === 'Cancelled by Agent') {
 
            // get 10% of price and deduct as cancellation fee
            let percentToGet = 10;
 
            // calculate the percent.
            let percent = ((percentToGet / 100) * price);
            const decreasedPice = price - percent;

            const cc1Args = ['BalanceOf', airline];
            const cc1Res = await ctx.stub.invokeChaincode('myTokens', cc1Args, 'channel1');
            if (cc1Res.status !== 200) {
                throw new Error(cc1Res.message);
            }
            const balance = JSON.parse(cc1Res.payload.toString('utf8'));

            if (balance >= decreasedPice) {
            
                const cc1Args2 = ['TransferFrom', airline, agent, decreasedPice.toString()];
                //const cc1Args2 = ['Transfer', currentOwner, decreasedPice.toString()];
                const cc1Res2 = await ctx.stub.invokeChaincode('myTokens', cc1Args2, 'channel1');
                
                if (cc1Res2.status !== 200) {
                    throw new Error(cc1Res2.message);
                }
        
            } else {
                throw new Error(`Airline has insufficient balance ${balance} `);
            }
        }

        ticket.Status = newStatus;
        ctx.stub.putState(airlineTicketId, Buffer.from(stringify(sortKeysRecursive(ticket))));
        return newStatus;
    }

    // getAllAirlineTickets returns all tickets found in the world state.
    async getAllAirlineTickets(ctx) {
        const allResults = [];
        // range query with empty string for startKey and endKey does an open-ended query of all assets in the chaincode namespace.
        const iterator = await ctx.stub.getStateByRange('', '');
        let result = await iterator.next();
        while (!result.done) {
            const strValue = Buffer.from(result.value.value.toString()).toString('utf8');
            let record;
            try {
                record = JSON.parse(strValue);
            } catch (err) {
                console.log(err);
                record = strValue;
            }
            allResults.push(record);
            result = await iterator.next();
        }
        return JSON.stringify(allResults);
    }

}

module.exports = AirlineTicketContract;
