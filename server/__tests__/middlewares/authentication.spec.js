/* eslint-disable no-unused-expressions */
import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { mockReq, mockRes } from 'sinon-express-mock';
import { generateToken, generateInvalidToken } from '../helpers/auth';
import checkAuth from '../../middlewares/authentication';

chai.use(sinonChai);

const { expect } = chai;
let next;
let res;
let validAuthReq;
let invalidAuthReq;

const payload = {
  id: '0576542wqw4ty5hrgv',
  username: 'tester',
  email: 'testing.tester@mmdp.ng',
  groups: [],
};

const validToken = generateToken(payload);
const invalidToken = generateInvalidToken(payload);

describe('Authorization middleware', () => {
  beforeEach(() => {
    next = sinon.spy();
    res = mockRes();
    validAuthReq = mockReq({
      headers: {
        authorization: `Bearer ${validToken}`,
      },
    });
    invalidAuthReq = mockReq({
      headers: {
        authorization: `Bearer ${invalidToken}`,
      },
    });
  });

  it('should set decoded user data on the request and call the next method when auth token is valid', (done) => {
    checkAuth(validAuthReq, res, next);
    expect(validAuthReq).to.have.property('user').be.a('Object');
    expect(next).to.be.calledOn();
    expect(res.json.called).to.be.false;
    done();
  });

  it('should send 401 status and not set user on req when auth token is invalid', (done) => {
    checkAuth(invalidAuthReq, res, next);
    expect(next).not.to.be.calledOn();
    expect(res.status).to.be.calledWith(401);
    expect(res.json.called).to.be.true;
    done();
  });
});
