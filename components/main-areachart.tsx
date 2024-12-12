'use client';

import * as React from 'react';
import {useState,useEffect} from 'react';

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
	let seasonality_url = "http://127.0.0.1:8000/get-seasonality/"
	const ticker = "AAPL"

	let url = seasonality_url + ticker
	console.log(url)

		const [chartData,setData]=useState([]);
		const getData=()=>{
			fetch(url,
			)
			.then(function(response){
				return response.json();
			})
			.then(function(myJson) {
				setData(myJson)
			});
		}
		useEffect(()=>{
			getData()
		},[])

	console.log((chartData))

	//------------------------------------------------------
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
							domain={[-15, 15]}
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
