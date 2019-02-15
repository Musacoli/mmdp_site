import * as types from '../../../constants/pillar/pillar';

// PILLAR ONE

export const createPillarOne = (payload) => ({
  type: types.CREATE_PILLAR_ONE,
  payload,
});

export const getPillarOne = () => {
  return { type: types.GET_PILLAR_ONE, pillarNumber: 1 };
};

export const updatePillarOne = (payload) => ({
  type: types.UPDATE_PILLAR_ONE,
  payload,
});

// PILLAR TWO

export const createPillarTwo = (payload) => ({
  type: types.CREATE_PILLAR_TWO,
  payload,
});

export const getPillarTwo = () => {
  return { type: types.GET_PILLAR_TWO, pillarNumber: 2 };
};

export const updatePillarTwo = (payload) => ({
  type: types.UPDATE_PILLAR_TWO,
  payload,
});

// PILLAR THREE

export const createPillarThree = (payload) => ({
  type: types.CREATE_PILLAR_THREE,
  payload,
});

export const getPillarThree = () => {
  return { type: types.GET_PILLAR_THREE, pillarNumber: 3 };
};

export const updatePillarThree = (payload) => ({
  type: types.UPDATE_PILLAR_THREE,
  payload,
});

// PILLAR FOUR

export const createPillarFour = (payload) => ({
  type: types.CREATE_PILLAR_FOUR,
  payload,
});

export const getPillarFour = () => {
  return { type: types.GET_PILLAR_FOUR, pillarNumber: 4 };
};

export const updatePillarFour = (payload) => ({
  type: types.UPDATE_PILLAR_FOUR,
  payload,
});
