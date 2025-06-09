import { Heading } from '@/components/ui/heading';
import { ContactsTable } from '@/features/contacts/_components/table/index';
import { FeatureFlagsProvider } from '@/features/contacts/_components/feature-flags-provider';
import { ContactOverviewCards } from '@/features/contacts/_components/contact-overview/overview';
import PageContainer from '@/components/layout/page-container';
import AddContactSheet from '@/features/contacts/_components/create-and-update/add-contact-drawer';
import ContactTableErrorBoundary from '@/features/contacts/_components/error-boundary/table-error-boundary';
import React from 'react';

export const metadata = {
  title: 'Dashboard: Contacts'
};

export default async function Page() {
  return (
    <PageContainer scrollable={true}>
      <div className='flex flex-1 flex-col space-y-4'>
        <div className='flex items-start justify-between'>
          <Heading title='Contacts' />
          <AddContactSheet />
        </div>

        <ContactOverviewCards />

        <ContactTableErrorBoundary>
          <FeatureFlagsProvider>
            {/* <Suspense
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
            >  */}
            <ContactsTable />
            {/* </Suspense> */}
          </FeatureFlagsProvider>
        </ContactTableErrorBoundary>
      </div>
    </PageContainer>
  );
}
