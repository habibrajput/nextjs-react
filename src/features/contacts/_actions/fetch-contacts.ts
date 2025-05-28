import { apiServices } from '@/services/apiServices';

const fetchContacts = async (
    authToken: string
) => {
    return await apiServices.get('/contacts', authToken);
};

export { fetchContacts };
