import baseAPI, { server } from '../keys';
import { formatObjectToParams } from '../helpers';

const URL = `${baseAPI}/api/v1`;

export const getStates = (payload) => {
  return server.get(
    `${URL}/states?${formatObjectToParams({
      page: payload.page,
      countryName: payload.country || payload.countryName,
      perPage: 10,
    })}`,
  );
};
export const getCountries = (payload) => {
  return server.get(
    `${URL}/national-matrix?${formatObjectToParams({
      page: payload.page,
      perPage: 10,
    })}`,
  );
};
