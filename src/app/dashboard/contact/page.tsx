import PageContainer from '@/components/layout/page-container';
import { Heading } from '@/components/ui/heading';
import { DataTableSkeleton } from '@/components/ui/table/data-table-skeleton';
import ProductListingPage from '@/features/contacts/components/product-listing';
import { searchParamsCache, serialize } from '@/lib/searchparams';
import { SearchParams } from 'nuqs/server';
import { Suspense } from 'react';
import { OverviewCards } from '@/components/overview-cards';
import AddContactWrapper from '@/features/contacts/components/add-contact/add-contact-drawer';
import { Icons } from '@/components/icons';

export const metadata = {
  title: 'Dashboard: Contacts'
};

const infoCards: any = [
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
];

type pageProps = {
  searchParams: Promise<SearchParams>;
};

export default async function Page(props: pageProps) {
  const searchParams = await props.searchParams;
  // Allow nested RSCs to access the search params (in a type-safe way)
  searchParamsCache.parse(searchParams);

  // This key is used for invoke suspense if any of the search params changed (used for filters).
  const key = serialize({ ...searchParams });

  return (
    <PageContainer scrollable={false}>
      <div className='flex flex-1 flex-col space-y-4'>
        <div className='flex items-start justify-between'>
          <Heading
            title='Customers'
            description='Manage customers (Server side table functionalities.)'
          />
          <AddContactWrapper />
        </div>
        <OverviewCards infoCards={infoCards} />
        <Suspense
          key={key}
          fallback={
            <DataTableSkeleton columnCount={5} rowCount={8} filterCount={2} />
          }
        >
          <ProductListingPage />
        </Suspense>
      </div>
    </PageContainer>
  );
}
