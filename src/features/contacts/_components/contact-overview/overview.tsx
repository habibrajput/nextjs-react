import React, { Suspense } from 'react';
import { Icons } from '@/components/icons';
import { OverviewCards,OverviewCardsLoading } from '@/components/overview-cards';

const fetchContactOverData = (): Promise<any> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          title: 'Total Customers',
          description: 'Number of customers',
          icon: Icons.info,
          value: '1,250'
        },
        {
          title: 'New Customers',
          description: 'Customers added this month',
          icon: Icons.info,
          value: '1,234'
        },
        {
          title: 'Grouped Contacts',
          description: 'Currently active accounts',
          icon: Icons.info,
          value: '45,678'
        },
        {
          title: 'Un Grouped Contacts',
          description: 'Monthly growth rate',
          icon: Icons.info,
          value: '4.5%'
        }
      ]);
    }, 1000);
  });
};

const OverviewCardsDetails = async () => {
  const contactOverView = await fetchContactOverData();
  return <OverviewCards infoCards={contactOverView} />;
};

export const ContactOverviewCards = () => {
  return (
    <Suspense fallback={<OverviewCardsLoading />}>
      <OverviewCardsDetails />
    </Suspense>
  );
};
