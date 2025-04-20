'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { IconPlus } from '@tabler/icons-react';
import { Drawer, DrawerClose, DrawerContent, DrawerHeader, DrawerTitle } from '@/components/ui/drawer';

export default function AddProductWrapper() {
    const [isOpen, setIsOpen] = useState(false);

    const openDrawer = () => setIsOpen(true);
    const closeDrawer = () => setIsOpen(false);

    return (
        <>
            <Button onClick={openDrawer}>
                <IconPlus className="mr-2 h-4 w-4" /> Add New
            </Button>
            <Drawer open={isOpen} onOpenChange={closeDrawer} direction='right'>
              <DrawerContent>
                <DrawerHeader>
                  <DrawerTitle>Add New Product</DrawerTitle>
                  <DrawerClose />
                </DrawerHeader>
                {/* AddProduct form content */}
              </DrawerContent>
            </Drawer>
        </>
    );
}