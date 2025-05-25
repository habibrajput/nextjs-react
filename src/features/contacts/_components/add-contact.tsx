import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerClose } from '@/components/ui/drawer';

type AddProductProps = {
    isOpen: boolean;
    onClose: () => void;
};

export default function AddProduct({ isOpen, onClose }: AddProductProps) {
    return (
        <Drawer open={isOpen} onOpenChange={onClose} direction='right'>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>Add New Product</DrawerTitle>
                    <DrawerClose />
                </DrawerHeader>
                {/* AddProduct form content */}
            </DrawerContent>
        </Drawer>
    );
}