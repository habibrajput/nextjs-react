'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { IconPlus } from '@tabler/icons-react';
import DefaultDrawer from '@/components/drawer/default-drawer';
import { ArrowLeft, FileUp, Plus } from 'lucide-react';
import { SheetDescription, SheetTitle } from '@/components/ui/sheet';
import { CreateProductForm } from '@/features/products/components/add-product/create-product-form';
import { UploadProductsForm } from '@/features/products/components/add-product/upload-products-form';

type Mode = 'select' | 'create' | 'upload';
type ModeTitle = 'Add Product' | 'Create Single Product' | 'Upload Products';

// type AddProductDrawerProps = {
//   open: boolean;
//   onOpenChange: (open: boolean) => void;
// };

type OptionCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick: () => void;
}

export default function AddProductWrapper() {
  const [isOpen, setIsOpen] = useState(false);
  const [width, setWidth] = useState(500);
  const [mode, setMode] = useState<Mode>('select');

  const handleOpen = () => {
    setIsOpen(true)
  };

  const handleBack = () => {
    setMode('select');
  };
  const handleClose = () => {
    setIsOpen(false)
    // Reset to selection mode after drawer closes
    setTimeout(() => setMode('select'), 300);
  };

  const title = (mode: Mode): string => {
    const modeMap: Record<Mode, string> = {
      select: 'Add Product',
      create: 'Create Single Product',
      upload: 'Upload Products',
    };

    return modeMap[mode];
  };


  return (
    <>
      <Button onClick={handleOpen}>
        <IconPlus className='mr-2 h-4 w-4' /> Add New
      </Button>

      <DefaultDrawer
        open={isOpen}
        width={width}
        title={title}
        onClose={handleClose}
      >
        {mode !== 'select' && (
          <Button
            variant='ghost'
            size='sm'
            className='absolute top-4 left-4 h-8 w-8 rounded-full p-0'
            onClick={handleBack}
          >
            <ArrowLeft className='h-4 w-4' />
            <span className='sr-only'>Back</span>
          </Button>
        )}
        <SheetTitle>
          {mode === 'select' && 'Add Product'}
          {mode === 'create' && 'Create Single Product'}
          {mode === 'upload' && 'Upload Products'}
        </SheetTitle>
        <SheetDescription>
          {mode === 'select' &&
            'Choose how you want to add products to your inventory.'}
          {mode === 'create' && 'Fill in the details to create a new product.'}
          {mode === 'upload' &&
            'Upload a CSV or Excel file with your product data.'}
        </SheetDescription>

        <div className='mt-8'>
          {mode === 'select' && (
            <div className='space-y-6'>
              <div className='grid grid-cols-1 gap-4'>
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

              {/*<div className="text-xs text-center text-muted-foreground mt-8">*/}
              {/*  Need help?{" "}*/}
              {/*  <a href="#" className="text-primary underline underline-offset-4">*/}
              {/*    View our documentation*/}
              {/*  </a>*/}
              {/*</div>*/}
            </div>
          )}

          {mode === 'create' && (
            <CreateProductForm onCancel={handleBack} onSuccess={handleClose} />
          )}

          {mode === 'upload' && (
            <UploadProductsForm onCancel={handleBack} onSuccess={handleClose} />
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
