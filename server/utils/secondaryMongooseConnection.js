/* eslint-disable no-console */
import mongoose from 'mongoose';
import keystone from 'keystone';
import { mongodbURL } from '../index';

keystone.mongoose.connection.on('open', async () => {
  mongoose.set('useCreateIndex', true);
  const url = mongodbURL();
  const options = {
    useNewUrlParser: true,
  };
  await mongoose.connect(url, options);
});

mongoose.connection.on('open', () => {
  console.info('secondary connection is active');
});

export default mongoose;
