import { OptionCardProps } from '@/features/products/utils/utils';

export function OptionCard({ icon, title, description, onClick }: OptionCardProps) {
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
      <div className='from-primary/40 to-primary absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 transition-transform group-hover:scale-x-100' />
    </div>
  );
}