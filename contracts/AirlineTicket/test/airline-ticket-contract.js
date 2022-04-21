/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { ChaincodeStub, ClientIdentity } = require('fabric-shim');
const { AirlineTicketContract } = require('..');
const winston = require('winston');

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

chai.should();
chai.use(chaiAsPromised);
chai.use(sinonChai);

class TestContext {

    constructor() {
        this.stub = sinon.createStubInstance(ChaincodeStub);
        this.clientIdentity = sinon.createStubInstance(ClientIdentity);
        this.logger = {
            getLogger: sinon.stub().returns(sinon.createStubInstance(winston.createLogger().constructor)),
            setLevel: sinon.stub(),
        };
    }

}

describe('AirlineTicketContract', () => {

    let contract;
    let ctx;

    beforeEach(() => {
        contract = new AirlineTicketContract();
        ctx = new TestContext();
        ctx.stub.getState.withArgs('1001').resolves(Buffer.from('{"value":"airline ticket 1001 value"}'));
        ctx.stub.getState.withArgs('1002').resolves(Buffer.from('{"value":"airline ticket 1002 value"}'));
    });

    describe('#airlineTicketExists', () => {

        it('should return true for a airline ticket', async () => {
            await contract.airlineTicketExists(ctx, '1001').should.eventually.be.true;
        });

        it('should return false for a airline ticket that does not exist', async () => {
            await contract.airlineTicketExists(ctx, '1003').should.eventually.be.false;
        });

    });

    describe('#createAirlineTicket', () => {

        it('should create a airline ticket', async () => {
            await contract.createAirlineTicket(ctx, '1003', 'airline ticket 1003 value');
            ctx.stub.putState.should.have.been.calledOnceWithExactly('1003', Buffer.from('{"value":"airline ticket 1003 value"}'));
        });

        it('should throw an error for a airline ticket that already exists', async () => {
            await contract.createAirlineTicket(ctx, '1001', 'myvalue').should.be.rejectedWith(/The airline ticket 1001 already exists/);
        });

    });

    describe('#readAirlineTicket', () => {

        it('should return a airline ticket', async () => {
            await contract.readAirlineTicket(ctx, '1001').should.eventually.deep.equal({ value: 'airline ticket 1001 value' });
        });

        it('should throw an error for a airline ticket that does not exist', async () => {
            await contract.readAirlineTicket(ctx, '1003').should.be.rejectedWith(/The airline ticket 1003 does not exist/);
        });

    });

    describe('#updateAirlineTicket', () => {

        it('should update a airline ticket', async () => {
            await contract.updateAirlineTicket(ctx, '1001', 'airline ticket 1001 new value');
            ctx.stub.putState.should.have.been.calledOnceWithExactly('1001', Buffer.from('{"value":"airline ticket 1001 new value"}'));
        });

        it('should throw an error for a airline ticket that does not exist', async () => {
            await contract.updateAirlineTicket(ctx, '1003', 'airline ticket 1003 new value').should.be.rejectedWith(/The airline ticket 1003 does not exist/);
        });

    });

    describe('#deleteAirlineTicket', () => {

        it('should delete a airline ticket', async () => {
            await contract.deleteAirlineTicket(ctx, '1001');
            ctx.stub.deleteState.should.have.been.calledOnceWithExactly('1001');
        });

        it('should throw an error for a airline ticket that does not exist', async () => {
            await contract.deleteAirlineTicket(ctx, '1003').should.be.rejectedWith(/The airline ticket 1003 does not exist/);
        });

    });

});
