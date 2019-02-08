/* eslint-env jest */
import routes from '../../routes';

describe('Routes tests', () => {
  it('should have path and component keys', () => {
    expect(routes[0]).toHaveProperty('path');
    expect(routes[0]).toHaveProperty('component');
    expect(routes[0]).toHaveProperty('component');
  });
});
