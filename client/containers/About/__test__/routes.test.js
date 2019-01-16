/* eslint-env jest */
import routes from '../routes';

describe('Routes tests', () => {
  it('should have path and component keys', () => {
    expect(routes[0]).toHaveProperty('path', '/about');
    expect(routes[1]).toHaveProperty('path', '/about/governor-message');
    expect(routes[0]).toHaveProperty('component');
    expect(routes[0]).toHaveProperty('name');
    expect(routes[0]).toHaveProperty('exact');
  });
});
