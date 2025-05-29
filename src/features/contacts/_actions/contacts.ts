import { commonApiServices } from '@/services/commonApiServices';

const getContacts = async (parms: any) => {
  return await commonApiServices.get('/contacts?' + parms);
};

const getGroups = async () => {
  return await commonApiServices.get('/groups/get-all-group-names');
};

export { getContacts, getGroups };
