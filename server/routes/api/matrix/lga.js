import keystone from 'keystone';
import { sprintf } from 'sprintf-js';
import jsdom from 'jsdom';
import * as d3 from 'd3';
import modelHelper from '../../../helpers/modelHelper';
import responseMessage from '../../../constants/responseMessage';
import { filterAndPaginate, getPaginationData } from '../../../utils/search';

export const StateSVG = () => keystone.list('StateSVG');
export const StateMap = () => keystone.list('StateMap');
const LGABoundary = () => keystone.list('lgaboundary');

const { JSDOM } = jsdom;

const getMapData = (url) => {
  return JSDOM.fromURL(url).then((dom) => {
    const doc = dom.window.document;
    const states = d3
      .select(doc)
      .selectAll('path')
      .nodes();
    return states.map((item) => {
      const state = d3.select(item);
      return {
        state: state.attr(':fme:RelatedStateAdministration'),
        uniqueId: state.attr(':fme:ID'),
        name: state.attr(':fme:LGA_Name'),
        path: state.attr('d'),
        lga: 'lga',
      };
    });
  });
};

const addLGA = (data) => {
  return LGABoundary().model.insertMany(data);
};

export const update = async (req, res) => {
  const StateSVGMap = new StateSVG().model();
  try {
    const newStateSVG = await modelHelper.process(StateSVGMap, req); // add state SVG map into StateSVG model
    const url = newStateSVG.StateSVGFile.url;
    const urlData = { body: { url } };
    const getStateData = (await getMapData(url)) || [];
    // add LGA's to LGA models
    const addlga = (await addLGA(getStateData)) || [];
    if (!addlga) {
      return res.sendError(
        sprintf(responseMessage.RESOURCE_NOT_FOUND, 'Local Government Area'),
        404,
      );
    }
    const relatedState = getStateData[0].state;
    const getRelatedState = await StateMap().model.findOne({
      name: relatedState,
    });
    if (getRelatedState) {
      const updatedState = await modelHelper.process(getRelatedState, urlData);
      return res.sendSuccess(
        {
          name: updatedState,
        },
        200,
        sprintf(responseMessage.RESOURCE_CREATED, 'State SVG Map'),
      );
    }
    return res.sendError(
      sprintf(responseMessage.RESOURCE_NOT_FOUND, 'State'),
      404,
    );
  } catch (error) {
    return res.sendError(responseMessage.INTERNAL_SERVER_ERROR, 500, error);
  }
};

export const list = async (req, res) => {
  const otherFilters = {};
  filterAndPaginate(LGABoundary(), req, {}, otherFilters).exec(
    async (err, data) => {
      if (err) return res.status(400).json(err);
      res.status(200).send({
        status: 'success',
        message: sprintf(responseMessage.RESOURCE_FETCHED, 'states'),
        data: data.results,
        pagination: getPaginationData(data),
      });
    },
  );
};
