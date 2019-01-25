import chai from 'chai';
import keystone from './helpers/keystone';

const { expect } = chai;


describe('About Model', () => {
  it('expect to have schema defined', (done) => {
    const About = keystone.list('About');

    expect(About.fields).to.have.property('creator').be.an('Object');
    expect(About.fields).to.have.property('about').be.an('Object');
    expect(About.fields).to.have.property('background').be.an('Object');
    expect(About.fields).to.have.property('createdAt').be.an('Object');
    expect(About.fields).to.have.property('updatedAt').be.an('Object');
    expect(About.fields).to.have.property('archived').be.an('Object');

    done();
  });
});
