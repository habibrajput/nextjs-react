import React, { Suspense } from 'react';
import { Icons } from '@/components/icons';
import {
  OverviewCards,
  OverviewCardsLoading
} from '@/components/overview-cards';

const fetchContactOverData = (): Promise<any> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          title: 'Total Customers',
          description: 'Number of customers',
          icon: Icons.iconTrendingUp,
          value: '1,250'
        },
        {
          title: 'New Customers',
          description: 'Customers added this month',
          icon: Icons.iconTrendingDown,
          value: '1,234'
        },
        {
          title: 'Active Accounts',
          description: 'Currently active accounts',
          icon: Icons.iconTrendingUp,
          value: '45,678'
        },
        {
          title: 'Growth Rate',
          description: 'Monthly growth rate',
          icon: Icons.iconTrendingUp,
          value: '4.5%'
        }
      ]);
    }, 1000);
  });
};

const OverviewCardsDetails = async () => {
  const infoCards = await fetchContactOverData();
  return <OverviewCards infoCards={infoCards} />;
};

export const ContactOverviewCards = () => {
  return (
    <Suspense fallback={<OverviewCardsLoading />}>
      <OverviewCardsDetails />
    </Suspense>
  );
};
