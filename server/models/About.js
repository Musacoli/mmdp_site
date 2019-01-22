import keystone from 'keystone';

const { Types } = keystone.Field;

const About = new keystone.List('About');

About.add({
  creator: { type: Types.Relationship, ref: 'User' },
  about: { type: Types.Html, wysiwyg: true },
  background: { type: Types.Html, wysiwyg: true },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  archived: { type: Boolean, default: false },
});


About.defaultColumns = 'about, background';
About.register();

export default About;
