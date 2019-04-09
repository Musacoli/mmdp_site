import baseAPI, { server } from '../keys';
import { formatObjectToParams } from '../helpers';

const url = `${baseAPI}/api/v1`;
export const LGAMap = {
  update: (data) => server.put(`${url}/matrix/state`, data),
};

export const getLGAs = (payload) => {
  return server.get(
    `${url}/matrix/lga?${formatObjectToParams({
      page: payload.page,
      state: payload.state,
      perPage: 10,
    })}`,
  );
};

export const updateLGA = (payload) => {
  return server.put(
    `${URL}/lga?${formatObjectToParams({
      uniqueId: payload.uniqueId,
      lga: payload.lga,
    })}`,
  );
};
