import keystone from 'keystone';
import { sprintf } from 'sprintf-js';
import jsdom from 'jsdom';
import * as d3 from 'd3';
import modelHelper from '../../../helpers/modelHelper';
import responseMessage from '../../../constants/responseMessage';
import { filterAndPaginate, getPaginationData } from '../../../utils/search';

const { JSDOM } = jsdom;

const getMapData = (file, country) => {
  return JSDOM.fromFile(file).then((dom) => {
    const doc = dom.window.document;
    const states = d3
      .select(doc)
      .selectAll('path')
      .nodes();
    return states.map((item) => {
      const state = d3.select(item);
      return {
        uniqueId: state.attr(':fme:id'),
        name: state.attr(':fme:statename'),
        path: state.attr('d'),
        countryName: country,
      };
    });
  });
};

export const CountryMap = () => keystone.list('CountryMap');
const StateMap = () => keystone.list('StateMap');

export const create = async (req, res) => {
  const path = req.body.files.countrySvgFile.path || '';
  const countryName = req.body.countryName || '';
  const NationalSvgItem = new CountryMap().model();
  const countries = CountryMap()
    .model.find()
    .lean()
    .where('countryName', countryName);
  try {
    await countries.exec(async (err, data) => {
      if (data.length > 0) {
        return res.status(400).json({
          message: 'Country name already exists',
          data,
        });
      }
      const newNationalSvg = await modelHelper.process(NationalSvgItem, req);
      if (!newNationalSvg.countrySvgFile) {
        res.sendError(responseMessage.INTERNAL_SERVER_ERROR, 500);
      }
      const country = newNationalSvg.countryName;
      const states = (await getMapData(path, country)) || [];
      StateMap()
        .model.insertMany(states)
        .then(() => {
          const count =
            states.length > 1 ? `${states.length} states ` : '1 state';
          return res.status(201).json({
            message: `${count} successfully added`,
            newNationalSvg,
          });
        })
        .catch((error) => {
          return res.sendError(
            responseMessage.INTERNAL_SERVER_ERROR,
            500,
            error,
          );
        });
    });
  } catch (error) {
    return res.sendError(responseMessage.INTERNAL_SERVER_ERROR, 500, error);
  }
};

export const list = async (req, res) => {
  const otherFilters = {};
  filterAndPaginate(CountryMap(), req, {}, otherFilters).exec(
    async (err, data) => {
      if (err) return res.status(400).json(err);
      res.status(200).send({
        status: 'success',
        message: sprintf(responseMessage.RESOURCE_FETCHED, 'countries'),
        data: data.results,
        pagination: getPaginationData(data),
      });
    },
  );
};

export const update = async (req, res) => {
  const countryName = req.body.countryName || '';
  const path = req.body.files.countrySvgFile.path;
  try {
    const countryMap = await CountryMap().model.findOne({ countryName });
    const states = await StateMap().model.find({ countryName });
    await StateMap().model.remove({ _id: { $in: states } });
    if (!countryMap.countrySvgFile) {
      return res.sendError(
        sprintf(responseMessage.RESOURCE_NOT_FOUND, 'country map'),
        404,
      );
    }
    const updatedCountryMap = await modelHelper.process(countryMap, req);
    if (!updatedCountryMap) {
      res.sendError(responseMessage.INTERNAL_SERVER_ERROR, 500);
    }
    const newStates = (await getMapData(path, countryName)) || [];
    StateMap()
      .model.insertMany(newStates)
      .then(() => {
        const count =
          states.length > 1 ? `${states.length} states ` : '1 state';
        return res.status(200).json({
          message: `Country map updated successfully. ${count} successfully added`,
          data: updatedCountryMap,
        });
      });
  } catch (error) {
    res.sendError(responseMessage.INTERNAL_SERVER_ERROR, 500, error);
  }
};