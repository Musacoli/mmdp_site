import keystone from '../../..';

const port = process.env.TEST_PORT || 5150;
keystone.set('port', port);

export default keystone;
