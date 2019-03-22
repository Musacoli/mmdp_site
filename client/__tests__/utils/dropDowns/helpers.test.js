import {
  checkEditedData,
  checkEmptyField,
  getKeys,
  updateOrCreate,
} from '../../../utils/dropdowns';

// mocks
const getData = () => [
  {
    _id: '5c9a5382750d6dcabb0970ae',
    __v: 0,
    pillarTitle: 'A sample pillar title',
    description: '',
    errors: {},
  },
  {
    _id: '5c9a5382750d6dcabb097111',
    __v: 0,
    pillarTitle: 'A sample pillar title2',
    description: 'desc',
    errors: {},
  },
  {
    _id: '',
    __v: 0,
    pillarTitle: '',
    description: '',
    errors: {},
  },
];

const getErrors = () => [];

describe('Dropdown helper functions', () => {
  let errors;
  let editedData;
  beforeEach(() => {
    errors = getErrors();
    editedData = getData();
  });
  describe('checkEditedData', () => {
    it('should not push any error', () => {
      checkEditedData(editedData, errors, '', []);
      expect(errors).toEqual([]);
    });
    it('should push an error', () => {
      checkEditedData(editedData, errors, '', ['A sample pillar title']);
      expect(errors.length).toBeGreaterThan(0);
    });
  });
  describe('checkEmptyField', () => {
    it('should not push any error', () => {
      checkEmptyField(editedData.slice(0, 2), [], errors);
      expect(errors).toEqual([]);
    });
    it('should push an error', () => {
      checkEmptyField(editedData, [], errors);
      expect(errors.length).toBeGreaterThan(0);
    });
  });
  describe('getKeys', () => {
    it('should get the keys in object array', () => {
      const keys = getKeys(getData(), 'pillarTitle');
      expect(keys).toEqual([
        'A sample pillar title',
        'A sample pillar title2',
        '',
      ]);
    });
  });
  describe('updateOrCreate', () => {
    it('should cell the function passed', () => {
      const func = jest.fn();
      updateOrCreate(func, getData(), getData());
      expect(func).toBeCalledTimes(2);
    });
  });
});
