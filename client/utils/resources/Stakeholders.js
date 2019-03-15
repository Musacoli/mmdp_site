import NigerianStates from '../NigerianStates';
import baseAPI, { server } from '../keys';
import { formatObjectToParams } from '../helpers';

const URL = `${baseAPI}/api/v1`;

export const searchStakeHoldersDirectory = (actionPayload) => {
  const { payload } = actionPayload;
  return server.get(
    `${URL}/stakeholders-directory?${formatObjectToParams({
      page: payload.page,
      organisationName: payload.searchQuery,
      perPage: 9,
    })}`,
  );
};

export const fetchNigerianStates = () =>
  // iterate through the list and return the name and key
  NigerianStates.map((item) => ({
    key: item.state.id,
    text: item.state.name,
    value: item.state.name,
  }));

export const fetchNigerianStatesLGAs = (states) => {
  // first determine the states for which to return the LGAs
  const SourceList = () => {
    if (states.payload === undefined || states.payload.length === 0) {
      return NigerianStates; // if none are provided return all
    } // else return LGAs for only the selected states
    const temp = [];
    temp.push(states.payload);
    const custom = [];
    temp.forEach((value) => {
      const result = NigerianStates.filter(
        (state) => state.state.name === value,
      );
      custom.push(...result);
    });
    return custom;
  };
  const stateOptions = SourceList().map((item) => {
    const LGAs = item.state.locals;
    return LGAs.map((lga) => ({
      key: lga.id + lga.name,
      text: lga.name,
      value: lga.name,
    }));
  });
  return [].concat(...stateOptions);
};
