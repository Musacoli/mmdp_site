
import * as objectivesAPI from '../../../../utils/about/objectives';

describe('Should test axios api requests', () => {
  it('should test get object', () => {
    objectivesAPI
      .createObjectives({
        objectives: 'Objectives',
      })
      .then((response) => {
        expect(response).toEqual(Promise({}));
      });
  });
  it('should test get object', () => {
    objectivesAPI
      .updateObjectives({
        id: '1234',
        objectives: 'Objectives',
      })
      .then((response) => {
        expect(response).toEqual(Promise({}));
      });
  });
  it('should test get object', () => {
    objectivesAPI
      .getObjectives()
      .then((response) => {
        expect(response).toEqual(Promise({}));
      });
  });
});
