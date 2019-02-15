import * as types from '../../../../constants/pillar/pillar';
import * as pillarActions from '../../../../store/actions/pillar/pillar';

describe('Pillar action creators', () => {
  // Pillar one
  it('should disptch CREATE_PILLAR_ONE', () => {
    expect(pillarActions.createPillarOne({}).type).toEqual(
      types.CREATE_PILLAR_ONE,
    );
  });
  it('should dispatch GET_PILLAR_ONE', () => {
    expect(pillarActions.getPillarOne({}).type).toEqual(types.GET_PILLAR_ONE);
  });
  it('should dispatch UPDATE_PILLAR_ONE', () => {
    expect(pillarActions.updatePillarOne({}).type).toEqual(
      types.UPDATE_PILLAR_ONE,
    );
  });

  // Pillar two
  it('should dispatch CREATE_PILLAR_TWO', () => {
    expect(pillarActions.createPillarTwo({}).type).toEqual(
      types.CREATE_PILLAR_TWO,
    );
  });
  it('should dispatch GET_PILLAR_TWO', () => {
    expect(pillarActions.getPillarTwo({}).type).toEqual(types.GET_PILLAR_TWO);
  });
  it('should dispatch UPDATE_PILLAR_TWO', () => {
    expect(pillarActions.updatePillarTwo({}).type).toEqual(
      types.UPDATE_PILLAR_TWO,
    );
  });

  // Pillar three
  it('should disptch CREATE_PILLAR_THREE', () => {
    expect(pillarActions.createPillarThree({}).type).toEqual(
      types.CREATE_PILLAR_THREE,
    );
  });
  it('should dispatch GET_PILLAR_THREE', () => {
    expect(pillarActions.getPillarThree({}).type).toEqual(
      types.GET_PILLAR_THREE,
    );
  });
  it('should dispatch UPDATE_PILLAR_THREE', () => {
    expect(pillarActions.updatePillarThree({}).type).toEqual(
      types.UPDATE_PILLAR_THREE,
    );
  });

  // Pillar four
  it('should disptch CREATE_PILLAR_FOUR', () => {
    expect(pillarActions.createPillarFour({}).type).toEqual(
      types.CREATE_PILLAR_FOUR,
    );
  });
  it('should dispatch GET_PILLAR_FOUR', () => {
    expect(pillarActions.getPillarFour({}).type).toEqual(types.GET_PILLAR_FOUR);
  });
  it('should dispatch UPDATE_PILLAR_FOUR', () => {
    expect(pillarActions.updatePillarFour({}).type).toEqual(
      types.UPDATE_PILLAR_FOUR,
    );
  });
});
