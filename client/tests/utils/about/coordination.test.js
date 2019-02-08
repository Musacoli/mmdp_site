import * as CoordinationAPI from '../../../utils/about';

describe('Should test axios api requests', () => {
  it('should test get object', () => {
    CoordinationAPI.createCoordination({
      coordination: 'this is about mmdp coodination',
      whatAreWeDoing: 'this is what are we doing',
      introToHighlights: 'this is an intro to highlight',
      highlight: ['alie82938'],
    }).then((response) => {
      expect(response).toEqual(Promise({}));
    });
  });
  it('should test get object', () => {
    CoordinationAPI.updateCoordination({
      id: '1234',
      coordination: 'this is about mmdp coodination',
      whatAreWeDoing: 'this is what are we doing',
      introToHighlights: 'this is an intro to highlight',
      highlight: ['alie82938'],
    }).then((response) => {
      expect(response).toEqual(Promise({}));
    });
  });
  it('should test get object', () => {
    CoordinationAPI.getCoordination().then((response) => {
      expect(response).toEqual(Promise({}));
    });
  });
});
