'use client';

import * as React from 'react';
import {useState,useEffect} from 'react';

import { Area, AreaChart, CartesianGrid, XAxis, YAxis, Bar, BarChart, Line } from 'recharts';
import { Tooltip, Legend } from 'recharts';
import {AssetSelectorForm} from '@/components/main-selector';

const data = [
	{ name: '2024-01-01', seasonality: 4000, 1: 2400, 2: 2400, 3: 100, 4 : 100, 5 : 100, volume : 50 },
	{ name: '2024-01-01', seasonality: 5000, 1: 2600, 2: 2100, 3: 30, 4: 800, 5: 90, volume: 10 },

  ];

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

export function MainChart({ticker,start_year, end_year}) {

	if(ticker == ""){
		ticker = "AAPL"
	}
	if (start_year == ""){
		start_year = "2019"
	}	
	if (end_year == ""){
		end_year = "2024"
	}
	let seasonality_base = "http://127.0.0.1:8000/get-seasonality/"
	
	console.log(ticker)

	let seasonality_url = seasonality_base + ticker
	console.log(seasonality_url)

		const [seasonality_data,setData1]=useState([]);
		const getData1=()=>{
			fetch(seasonality_url,
			)
			.then(function(response){
				return response.json();
			})
			.then(function(myJson) {
				setData1(myJson)
			});
		}
		useEffect(()=>{
			getData1()
		},[])

		let volume_base = "http://127.0.0.1:8000/volume/"
		
		let volume_url = volume_base + ticker

			const [volume_data,setData2]=useState([]);
			const getData2=()=>{
				fetch(volume_url,
				)
				.then(function(response){
					return response.json();
				})
				.then(function(myJson) {
					setData2(myJson)
				});
			}
			useEffect(()=>{
				getData2()
			},[])
	

	//------------------------------------------------------
	const [timeRange, setTimeRange] = React.useState('90d');

	const seasonality = seasonality_data

	const volume = volume_data
	
	return (
		<Card id="ciao">
			<CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
				<div className="grid flex-1 gap-1 text-center sm:text-left">
					<CardTitle>Seasonality Chart</CardTitle>
					<CardDescription></CardDescription>
				</div>
			
			</CardHeader>
			<CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
				<ChartContainer
					config={chartConfig}
					className="aspect-auto h-[300px] w-full"
				>
					<AreaChart data={seasonality}>
						<defs>
							
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
							domain={[-2, 15]}
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
						<Area type="monotone" dataKey="seasonality" stroke="#8884d8" fill="#8884d8" strokeWidth={5} />
						<Area type="monotone" dataKey="1" stroke="#82ca9d" strokeWidth={1} fill="FFFFFF/" fillOpacity={0}/>
						<Area type="monotone" dataKey="2" stroke="#ffc658" strokeWidth={1} fill="FFFFFF/" fillOpacity={0}/>
						<Area type="monotone" dataKey="3" stroke="#ff7300" strokeWidth={1} fill="FFFFFF/" fillOpacity={0}/>
						<Area type="monotone" dataKey="4" stroke="#387908" strokeWidth={1} fill="FFFFFF/" fillOpacity={0}/>
						<Area type="monotone" dataKey="5" stroke="#ff0000" strokeWidth={1} fill="FFFFFF/" fillOpacity={0}/>
						
						<ChartLegend content={<ChartLegendContent />} />
					</AreaChart>
					</ChartContainer>
					<ChartContainer
					config={chartConfig}
					className="aspect-auto h-[300px] w-full"
				>
					<BarChart width={500} height={400} data={volume}>

					<defs>
							
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
								domain={[0, 1]}
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
								<Bar dataKey="volume" fill="#8884d8" />
						</BarChart>
						
				</ChartContainer>
			</CardContent>
		</Card>
	);
}
