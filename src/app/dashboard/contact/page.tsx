import { Suspense } from 'react';
import { SearchParams } from 'nuqs/server';
import { Heading } from '@/components/ui/heading';
import PageContainer from '@/components/layout/page-container';
import { searchParamsCache, serialize } from '@/lib/searchparams';
import { DataTableSkeleton } from '@/components/data-table/data-table-skeleton';
import ProductListingPage from '@/features/contacts/_components/product-listing';
import AddContactWrapper from '@/features/contacts/_components/create-and-update/add-contact-drawer';

export const metadata = {
  title: 'Dashboard: Contacts'
};

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

        <Suspense
          key={key}
          fallback={
            <DataTableSkeleton
              columnCount={7}
              filterCount={2}
              cellWidths={[
                "10rem",
                "30rem",
                "10rem",
                "10rem",
                "6rem",
                "6rem",
                "6rem",
              ]}
              shrinkZero
            />
          }
        >
          <ProductListingPage />
        </Suspense>
      </div>
    </PageContainer>
  );
}
