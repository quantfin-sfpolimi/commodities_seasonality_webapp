'use client';

import * as React from 'react';
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts';

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import {
	ChartConfig,
	ChartContainer,
	ChartLegend,
	ChartLegendContent,
	ChartTooltip,
	ChartTooltipContent,
} from '@/components/ui/chart';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';

const chartData = [
	{ date: '2024-01-01', x: 3200, y: 1500, volume: 5000 },
	{ date: '2024-01-02', x: 3300, y: 1600, volume: 5200 },
	{ date: '2024-01-03', x: 3400, y: 1700, volume: 5300 },
	{ date: '2024-01-04', x: 3500, y: 1800, volume: 5400 },
	{ date: '2024-01-05', x: 3600, y: 1900, volume: 5500 },
	{ date: '2024-02-01', x: 3700, y: 2000, volume: 5600 },
	{ date: '2024-02-02', x: 3800, y: 2100, volume: 5700 },
	{ date: '2024-02-03', x: 3900, y: 2200, volume: 5800 },
	{ date: '2024-02-04', x: 4000, y: 2300, volume: 5900 },
	{ date: '2024-02-05', x: 4100, y: 2400, volume: 6000 },
	{ date: '2024-03-01', x: 4200, y: 2500, volume: 6100 },
	{ date: '2024-03-02', x: 4300, y: 2600, volume: 6200 },
	{ date: '2024-03-03', x: 4400, y: 2700, volume: 6300 },
	{ date: '2024-03-04', x: 4500, y: 2800, volume: 6400 },
	{ date: '2024-03-05', x: 4600, y: 2900, volume: 6500 },
	{ date: '2024-04-01', x: 4700, y: 3000, volume: 6600 },
	{ date: '2024-04-02', x: 4800, y: 3100, volume: 6700 },
	{ date: '2024-04-03', x: 4900, y: 3200, volume: 6800 },
	{ date: '2024-04-04', x: 5000, y: 3300, volume: 6900 },
	{ date: '2024-04-05', x: 5100, y: 3400, volume: 7000 },
	{ date: '2024-05-01', x: 5200, y: 3500, volume: 7100 },
	{ date: '2024-05-02', x: 5300, y: 3600, volume: 7200 },
	{ date: '2024-05-03', x: 5400, y: 3700, volume: 7300 },
	{ date: '2024-05-04', x: 5500, y: 3800, volume: 7400 },
	{ date: '2024-05-05', x: 5600, y: 3900, volume: 7500 },
	{ date: '2024-06-01', x: 5700, y: 4000, volume: 7600 },
	{ date: '2024-06-02', x: 5800, y: 4100, volume: 7700 },
	{ date: '2024-06-03', x: 5900, y: 4200, volume: 7800 },
	{ date: '2024-06-04', x: 6000, y: 4300, volume: 7900 },
	{ date: '2024-06-05', x: 6100, y: 4400, volume: 8000 },
	{ date: '2024-07-01', x: 6200, y: 4500, volume: 8100 },
	{ date: '2024-07-02', x: 6300, y: 4600, volume: 8200 },
	{ date: '2024-07-03', x: 6400, y: 4700, volume: 8300 },
	{ date: '2024-07-04', x: 6500, y: 4800, volume: 8400 },
	{ date: '2024-07-05', x: 6600, y: 4900, volume: 8500 },
	{ date: '2024-08-01', x: 6700, y: 5000, volume: 8600 },
	{ date: '2024-08-02', x: 6800, y: 5100, volume: 8700 },
	{ date: '2024-08-03', x: 6900, y: 5200, volume: 8800 },
	{ date: '2024-08-04', x: 7000, y: 5300, volume: 8900 },
	{ date: '2024-08-05', x: 7100, y: 5400, volume: 9000 },
	{ date: '2024-09-01', x: 7200, y: 5500, volume: 9100 },
	{ date: '2024-09-02', x: 7300, y: 5600, volume: 9200 },
	{ date: '2024-09-03', x: 7400, y: 5700, volume: 9300 },
	{ date: '2024-09-04', x: 7500, y: 5800, volume: 9400 },
	{ date: '2024-09-05', x: 7600, y: 5900, volume: 9500 },
	{ date: '2024-10-01', x: 7700, y: 6000, volume: 9600 },
	{ date: '2024-10-02', x: 7800, y: 6100, volume: 9700 },
	{ date: '2024-10-03', x: 7900, y: 6200, volume: 9800 },
	{ date: '2024-10-04', x: 8000, y: 6300, volume: 9900 },
	{ date: '2024-10-05', x: 8100, y: 6400, volume: 10000 },
	{ date: '2024-11-01', x: 8200, y: 6500, volume: 10100 },
	{ date: '2024-11-02', x: 8300, y: 6600, volume: 10200 },
	{ date: '2024-11-03', x: 8400, y: 6700, volume: 10300 },
	{ date: '2024-11-04', x: 8500, y: 6800, volume: 10400 },
	{ date: '2024-11-05', x: 8600, y: 6900, volume: 10500 },
	{ date: '2024-12-01', x: 8700, y: 7000, volume: 10600 },
	{ date: '2024-12-02', x: 8800, y: 7100, volume: 10700 },
	{ date: '2024-12-03', x: 8900, y: 7200, volume: 10800 },
	{ date: '2024-12-04', x: 9000, y: 7300, volume: 10900 },
	{ date: '2024-12-05', x: 9100, y: 7400, volume: 11000 },
];

