'use client';
import {useState,useEffect} from 'react';

import { Button } from '@/components/ui/button';
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from '@/components/ui/command';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { Calendar as CalendarIcon, Check, ChevronsUpDown } from 'lucide-react';
import * as React from 'react';
import { MainChart } from '@/components/main-areachart';

import { tickers } from './tickers';

const seasonalityAssets = [
	{ value: 'AAPL', label: 'Apple' },
	{ value: 'TLSA', label: 'Tesla' },
	{ value: 'CORN', label: 'Corn' },
	{ value: 'MSFT', label: 'Microsoft' },
	{ value: 'NVDA', label: 'Nvidia' },
	{ value: 'GOLD', label: 'Gold' },
	{ value: 'BTC-USD', label: 'Bitcoin Shit' },
	{ value: 'GM', label: 'General Motors' },

	
];

export function AssetSelectorForm() {
	const currentYear = new Date().getFullYear();
	const [yearRange, setYearRange] = React.useState<
		{ from: number; to: number | null } | undefined
	>({
		from: currentYear - 1,
		to: currentYear,
	});
	let [selectedAsset, setSelectedAsset] = React.useState('');
	let [popoverOpen, setPopoverOpen] = React.useState(false);

	const handleYearClick = (year: number) => {
		if (!yearRange || (yearRange && yearRange.to)) {
			setYearRange({ from: year, to: null });
		} else {
			setYearRange((prev) =>
				prev?.from && year >= prev.from ? { from: prev.from, to: year } : prev
			);
		}
	};


	const renderYears = () => {
		const years = Array.from({ length: 20 }, (_, i) => currentYear - 19 + i);
		return (
			<div className="grid grid-cols-4 gap-2 p-4">
				{years.map((year) => (
					<button
						key={year}
						className={cn(
							'px-3 py-2 rounded-md text-sm font-medium',
							yearRange?.from === year || yearRange?.to === year
								? 'bg-blue-500 text-white'
								: 'bg-gray-200 hover:bg-gray-300'
						)}
						onClick={() => handleYearClick(year)}
					>
						{year}
					</button>
				))}
			</div>
		);
	};

	let [showChart, setShowChart] = useState<boolean>(false);
	let [chartKey, setChartKey] = useState<number>(0); // Stato per forzare il ri-render

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedAsset(event.target.value);
  };

  const handleSubmit = () => {
	console.log(selectedAsset, yearRange);
    setShowChart(true);
	setChartKey(prevKey => prevKey + 1); // Aggiorna il key per forzare il ri-render
    // Aggiorna il parametro aggiuntivo o altri dati se necessario
    
  };
	

	return (
		<div id = "prova3" >
			<div id="asset selector" className = "flex h-16 shrink-0 justify-between items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
			<div className='flex'>
				<Popover>
					<PopoverTrigger asChild>
						<Button
							variant="outline"
							role="combobox"
							aria-expanded={popoverOpen}
							className="w-[200px] justify-between"
							onClick={() => setPopoverOpen(!popoverOpen)}
						>
							{selectedAsset
								? seasonalityAssets.find(
										(asset) => asset.value === selectedAsset
								  )?.label
								: 'Select asset...'}
							<ChevronsUpDown className="opacity-50" />
						</Button>
					</PopoverTrigger>
					<PopoverContent className="w-[200px] p-0">
						<Command>
							<CommandInput placeholder="Search asset..." />
							<CommandList>
								<CommandEmpty>No asset found.</CommandEmpty>
								<CommandGroup>
									{seasonalityAssets.map((asset) => (
										<CommandItem
											key={asset.value}
											value={asset.value}
											

											onSelect={(currentValue) => {
												setSelectedAsset(
													currentValue === selectedAsset ? '' : currentValue
												);
												setPopoverOpen(false);
											}}
										>
											{asset.label}
											<Check
												className={cn(
													'ml-auto',
													selectedAsset === asset.value
														? 'opacity-100'
														: 'opacity-0'
												)}
											/>
										</CommandItem>
									))}
								</CommandGroup>
							</CommandList>
						</Command>
					</PopoverContent>
				</Popover>
			</div>
			<div>
				<Popover>
					<PopoverTrigger asChild>
						<Button
							id="year-range"
							variant={'outline'}
							className={cn(
								'w-[300px] justify-start text-left font-normal',
								!yearRange && 'text-muted-foreground'
							)}
						>
							<CalendarIcon />
							{yearRange?.from ? (
								yearRange.to ? (
									<>
										{yearRange.from} - {yearRange.to}
									</>
								) : (
									yearRange.from
								)
							) : (
								<span>Pick a year range</span>
							)}
						</Button>
					</PopoverTrigger>
					<PopoverContent className="w-auto p-0" align="start">
						{renderYears()}
					</PopoverContent>
				</Popover>
			</div>
			<Button onClick={handleSubmit}>Submit</Button>
			</div>
			{showChart && <MainChart key={chartKey} ticker = {selectedAsset} start_year = {yearRange.from} end_year = { yearRange.to} />}
		</div>
	);
}
