'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { IconPlus } from '@tabler/icons-react';
import AddProduct from './add-product';

export default function AddProductWrapper() {
    const [isOpen, setIsOpen] = useState(false);

    const openDrawer = () => setIsOpen(true);
    const closeDrawer = () => setIsOpen(false);

    return (
        <>
            <Button onClick={openDrawer}>
                <IconPlus className="mr-2 h-4 w-4" /> Add New
            </Button>
            <AddProduct isOpen={isOpen} onClose={closeDrawer} />
        </>
    );
}