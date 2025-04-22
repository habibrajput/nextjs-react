'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { IconPlus } from '@tabler/icons-react';
import DefaultDrawer from '@/components/drawer/default-drawer';
import { ArrowLeft, FileUp, Plus } from 'lucide-react';
import { CreateProductForm } from '@/features/products/components/add-product/create-product-form';
import { UploadProductsForm } from '@/features/products/components/add-product/upload-products-form';

type Mode = 'select' | 'create' | 'upload';

// Extracted static mode map for titles and descriptions
const modeMap: Record<Mode, { title: string; description: string }> = {
  select: {
    title: 'Add Product',
    description: 'Choose how you want to add products to your inventory.',
  },
  create: {
    title: 'Create Single Product',
    description: 'Fill in the details to create a new product.',
  },
  upload: {
    title: 'Upload Products',
    description: 'Upload a CSV or Excel file with your product data.',
  },
};

export default function AddProductWrapper() {
  const [isOpen, setIsOpen] = useState(false);
  const [width] = useState(500);
  const [mode, setMode] = useState<Mode>('select');

  // Renamed functions for clarity
  const openDrawer = () => setIsOpen(true);
  const resetMode = () => setMode('select');
  const closeDrawer = () => {
    setIsOpen(false);
    setTimeout(resetMode, 300); // Reset mode with a delay after drawer closes
  };

  // Extract reusable JSX for titles and descriptions
  const renderSheetTitle = () => { modeMap[mode].title};
  const renderSheetDescription = () => {modeMap[mode].description};

  // Return JSX with improvements
  return (
    <>
      <Button onClick={openDrawer}>
        <IconPlus className='mr-2 h-4 w-4' /> Add New
      </Button>
      <DefaultDrawer
        open={isOpen}
        width={width}
        title={modeMap[mode].title}
        description={modeMap[mode].description}
        onClose={closeDrawer}
      >
        {mode !== 'select' && (
          <Button
            variant='ghost'
            size='sm'
            className='absolute top-4 left-4 h-8 w-8 rounded-full p-0'
            onClick={resetMode}
          >
            <ArrowLeft className='h-4 w-4' />
            <span className='sr-only'>Back</span>
          </Button>
        )}
        <div className='mt-8'>
          {mode === 'select' && (
            <div className='space-y-6'>
              <div className='grid grid-cols-1 gap-4'>
                {modeMap[mode].title}
                {modeMap[mode].description}
                <OptionCard
                  icon={<Plus className='h-5 w-5' />}
                  title='Create Single Product'
                  description='Add a new product by filling out a form with all the details.'
                  onClick={() => setMode('create')}
                />
                <OptionCard
                  icon={<FileUp className='h-5 w-5' />}
                  title='Upload Products'
                  description='Upload a CSV or Excel file to add multiple products at once.'
                  onClick={() => setMode('upload')}
                />
              </div>
            </div>
          )}
          {mode === 'create' && (
            <CreateProductForm onCancel={resetMode} onSuccess={closeDrawer} />
          )}
          {mode === 'upload' && (
            <UploadProductsForm onCancel={resetMode} onSuccess={closeDrawer} />
          )}
        </div>
      </DefaultDrawer>
    </>
  );
}

function OptionCard({ icon, title, description, onClick }: OptionCardProps) {
  return (
    <div
      onClick={onClick}
      className='group bg-background hover:border-primary relative cursor-pointer overflow-hidden rounded-lg border p-5 transition-all hover:shadow-md'
    >
      <div className='flex items-start gap-4'>
        <div className='bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground flex h-12 w-12 shrink-0 items-center justify-center rounded-full transition-colors'>
          {icon}
        </div>
        <div className='space-y-1'>
          <h3 className='leading-none font-medium tracking-tight'>{title}</h3>
          <p className='text-muted-foreground text-sm'>{description}</p>
        </div>
      </div>
      <div className='from-primary/40 to-primary absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-gradient-to-r transition-transform group-hover:scale-x-100' />
    </div>
  );
}

// "use client"
//
// import { useState } from "react"
// import { Plus } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { ProductTable } from "@/components/products/product-table"
// import { AddProductDrawer } from "@/components/products/add-product-drawer"
//
// export default function ProductsPage() {
//   const [isDrawerOpen, setIsDrawerOpen] = useState(false)
//
//   return (
//     <div className="container mx-auto py-6 space-y-6">
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-3xl font-bold tracking-tight">Products</h1>
//           <p className="text-muted-foreground">Manage your product inventory and listings.</p>
//         </div>
//         <Button onClick={() => setIsDrawerOpen(true)}>
//           <Plus className="mr-2 h-4 w-4" />
//           Add Product
//         </Button>
//       </div>
//
//       <ProductTable />
//
//       <AddProductDrawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen} />
//     </div>
//   )
// }
