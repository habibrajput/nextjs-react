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
    isBack?: boolean;
    children?: React.ReactNode
    onBack?: () => void;
    onClose: () => void;
};

export default function DefaultDrawer({
    open,
    title,
    children,
    description,
    width = '500px',
    isBack,
    onBack,
    onClose,
}: DefaultDrawerProps) {
    return (
        <Drawer
            open={open}
            onOpenChange={onClose}
            direction='right'
        >
            <DrawerContent
                className={`transition-all duration-700 ease-in-out pointer-events-auto z-50`}
                style={{
                    maxWidth: typeof width === 'number' ? `${width}px` : width,
                    width: '100%'
                }}
                // onEscapeKeyDown={(e) => e.preventDefault()}
                // onPointerDown={(e) => e.preventDefault()}
                onInteractOutside={(e) => e.preventDefault()}
            >
                <DrawerHeader className='p-0'>
                    <div className='px-4 pt-3 flex justify-between items-center'>
                        <div>
                            {
                                isBack && (
                                    <Icons.arrowLeft
                                        onClick={onBack}
                                        className="cursor-pointer"
                                        size={18}
                                    />
                                )
                            }
                        </div>
                        <Icons.close
                            onClick={onClose}
                            className="cursor-pointer"
                            size={18}
                        />
                    </div>
                    <DrawerTitle className='px-4 flex justify-start'>
                        <div className='grid'>
                            <h1 className='text-lg font-bold text-foreground'>{title} </h1>
                            {
                            description ?
                                <DrawerDescription className='text-xm font-medium'>{description}</DrawerDescription> :
                                <DrawerDescription className='text-xm font-medium'></DrawerDescription>
                            }
                        </div>
                   </DrawerTitle>
                </DrawerHeader>
                <div className='px-4 py-3'>
                    {children}
                </div>
            </DrawerContent>
        </Drawer>
    );
}