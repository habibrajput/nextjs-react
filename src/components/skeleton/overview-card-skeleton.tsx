import { Skeleton } from '@/components/ui/skeleton';

export function OverviewCardsSkeleton() {
  return (
    <div className='*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs md:grid-cols-2 lg:grid-cols-4'>
      {[...Array(4)].map((i, w) => {
        return (
          <div key={w} className='space-y-3 rounded-xl border-1 p-3'>
            <Skeleton className='h-[21px] w-[280px]' />
            <Skeleton className='h-[21px] w-[250px]' />
          </div>
        );
      })}
    </div>
  );
}
