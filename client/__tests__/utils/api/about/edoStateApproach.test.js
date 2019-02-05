
import * as edoStateApproachAPI from '../../../../utils/about/edoStateApproach';

describe('Should test axios api requests', () => {
  it('should test get object', () => {
    edoStateApproachAPI
      .createEdoStateApproach({
        theEdoStateApproach: 'theEdoStateApproach',
        background: 'background',
      })
      .then((response) => {
        expect(response).toEqual(Promise({}));
      });
  });
  it('should test get object', () => {
    edoStateApproachAPI
      .updateEdoStateApproach({
        id: '1234',
        theEdoStateApproach: 'theEdoStateApproach',
        background: 'background',
      })
      .then((response) => {
        expect(response).toEqual(Promise({}));
      });
  });
  it('should test get object', () => {
    edoStateApproachAPI
      .getEdoStateApproach()
      .then((response) => {
        expect(response).toEqual(Promise({}));
      });
  });
});
