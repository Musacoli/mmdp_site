import {
  pillarOneReducer,
  pillarTwoReducer,
  pillarThreeReducer,
  pillarFourReducer,
} from '../../../store/reducers/pillar/pillar';

import * as types from '../../../constants/pillar/pillar';

describe('Pillar one reducer test', () => {
  const pillarOneInitialState = {
    // error: [{ title: " "}],
    error: null,
    loading: true,
  };

  it('should update store', () => {
    expect(
      pillarOneReducer(pillarOneInitialState, {
        type: types.PILLAR_MESSAGE_SUCCESS_ONE,
      }).loading,
    ).toEqual(false);
  });

  it('should update store', () => {
    expect(
      pillarOneReducer(pillarOneInitialState, {
        type: types.PILLAR_MESSAGE_LOADING_ONE,
      }).loading,
    ).toEqual(true);
  });

  it('should update store', () => {
    expect(
      pillarOneReducer(pillarOneInitialState, {
        type: types.PILLAR_MESSAGE_FAILURE_ONE,
      }).loading,
    ).toEqual(false);
  });
});

describe('Pillar two reducer test', () => {
  const pillarTwoInitialState = {
    // error: [{ title: " "}],
    error: null,
    loading: true,
  };

  it('should update store', () => {
    expect(
      pillarTwoReducer(pillarTwoInitialState, {
        type: types.PILLAR_MESSAGE_SUCCESS_TWO,
      }).loading,
    ).toEqual(false);
  });

  it('should update store', () => {
    expect(
      pillarTwoReducer(pillarTwoInitialState, {
        type: types.PILLAR_MESSAGE_LOADING_TWO,
      }).loading,
    ).toEqual(true);
  });

  it('should update store', () => {
    expect(
      pillarTwoReducer(pillarTwoInitialState, {
        type: types.PILLAR_MESSAGE_FAILURE_TWO,
      }).loading,
    ).toEqual(false);
  });
});

describe('Pillar three reducer test', () => {
  const pillarThreeInitialState = {
    // error: [{ title: " "}],
    error: null,
    loading: true,
  };

  it('should update store', () => {
    expect(
      pillarThreeReducer(pillarThreeInitialState, {
        type: types.PILLAR_MESSAGE_SUCCESS_THREE,
      }).loading,
    ).toEqual(false);
  });

  it('should update store', () => {
    expect(
      pillarThreeReducer(pillarThreeInitialState, {
        type: types.PILLAR_MESSAGE_LOADING_THREE,
      }).loading,
    ).toEqual(true);
  });

  it('should update store', () => {
    expect(
      pillarThreeReducer(pillarThreeInitialState, {
        type: types.PILLAR_MESSAGE_FAILURE_THREE,
      }).loading,
    ).toEqual(false);
  });
});

describe('Pillar four reducer test', () => {
  const pillarFourInitialState = {
    // error: [{ title: " "}],
    error: null,
    loading: true,
  };

  it('should update store', () => {
    expect(
      pillarFourReducer(pillarFourInitialState, {
        type: types.PILLAR_MESSAGE_SUCCESS_FOUR,
      }).loading,
    ).toEqual(false);
  });

  it('should update store', () => {
    expect(
      pillarFourReducer(pillarFourInitialState, {
        type: types.PILLAR_MESSAGE_LOADING_FOUR,
      }).loading,
    ).toEqual(true);
  });

  it('should update store', () => {
    expect(
      pillarFourReducer(pillarFourInitialState, {
        type: types.PILLAR_MESSAGE_FAILURE_FOUR,
      }).loading,
    ).toEqual(false);
  });
});
