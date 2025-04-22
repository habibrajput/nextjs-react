export type Mode = 'select' | 'create' | 'upload';

export type OptionCardProps = {
    icon: React.ReactNode;
    title: string;
    description: string;
    onClick: () => void;
}

export const modeMap: Record<Mode, { title: string; description: string }> = {
    select: {
        title: 'Add Contact',
        description: 'Choose how you want to add contacts.',
    },
    create: {
        title: 'Create Single Contact',
        description: 'Fill in the details to create a new contact.',
    },
    upload: {
        title: 'Upload Contacts',
        description: 'Upload a CSV or Excel file with your contact data.',
    },
};

export const isMode = (checkMode: Mode, mode: string) => {
    return mode === checkMode
}