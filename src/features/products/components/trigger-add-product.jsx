'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { IconPlus } from '@tabler/icons-react';
import DefaultDrawer from '@/components/drawer/default-drawer';
import { UserPlus, MoveLeft } from 'lucide-react';
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function AddProductWrapper() {
  const [isOpen, setIsOpen] = useState(false);
  const [width, setWidth] = useState(500);
  const [createOption, setCreateOption] = useState(null);

  const customerCreateOptions = [
    { key: 'add_customer', value: 'Add Customer', icon: UserPlus },
    { key: 'upload_file', value: 'Upload File', icon: UserPlus },
  ];

  const openDrawer = () => setIsOpen(true);
  const closeDrawer = () => setIsOpen(false);

  const handleSetOption = (key) => {
    setCreateOption(key);
  };

  const OptionCard = ({ option, onClick }) => {
    const Icon = option.icon;
    return (
      <div
        className="flex flex-col cursor-pointer p-4 h-[120px] bg-gray-100 border-1.5 rounded-2xl border-dashed w-full"
        onClick={() => onClick(option.key)}
      >
        <Icon size={35} />
        <span className="text-xm text-sm">{option.value}</span>
      </div>
    );
  };

  return (
    <>
      <Button onClick={openDrawer}>
        <IconPlus className="mr-2 h-4 w-4" /> Add New
      </Button>

      <DefaultDrawer
        open={isOpen}
        width={width}
        title="Add Customer"
        onClose={closeDrawer}
      >
        <div className="flex flex-wrap flex-col w-full space-x-2">
          <h2 className="text-xl font-bold">Customer</h2>
          {
            createOption === null ?
              (
                <>
                  <span className="text-muted-foreground text-sm">
                    Choose a way to create a customer
                  </span>
                  <div className="grid grid-cols-2 gap-2 w-full">
                    { customerCreateOptions.map((option) => (
                        <OptionCard
                          key={option.key}
                          option={option}
                          onClick={handleSetOption}
                        />
                      ))
                    }
                  </div>
                </>
              ) : (
                <div>
                  <MoveLeft className='cursor-pointer' onClick={(() => { setCreateOption(null) })} size={20} /></div>
              )
          }

          <div className="mt-4">
            {
              createOption === 'upload_file' ? 
              (
                <div>Upload file</div>
              ) : 
              createOption === 'add_customer' ? 
              (
                <>
                  <div className='grid grid-cols-2 gap-2 w-full'>
                    <div className='space-y-1'>
                      <Label htmlFor="name">Name</Label>
                      <Input type="text" id="name" placeholder="Name" />
                    </div>
                    <div className='space-y-1'>
                      <Label htmlFor="email">Email</Label>
                      <Input type="email" id="email" placeholder="Email" />
                    </div>
                    <div className='space-y-1'>
                      <Label htmlFor="phone_number">Phone Number</Label>
                      <Input type="number" id="phone_number" placeholder="Phone Number" />
                    </div>
                    <div className='space-y-1'>
                      <Label htmlFor="address">Address</Label>
                      <Input type="text" id="address" placeholder="Address" />
                    </div>
                  </div>
                  <br />
                      <div className='flex gap-2 justify-centerv p-x-2'>
                      <Button className='w-fit'> Submit & Create New </Button>
                      <Button className='w-fit'> Submit & Exit </Button>
                  </div>
                </>
            ) : (null)}
          </div>
        </div>
      </DefaultDrawer>
    </>
  );
}