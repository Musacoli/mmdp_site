import { mockReq } from 'sinon-express-mock';
import expect from 'expect';
import {
  getSearchQuery,
  filterAndPaginate,
  filterModel,
} from '../../../utils/search';
import {
  createUser,
  collectionToObject,
  removeAllGroupsAndUsers,
} from '../../helpers/commons/base';
import User from '../../../models/User';

const NAME = 'Joe';
const PHONE = '0722446688';
const NAME_PARTIAL = 'jo';
const PHONE_PARTIAL = '688';
const ANOTHER_NAME = 'Doe';
const ANOTHER_PHONE = '0711335577';

const mockSearchRequest = (query) => {
  return mockReq({ query });
};

const matchingQuery = mockSearchRequest({ first_name: NAME });
const noMatchQuery = mockSearchRequest({ first_name: ANOTHER_NAME });
const partialMatchQuery = mockSearchRequest({ first_name: NAME_PARTIAL });
const onlyOneFieldMatchingQuery = mockSearchRequest({
  first_name: NAME,
  phone: ANOTHER_PHONE,
});
const matchingMultiFieldQuery = mockSearchRequest({
  first_name: NAME,
  phone: PHONE,
});
const partialMatchMultiFieldQuery = mockSearchRequest({
  first_name: NAME_PARTIAL,
  phone: PHONE_PARTIAL,
});

const searchAndPaginateAsync = (model, req) =>
  new Promise((resolve, reject) => {
    filterAndPaginate(model, req).exec((err, results) => {
      if (err) reject(err);
      resolve(results);
    });
  });

const expectResultsToBeAccurate = (existing, results) => {
  const count = existing.length;
  expect(results.length).toEqual(count);
  expect(collectionToObject(results)).toEqual(
    expect.arrayContaining(collectionToObject(existing)),
  );
};

const expectQueryToBeAccurate = (result, queryParams, overrides = {}) => {
  const params = { ...queryParams, ...overrides };
  const expected = Object.keys(params).map((key) => {
    return {
      [key]: { $regex: new RegExp(params[key], 'gi') },
    };
  });
  expect(result.$or).toEqual(expected);
};

describe('utils - search.js', () => {
  let existing;

  before(async () => {
    await removeAllGroupsAndUsers();
    existing = await createUser(
      [],
      {
        first_name: NAME,
        phone: PHONE,
      },
      3,
    );
  });

  describe('getSearchQuery', () => {
    it('should return an empty object when there are no parameters', () => {
      const req = mockSearchRequest({});
      expect(getSearchQuery(req)).toEqual({});
    });

    it('should return an object with a $or query with all query params', () => {
      const query = { name: 'foo', email: 'bar' };
      const req = mockSearchRequest(query);
      const result = getSearchQuery(req);
      expectQueryToBeAccurate(result, query);
    });

    it('should apply overrides', () => {
      const query = { name: 'foo', email: 'bar' };
      const overrides = { name: 'baz', username: 'superuser' };
      const req = mockSearchRequest(query);
      const result = getSearchQuery(req, overrides);
      expectQueryToBeAccurate(result, query, overrides);
    });

    it('should include otherFilters', () => {
      const req = mockSearchRequest();
      const otherFilters = { confirmed: true };
      const result = getSearchQuery(req, {}, otherFilters);
      expect(result.confirmed).toEqual(true);
    });

    it('should remove the page parameter if it exists', () => {
      const query = { name: 'foo', page: 2 };
      const req = mockSearchRequest(query);
      const result = getSearchQuery(req);
      delete query.page;
      expectQueryToBeAccurate(result, query);
    });

    it('should remove the perPage parameter if it exists', () => {
      const query = { name: 'foo', perPage: 10 };
      const req = mockSearchRequest(query);
      const result = getSearchQuery(req);
      delete query.perPage;
      expectQueryToBeAccurate(result, query);
    });

    it('should exclude any filters with value undefined', () => {
      const query = { name: 'foo', username: undefined };
      const req = mockSearchRequest(query);
      const result = getSearchQuery(req);
      delete query.username;
      expectQueryToBeAccurate(result, query);
    });

    it('should return all relevant results when used with pagination', (done) => {
      const req = mockSearchRequest({ first_name: NAME });
      const results = User.paginate({
        page: req.query.page || 1,
        perPage: 8,
        maxPages: 10,
        filters: getSearchQuery(req),
      });
      results.exec((err, data) => {
        expectResultsToBeAccurate(existing, data.results);
        done();
      });
    });
  });

  describe('filterModel', () => {
    it('should return empty when there are no matching items', async () => {
      const results = await filterModel(User, noMatchQuery).exec();
      expect(results).toEqual([]);
    });

    it('should search correctly so long as one field matches', async () => {
      const results = await filterModel(User, onlyOneFieldMatchingQuery).exec();
      expectResultsToBeAccurate(existing, results);
    });

    it('should return all relevant results when there are items', async () => {
      const results = await filterModel(User, matchingQuery).exec();
      expectResultsToBeAccurate(existing, results);
    });

    it('should search by partial values of a field', async () => {
      const results = await filterModel(User, partialMatchQuery).exec();
      expectResultsToBeAccurate(existing, results);
    });

    it('should search by more than one field', async () => {
      const results = await filterModel(User, matchingMultiFieldQuery).exec();
      expectResultsToBeAccurate(existing, results);
    });

    it('should search by partial values of more than one field', async () => {
      const results = await filterModel(
        User,
        partialMatchMultiFieldQuery,
      ).exec();
      expectResultsToBeAccurate(existing, results);
    });
  });

  describe('filterAndPaginate', () => {
    it('should return empty when there are no matching items', async () => {
      const results = await searchAndPaginateAsync(User, noMatchQuery);
      expect(results.results).toEqual([]);
    });

    it('should search correctly so long as one field matches', async () => {
      const results = await searchAndPaginateAsync(
        User,
        onlyOneFieldMatchingQuery,
      );
      expectResultsToBeAccurate(existing, results.results);
    });

    it('should return all relevant results when there are items', async () => {
      const results = await searchAndPaginateAsync(User, matchingQuery);
      expectResultsToBeAccurate(existing, results.results);
    });

    it('should search by partial values of a field', async () => {
      const results = await searchAndPaginateAsync(User, partialMatchQuery);
      expectResultsToBeAccurate(existing, results.results);
    });

    it('should search by more than one field', async () => {
      const results = await searchAndPaginateAsync(
        User,
        matchingMultiFieldQuery,
      );
      expectResultsToBeAccurate(existing, results.results);
    });

    it('should search by partial values of more than one field', async () => {
      const results = await searchAndPaginateAsync(
        User,
        partialMatchMultiFieldQuery,
      );
      expectResultsToBeAccurate(existing, results.results);
    });
  });
});
