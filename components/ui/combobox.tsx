'use client';

import { Check, ChevronsUpDown } from 'lucide-react';
import * as React from 'react';

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

const seasonalityAssets = [
	{
		value: 'sp500',
		label: 'S&P 500',
	},
	{
		value: 'nasdaq',
		label: 'NASDAQ',
	},
	{
		value: 'dowjones',
		label: 'Dow Jones',
	},
	{
		value: 'russell2000',
		label: 'Russell 2000',
	},
	{
		value: 'gold',
		label: 'Gold',
	},
	{
		value: 'silver',
		label: 'Silver',
	},
	{
		value: 'crudeoil',
		label: 'Crude Oil',
	},
	{
		value: 'naturalgas',
		label: 'Natural Gas',
	},
];

export function Combobox() {
	const [open, setOpen] = React.useState(false);
	const [value, setValue] = React.useState('');

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					role="combobox"
					aria-expanded={open}
					className="w-[200px] justify-between"
				>
					{value
						? seasonalityAssets.find((asset) => asset.value === value)?.label
						: 'Select asset...'}
					<ChevronsUpDown className="opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-[200px] p-0">
				<Command>
					<CommandInput placeholder="Search asset..." />
					<CommandList>
						<CommandEmpty>No framework found.</CommandEmpty>
						<CommandGroup>
							{seasonalityAssets.map((asset) => (
								<CommandItem
									key={asset.value}
									value={asset.value}
									onSelect={(currentValue) => {
										setValue(currentValue === value ? '' : currentValue);
										setOpen(false);
									}}
								>
									{asset.label}
									<Check
										className={cn(
											'ml-auto',
											value === asset.value ? 'opacity-100' : 'opacity-0'
										)}
									/>
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
}
