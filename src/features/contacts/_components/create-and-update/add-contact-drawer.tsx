'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import DefaultDrawer from '@/components/drawer/default-drawer';
import { CreateContactForm } from '@/features/contacts/_components/create-and-update/create-contact-form';
import MultiStepForm from '@/features/contacts/_components/create-and-update/multistep-form';
import { isMode, Mode, modeMap } from '@/features/contacts/_utils/utils';
import { OptionCard } from './option-card';

export default function AddContactWrapper() {
  const [isOpen, setIsOpen] = useState(false);
  const [width, setWidth] = useState(600);
  const [mode, setMode] = useState<Mode>('select');
  const { title, description } = modeMap[mode];
  const isCreate = isMode(mode, 'create');
  const isUpload = isMode(mode, 'upload');
  const isSelect = isMode(mode, 'select');

  const openDrawer = () => setIsOpen(true);
  const resetMode = () => setMode('select');
  const closeDrawer = () => {
    setIsOpen(false);
    setTimeout(resetMode, 300);
  };

  useEffect(() => {
    if (mode === 'upload') {
      setWidth(800)
    } else {
      setWidth(600)
    }
  }, [mode]);

  return (
    <>
      <div className='flex items-center justify-between gap-3'>
        <Button variant='outline' onClick={openDrawer}>
          <Icons.download className='mr-2 h-4 w-4' /> Import
        </Button>
        <Button onClick={openDrawer}>
          <Icons.iconPlus className='mr-2 h-4 w-4' /> Add New
        </Button>
      </div>
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
            <CreateContactForm onCancel={resetMode} onSuccess={closeDrawer} />
          )}

          {isUpload && (
            <MultiStepForm onCancel={resetMode} onSuccess={closeDrawer} />
          )}
        </div>
      </DefaultDrawer>
    </>
  );
}
