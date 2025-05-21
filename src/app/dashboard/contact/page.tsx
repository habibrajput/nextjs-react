import { Suspense } from 'react';
import { SearchParams } from 'nuqs/server';
import { Heading } from '@/components/ui/heading';
import PageContainer from '@/components/layout/page-container';
import { searchParamsCache, serialize } from '@/lib/searchparams';
import { DataTableSkeleton } from '@/components/ui/table/data-table-skeleton';
import ProductListingPage from '@/features/contacts/components/product-listing';
import AddContactWrapper from '@/features/contacts/components/add-contact/add-contact-drawer';
import { ContactOverviewCards } from '@/features/contacts/components/contact-overview/overview';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {CircleUserRound, LayoutPanelTop} from 'lucide-react'

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

        {/* <ContactOverviewCards /> */}
        
        <Tabs defaultValue="contacts" className="w-full">
          <TabsList className="h-10 w-fill">
            <TabsTrigger value="contacts">
              <CircleUserRound/>
              Contacts
            </TabsTrigger>
            <TabsTrigger value="segments">
              <LayoutPanelTop/>
              Segments
            </TabsTrigger>
          </TabsList>
          <TabsContent value='contacts' className='overflow-x-auto w-full'>
            Table ...
          </TabsContent>
          <TabsContent value='segments'>
            Segments
          </TabsContent>
        </Tabs>

        <Suspense
          key={key}
          fallback={
            <DataTableSkeleton columnCount={5} rowCount={10} filterCount={2} />
          }
        >
          <ProductListingPage />
        </Suspense>
      </div>
    </PageContainer>
  );
}
