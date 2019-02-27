import keystone from 'keystone';

const AcStates = () => keystone.list('BeneficiaryServiceCommunity');

export const list = async (req, res) => {
  const Allstates = AcStates().model.find();
  const states = [];
  Allstates.populate('stateId', ['stateName']).exec((err, response) => {
    if (err) return res.status(400).json(err);
    response.forEach((result) => {
      states.push(result.stateId.stateName);
    });
    res.status(200).json({
      states,
    });
  });
};
