'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import DefaultDrawer from '@/components/drawer/default-drawer';
import { CreateProductForm } from '@/features/products/components/add-product/create-product-form';
import { UploadProductsForm } from '@/features/products/components/add-product/upload-products-form';
import { Mode, modeMap, isMode } from '@/features/products/utils/utils';
import { OptionCard } from './option-card';

export default function AddProductWrapper() {
  
  const [isOpen, setIsOpen] = useState(false);
  const [width] = useState(500);
  const [mode, setMode] = useState<Mode>('select');
  const { title, description } = modeMap[mode];
  const isCreate = isMode(mode,'create');
  const isUpload = isMode(mode, 'upload');
  const isSelect = isMode(mode, 'select');

  const openDrawer = () => setIsOpen(true);
  const resetMode = () => setMode('select');
  const closeDrawer = () => {
    setIsOpen(false);
    setTimeout(resetMode, 300);
  };

  return (
    <>
      <Button onClick={openDrawer}>
        <Icons.iconPlus className='mr-2 h-4 w-4' /> Add New
      </Button>
      <DefaultDrawer
        open={isOpen}
        width={width}
        title={title}
        description={description}
        isBack={!isSelect}
        onBack={resetMode}
        onClose={closeDrawer}
      >
        <div>
          {isSelect && (
            <div className='space-y-6'>
              <div className='grid grid-cols-1 gap-4'>
                <OptionCard
                  icon={<Icons.plus className='h-5 w-5' />}
                  title={modeMap['create'].title}
                  description={modeMap['create'].description}
                  onClick={() => setMode('create')}
                />
                <OptionCard
                  icon={<Icons.fileUp className='h-5 w-5' />}
                  title={modeMap['upload'].title}
                  description={modeMap['upload'].description}
                  onClick={() => setMode('upload')}
                />
              </div>
            </div>
          )}

          {isCreate && (
            <CreateProductForm 
              onCancel={resetMode} 
              onSuccess={closeDrawer} 
             />
          )}

          {isUpload && (
            <UploadProductsForm 
              onCancel={resetMode} 
              onSuccess={closeDrawer} 
            />
          )}
        </div>
      </DefaultDrawer>
    </>
  );
}