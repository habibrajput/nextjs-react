import { Badge } from '@/components/ui/badge';
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardAction, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';


export type InfoCard = {
  title: string;
  description: string;
  icon: React.ComponentType;
  value: string | number;
};

type OverviewCardsProps = {
  infoCards: InfoCard[];
};

export function OverviewCards({ infoCards }: OverviewCardsProps) {
  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs md:grid-cols-2 lg:grid-cols-4">
      {infoCards.map(({ title, description, icon, value }: InfoCard, index) => (
        <InfoCard
          key={index}
          title={title}
          description={description}
          icon={icon}
          value={value}
        />
      ))}
    </div>
  );
}

export function InfoCard({ title, description, icon: Icon, value }: InfoCard) {
  return (
    <Card className="@container/card py-3">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-xl">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
        <CardAction>
          <Badge variant="outline">
            <Icon />
            {value}
          </Badge>
        </CardAction>
      </CardHeader>
    </Card>
  );
}

export function OverviewCardsLoading() {
  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs md:grid-cols-2 lg:grid-cols-4">
      {[...Array(4)].map((i,w) => {
        return (
          <div key={w} className="space-y-3 border-1 p-3 rounded-xl">
            <Skeleton className="h-[16.5px] w-[280px]" />
            <Skeleton className="h-[16.5px] w-[250px]" />
            <Skeleton className="h-[16.5px] w-[200px]" />
          </div>
        )
      })}
    </div>
  )
}