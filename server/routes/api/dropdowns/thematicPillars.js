import keystone from 'keystone';
import { sprintf } from 'sprintf-js';
import responseMessage from '../../../constants/responseMessage';
import responseCodes from '../../../constants/responseCodes';

export const ThematicPillars = () => keystone.list('ThematicPillarDropdown');
export const StakeholderAddress = () => keystone.list('StakeholderAddress');

export const create = async (req, res) => {
  try {
    const thematicPillars = await ThematicPillars().model.insertMany(
      req.body.data,
    );
    return res.status(201).json({
      message: sprintf(
        responseMessage.RESOURCE_CREATED,
        `${req.body.data.length} thematic pillar(s)`,
      ),
      data: thematicPillars,
    });
  } catch (error) {
    return res.sendError(
      responseMessage.INTERNAL_SERVER_ERROR,
      responseCodes.SERVER_ERROR,
      error,
    );
  }
};

export const get = async (req, res) => {
  const { id } = req.params;
  try {
    const thematicPillar = await ThematicPillars().model.findById(id);
    if (!thematicPillar)
      return res.sendError(
        sprintf(responseMessage.RESOURCE_NOT_FOUND, 'Thematic pillar'),
        responseCodes.NOT_FOUND,
      );
    return res.sendSuccess({ thematicPillar });
  } catch (error) {
    res.sendError(
      responseMessage.INTERNAL_SERVER_ERROR,
      responseCodes.SERVER_ERROR,
      error,
    );
  }
};

export const list = async (req, res) => {
  try {
    const data = await ThematicPillars().model.find();
    return res.sendSuccess({ data });
  } catch (error) {
    res.sendError(
      responseMessage.INTERNAL_SERVER_ERROR,
      responseCodes.SERVER_ERROR,
      error,
    );
  }
};

export const update = async (req, res) => {
  const { id } = req.params;
  const { data } = req.body;
  try {
    const thematicPillar = await ThematicPillars().model.findById(id);
    if (!thematicPillar) {
      return res.sendError(
        sprintf(responseMessage.RESOURCE_NOT_FOUND, 'Thematic pillar'),
        responseCodes.NOT_FOUND,
      );
    }
    const updatedThematicPillar = await ThematicPillars().model.update(
      { _id: id },
      {
        pillarTitle: data.pillarTitle,
        description: data.description,
      },
    );
    res.sendSuccess(
      { thematicPillar: updatedThematicPillar },
      responseCodes.FOUND,
      sprintf(responseMessage.RESOURCE_UPDATED, 'Thematic pillars'),
    );
  } catch (error) {
    res.sendError(
      responseMessage.INTERNAL_SERVER_ERROR,
      responseCodes.SERVER_ERROR,
      error,
    );
  }
};

export const updateMany = async (req, res) => {
  try {
    await req.body.data.forEach(async (data) => {
      // update many
      await ThematicPillars().model.update(
        { _id: data._id },
        {
          pillarTitle: data.pillarTitle,
          description: data.description,
        },
        { upsert: true },
      );
    });
    res.sendSuccess(
      '',
      responseCodes.FOUND,
      sprintf(responseMessage.RESOURCE_UPDATED, 'Thematic pillars'),
    );
  } catch (error) {
    res.sendError(
      responseMessage.INTERNAL_SERVER_ERROR,
      responseCodes.SERVER_ERROR,
      error,
    );
  }
};

export const stateInModel = (model, id) => {
  const results = model()
    .model.find()
    .where('pillarName', id)
    .lean();
  return results;
};

export const remove = async (req, res) => {
  const { id } = req.params;
  const errorMessage = [];
  Promise.all([
    stateInModel(StakeholderAddress, id).then((results) => {
      if (results.length > 0) {
        const message = `You cannot delete this thematic pillar. It is already assigned to ${
          results.length
        } stakeholder(s) `;
        errorMessage.push(message);
      }
    }),
  ]).then(async () => {
    if (errorMessage.length > 0) {
      return res.sendError(errorMessage[0], 400, errorMessage[0]);
    }
    try {
      const thematicPillar = await ThematicPillars().model.findByIdAndRemove(
        id,
      );
      if (!thematicPillar)
        return res.sendError(
          sprintf(
            responseMessage.RESOURCE_T0_DELETE_NOT_FOUND,
            'Thematic pillar',
          ),
          responseCodes.NOT_FOUND,
        );
      return res.sendSuccess(
        undefined,
        responseCodes.FOUND,
        sprintf(responseMessage.RESOURCE_DELETED, 'Thematic pillar'),
      );
    } catch (error) {
      res.sendError(responseMessage.INTERNAL_SERVER_ERROR, 500, error);
    }
  });
};
