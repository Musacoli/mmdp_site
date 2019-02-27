import expect from 'expect';
import {
  createReturneeServiceCommunities,
  removeAllReturneeServiceCommunities,
} from '../../../../helpers/resources/stakeholdersDirectory/beneficiaryServiceCommunities';
import { removeAllStakeholders } from '../../../../helpers/resources/stakeholdersDirectory/stakeholders';
import { removeAllBeneficiaryServices } from '../../../../helpers/resources/stakeholdersDirectory/beneficiaries';

describe('add beneficiary Service Communiity', () => {
  it('should add a new beneficiary service Community', async () => {
    await removeAllStakeholders();
    await removeAllBeneficiaryServices();
    await removeAllReturneeServiceCommunities();
    const communities = await createReturneeServiceCommunities();
    expect(communities._id).toBeDefined();
  });
});
