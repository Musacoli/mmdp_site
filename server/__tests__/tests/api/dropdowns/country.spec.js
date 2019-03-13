import expect from 'expect';
import { app, removeAllGroupsAndUsers } from '../../../helpers/commons/base';

const route = '/api/v1/dropdowns-Country/';

const apiCreateCountryDropdown = async (payload) =>
  app.post(route).send(payload);
const apiGetCountryDropdown = () => app.get(route);

describe('Manage Country Dropdown API', () => {
  describe('Create  drop down', () => {
    const countryDropDown = {
      countryName: 'Kenya',
      description: "kenya is investing in ngo's",
    };
    beforeEach(async () => {
      await removeAllGroupsAndUsers();
      await app.loginRandom(['cms.dropdowns.*']);
    });

    it('should fail when creating invalid data for the Country drop down ', async () => {
      const res = await apiCreateCountryDropdown({});
      expect(res.status).toBe(400);
    });

    it('should fail when getting a drop down that doesnt exist', async () => {
      const id = 'random_iasdasbdasbkdasbca';
      const response = await app.get(`/api/v1/dropdowns-country/${id}`);
      expect(response.status).toBe(404);
    });

    it('should fail when deleting a drop down that doesnt exist', async () => {
      const id = 'random_iasdasbdasbkdasbca';
      const response = await app.delete(`/api/v1/dropdowns-country/${id}`);
      expect(response.status).toBe(404);
    });

    it('should fail when updating a drop down that doesnt exist', async () => {
      const id = 'random_iasdasbdasbkdasbca';
      const payload = {
        countryName: 'Ug',
        description: 'We are giving out aid',
      };
      const response = await app
        .put(`/api/v1/dropdowns-country/${id}`)
        .send(payload);
      expect(response.status).toBe(404);
    });

    it('should create the Country drop down ', async () => {
      const res = await apiCreateCountryDropdown(countryDropDown);
      expect(res.status).toBe(201);
      expect(res.body.status).toBe('success');
      expect(res.body.data).toBeDefined();
    });

    it('should get all created Country drop down items ', async () => {
      const res = await apiCreateCountryDropdown(countryDropDown);
      expect(res.status).toBe(201);
      expect(res.body.status).toBe('success');
      expect(res.body.data).toBeDefined();
      const response = await apiGetCountryDropdown();
      expect(response.status).toBe(200);
      expect(response.body.data).toBeDefined();
    });

    it('should get one created Country drop down ', async () => {
      const res = await apiCreateCountryDropdown(countryDropDown);
      expect(res.status).toBe(201);
      expect(res.body.status).toBe('success');

      const id = res.body.data.countryDropDown._id;
      const response = await app.get(`/api/v1/dropdowns-country/${id}`);
      expect(response.status).toBe(200);
      expect(response.body.data).toBeDefined();
    });

    it('should update a  created Country drop down ', async () => {
      const res = await apiCreateCountryDropdown(countryDropDown);
      expect(res.status).toBe(201);
      expect(res.body.status).toBe('success');
      const id = res.body.data.countryDropDown._id;

      const newCountryDropDown = {
        countryName: 'Uganda',
        description: 'Ngos are recieving funds',
      };
      const response = await app
        .put(`/api/v1/dropdowns-country/${id}`)
        .send(newCountryDropDown);
      expect(response.status).toBe(200);
      expect(response.body.data).toBeDefined();
    });

    it('should delete one created Country drop down ', async () => {
      const res = await apiCreateCountryDropdown(countryDropDown);
      expect(res.status).toBe(201);
      expect(res.body.status).toBe('success');

      const id = res.body.data.countryDropDown._id;
      const response = await app.delete(`/api/v1/dropdowns-country/${id}`);
      expect(response.status).toBe(200);
    });
  });
});
