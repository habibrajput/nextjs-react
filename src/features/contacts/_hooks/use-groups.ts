'use client';

import { useQuery } from '@tanstack/react-query';
import { commonApiServices } from '@/services/commonApiServices';

const fetchGroups = async () => {
    return await commonApiServices.get('/groups/get-all-group-names');
};

const useGroups = () => {
    return useQuery({
        queryKey: ['data-table-group'],
        queryFn: () => fetchGroups(),
    });
};

export { useGroups, fetchGroups };
