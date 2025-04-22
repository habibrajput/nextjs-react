import { IconTrendingDown, IconTrendingUp } from '@tabler/icons-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardTitle, CardDescription, CardAction } from '@/components/ui/card';
import { ComponentType, Key } from 'react';

type InfoCardProps = [];

const infoCards: InfoCardProps[] = [
    {
        title: 'Total Customers',
        description: 'Number of customers in the system',
        icon: IconTrendingUp,
        value: '1,250',
    },
    {
        title: 'New Customers',
        description: 'Customers added this month',
        icon: IconTrendingDown,
        value: '1,234',
    },
    {
        title: 'Active Accounts',
        description: 'Currently active accounts',
        icon: IconTrendingUp,
        value: '45,678',
    },
    {
        title: 'Growth Rate',
        description: 'Monthly growth rate',
        icon: IconTrendingUp,
        value: '4.5%',
    },
];


export function OverviewCards(infoCards: InfoCardProps) {

    return (
        <div className='*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs md:grid-cols-2 lg:grid-cols-4'>
            {infoCards.map((card: { title: string; description: string; icon: ComponentType<{}> | undefined; value: string | number | undefined; }, index: Key | null | undefined) => (
                <InfoCard
                    key={index}
                    title={card.title}
                    description={card.description}
                    icon={card.icon}
                    value={card.value}
                />
            ))}
        </div>
    )
}

function InfoCard({ title, description, icon, value }: InfoCardProps){
    return (
        <Card className='@container/card py-3'>
            <CardHeader>
                <CardDescription> {title} </CardDescription>
                <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
                    {description}
                </CardTitle>
                <CardAction>
                    <Badge variant='outline'>
                        <IconTrendingUp />
                        {value} 
                    </Badge>
                </CardAction>
            </CardHeader>
        </Card>
    )
}