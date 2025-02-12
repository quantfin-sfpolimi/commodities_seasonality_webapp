'use client';

import { Button } from '@/components/ui/button';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { Calendar as CalendarIcon } from 'lucide-react';
import * as React from 'react';


export function DatePickerWithRange({
	className,
}: React.HTMLAttributes<HTMLDivElement>) {
	const currentYear = new Date().getFullYear();
	const [yearRange, setYearRange] = React.useState<
		{ from: number; to: number | null } | undefined
	>({
		from: currentYear - 1,
		to: currentYear,
	});

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

	return (
		<div className={cn('grid gap-2', className)}>
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
	);
}
