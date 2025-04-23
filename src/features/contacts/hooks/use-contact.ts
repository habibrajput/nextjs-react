import { useState, useEffect } from 'react';

const Icons = {
    iconTrendingUp: '📈',
    iconTrendingDown: '📉',
};

// Mock API function for fetching contact overview data
const fetchContactOverData = (): Promise<any> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                {
                    title: 'Total Customers',
                    description: 'Number of customers in the system',
                    icon: Icons.iconTrendingUp,
                    value: '1,250',
                },
                {
                    title: 'New Customers',
                    description: 'Customers added this month',
                    icon: Icons.iconTrendingDown,
                    value: '1,234',
                },
                {
                    title: 'Active Accounts',
                    description: 'Currently active accounts',
                    icon: Icons.iconTrendingUp,
                    value: '45,678',
                },
                {
                    title: 'Growth Rate',
                    description: 'Monthly growth rate',
                    icon: Icons.iconTrendingUp,
                    value: '4.5%',
                },
            ]);
        }, 2000);
    });
};

// Custom Hook: useContactOverview
export const useContactOverview = () => {
    const [data, setData] = useState<any[] | null>(null); 
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Fetch data when the component using this hook mounts
        fetchContactOverData()
            .then((response) => {
                setData(response); 
                setLoading(false);
            })
            .catch((err) => {
                setError('Failed to fetch contact overview data.'); 
                setLoading(false); 
            });
    }, []);

    // Return the states for data, loading, and error to the component
    return { data, loading, error };
};