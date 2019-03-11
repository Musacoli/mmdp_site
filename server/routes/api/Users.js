import User from '../../models/User';
import username from '../../utils/usernameGenerator';
import { sendConfirmationEmail } from '../../utils/mailer';
import resp, {
  fields,
  exclude,
  status,
} from '../../constants/controllerConstants';
import { getPaginationData, getSearchQuery } from '../../utils/search';

const { SUCCESS, ERROR, FAIL } = status;

export const createUser = (req, res) => {
  const user = User.model();

  const data = req.body;
  data.username = username(req.body.email);
  user.getUpdateHandler(req).process(data, (err) => {
    if (err) return res.json({ error: 'err' });
    sendConfirmationEmail(data);
    return res.status(201).json({
      status: SUCCESS,
      message: resp.accountCreated,
    });
  });
};

export const confirmed = (req, res) => {
  return res.status(200).json({
    status: SUCCESS,
    message: resp.verified,
  });
};

export const updateEmail = (req, res) => {
  return res.json({
    status: SUCCESS,
    message: resp.emailUpdated,
  });
};

export const deleteUser = async (req, res) => {
  await User.model
    .findOne({ username: req.params.username })
    .exec((error, user) => {
      if (!user)
        return res.status(404).json({
          status: ERROR,
          message: resp.notFound,
        });
      if (req.user.username === user.username) {
        return res.status(400).json({
          message: 'You are not authorized to delete your own account',
        });
      }
      user.remove((err) => {
        if (err)
          return res.status(500).json({
            status: ERROR,
            message: resp.tryAgain,
          });
        return res.status(200).json({
          status: SUCCESS,
          message: resp.userDeleted,
        });
      });
    });
};

export const fetchUser = async (req, res) => {
  await User.model
    .findOne(
      {
        username: req.params.username,
      },
      fields,
    )
    .populate('groups')
    .exec((err, user) => {
      if (!user)
        return res.status(404).json({
          status: FAIL,
          message: resp.notFound,
        });

      return res.json({
        status: SUCCESS,
        user,
      });
    });
};

export const fetchAllUsers = async (req, res) => {
  const groupsQuery = req.query.groups;

  delete req.query.groups;

  const baseQuery = getSearchQuery(req);

  const filters = groupsQuery
    ? { $and: [baseQuery, { groups: groupsQuery }] }
    : baseQuery;

  User.paginate({
    page: req.query.page || 1,
    perPage: req.query.perPage || 8,
    maxPages: 10,
    filters,
  })
    .populate('groups', '-createdAt -__v -permissions')
    .select(exclude)
    .exec((err, data) => {
      if (err)
        return res.status(500).json({
          status: FAIL,
          message: resp.tryAgain,
        });
      const allUsers = data.results.filter(
        (user) => user.email !== req.user.email,
      );
      return res.json({
        status: SUCCESS,
        users: allUsers,
        pagination: getPaginationData(data),
      });
    });
};

export const edited = (req, res) => {
  return res.json({
    status: SUCCESS,
    message: resp.detailsUpdated,
  });
};
