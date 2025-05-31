import { toStringQueryParams } from '@/lib/helpers';
import { commonApiServices } from '@/services/commonApiServices';

const getContacts = async (queryParm: object) => {
  console.log('Fetching contacts with query parameters:', toStringQueryParams(queryParm));
  return await commonApiServices.get('/contacts?' + toStringQueryParams(queryParm));
};

const getGroups = async () => {
  return await commonApiServices.get('/groups/get-all-group-names');
};

export { getContacts, getGroups };