const chartConfig = {
	visitors: {
		label: 'Visitors',
	},
	x: {
		label: 'X',
		color: 'hsl(var(--chart-1))',
	},
	y: {
		label: 'Y',
		color: 'hsl(var(--chart-2))',
	},
} satisfies ChartConfig;

export function MainChart() {
	const [timeRange, setTimeRange] = React.useState('90d');

	const filteredData = chartData.filter((item) => {
		const date = new Date(item.date);
		const referenceDate = new Date('2024-06-30');
		let daysToSubtract = 90;
		if (timeRange === '30d') {
			daysToSubtract = 30;
		} else if (timeRange === '7d') {
			daysToSubtract = 7;
		}
		const startDate = new Date(referenceDate);
		startDate.setDate(startDate.getDate() - daysToSubtract);
		return date >= startDate;
	});

	return (
		<Card>
			<CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
				<div className="grid flex-1 gap-1 text-center sm:text-left">
					<CardTitle>Seasonality Chart</CardTitle>
					<CardDescription></CardDescription>
				</div>
				<Select value={timeRange} onValueChange={setTimeRange}>
					<SelectTrigger
						className="w-[160px] rounded-lg sm:ml-auto"
						aria-label="Select a value"
					>
						<SelectValue placeholder="Last 3 months" />
					</SelectTrigger>
					<SelectContent className="rounded-xl">
						<SelectItem value="90d" className="rounded-lg">
							Last 3 months
						</SelectItem>
						<SelectItem value="30d" className="rounded-lg">
							Last 30 days
						</SelectItem>
						<SelectItem value="7d" className="rounded-lg">
							Last 7 days
						</SelectItem>
					</SelectContent>
				</Select>
			</CardHeader>
			<CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
				<ChartContainer
					config={chartConfig}
					className="aspect-auto h-[250px] w-full"
				>
					<AreaChart data={filteredData}>
						<defs>
							<linearGradient id="fillX" x1="0" y1="0" x2="0" y2="1">
								<stop
									offset="5%"
									stopColor="var(--color-x)"
									stopOpacity={0.8}
								/>
								<stop
									offset="95%"
									stopColor="var(--color-x)"
									stopOpacity={0.1}
								/>
							</linearGradient>
							<linearGradient id="fillY" x1="0" y1="0" x2="0" y2="1">
								<stop
									offset="5%"
									stopColor="var(--color-y)"
									stopOpacity={0.8}
								/>
								<stop
									offset="95%"
									stopColor="var(--color-y)"
									stopOpacity={0.1}
								/>
							</linearGradient>
						</defs>
						<CartesianGrid vertical={false} strokeDasharray="3 3" />
						<XAxis
							dataKey="date"
							tickLine={false}
							axisLine={false}
							tickMargin={8}
							minTickGap={32}
							tickFormatter={(value) => {
								const date = new Date(value);
								return date.toLocaleDateString('en-US', {
									month: 'short',
								});
							}}
						/>
						<YAxis
							tickLine={false}
							axisLine={false}
							tickFormatter={(value) => `$${value}`}
							domain={[1000, 10000]}
						/>
						<ChartTooltip
							cursor={{ strokeDasharray: '3 3' }}
							content={
								<ChartTooltipContent
									labelFormatter={(value) => {
										return new Date(value).toLocaleDateString('en-US', {
											month: 'short',
											day: 'numeric',
										});
									}}
									indicator="dot"
								/>
							}
						/>
						<Area
							dataKey="y"
							type="natural"
							fill="url(#fillY)"
							stroke="var(--color-y)"
							stackId="a"
						/>
						<Area
							dataKey="x"
							type="natural"
							fill="url(#fillX)"
							stroke="var(--color-x)"
							stackId="a"
						/>
						<ChartLegend content={<ChartLegendContent />} />
					</AreaChart>
				</ChartContainer>
			</CardContent>
		</Card>
	);
}
