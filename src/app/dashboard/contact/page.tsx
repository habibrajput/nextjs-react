import { Suspense } from 'react';
import { SearchParams } from 'nuqs/server';
import { Heading } from '@/components/ui/heading';
import PageContainer from '@/components/layout/page-container';
import { searchParamsCache } from '@/lib/searchparams';
import { DataTableSkeleton } from '@/components/data-table/data-table-skeleton';
import AddContactWrapper from '@/features/contacts/_components/create-and-update/add-contact-drawer';
import { ContactsTable } from '@/features/contacts/_components/contact-table';
import { FeatureFlagsProvider } from '@/features/contacts/_components/feature-flags-provider';
import { getContacts, getGroups } from '@/features/contacts/_actions/fetch-contacts';
import { ContactsErrorBoundary } from '@/features/contacts/_components/contacts-error-boundary';
export const metadata = {
  title: 'Dashboard: Contacts'
};

type pageProps = {
  searchParams: Promise<SearchParams>;
};

export default async function Page(props: pageProps) {

  const searchParams = await props.searchParams;
  const search = searchParamsCache.parse(searchParams);

  const promises = Promise.all([
    getContacts({
      ...search,
    }),
    getGroups()
  ]);

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
        
        <FeatureFlagsProvider>
          {/* <ContactsErrorBoundary> */}
            <Suspense
              fallback={
                <DataTableSkeleton
                  columnCount={10}
                  filterCount={4}
                  cellWidths={[
                    "10rem",
                    "10rem",
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
              <ContactsTable promises={promises} />
            </Suspense>
          {/* </ContactsErrorBoundary> */}
        </FeatureFlagsProvider>
      </div>
    </PageContainer>
  );
}
