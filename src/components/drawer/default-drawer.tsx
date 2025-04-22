import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTitle,
} from '@/components/ui/drawer';
import { Icons } from '@/components/icons';

type DefaultDrawerProps = {
    open: boolean; 
    title: string;
    description?: string;
    width?: string | number;
    children?: React.ReactNode
    onClose: () => void; 
};

export default function DefaultDrawer({
    open,
    title,
    children,
    description,
    width = '500px',
    onClose,
}: DefaultDrawerProps) {
    return (
        <Drawer 
            open={open} 
            onOpenChange={onClose} 
            direction='right'
        >
            <DrawerContent
                className={`transition-all duration-700 ease-in-out`}
                style={{
                    maxWidth: typeof width === 'number' ? `${width}px` : width,
                    width: '100%'
                }}
            >
                <DrawerHeader className='p-0' >
                    <DrawerTitle className='bg-gray-100 p-3 flex justify-between items-center'>
                        <div className='grid'>
                            {title} 
                            {
                            description ? 
                                <DrawerDescription className='text-xm font-medium'>{description}</DrawerDescription> :
                                <DrawerDescription className='text-xm font-medium'></DrawerDescription>
                            }
                        </div>
                        <Icons.close
                            onClick={onClose}
                          className="cursor-pointer"
                          size={15}
                        />
                   </DrawerTitle>
                </DrawerHeader>
                <div className='p-3'>
                    {children}
                </div>
            </DrawerContent>
        </Drawer>
    );
}