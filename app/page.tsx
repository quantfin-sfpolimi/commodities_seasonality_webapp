import { MainChart } from '@/components/main-areachart';
import { AssetSelectorForm } from '@/components/main-selector';
import { Button } from '@/components/ui/button';
import { Card, CardTitle } from '@/components/ui/card';
import { FileBadge } from 'lucide-react';

export default function Page() {
	return (
		<main className="p-16">
			<header className="flex h-16 shrink-0 justify-between items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
				<div className="flex items-center gap-2 px-4">
					<Card className="border-0 shadow-none">
						<CardTitle>
							SF Club Polimi - QuantFin Division - Seasonality WebApp
						</CardTitle>
					</Card>
				</div>
				<div className=" items-center gap-4 px-4">
					<Button
						className="rounded-xl bg-neutral-100/50 dark:bg-neutral-800/50"
						variant="secondary"
					>
						<FileBadge /> Seasonality
					</Button>
					<Button
						className="rounded-xl bg-neutral-100/50 dark:bg-neutral-800/50"
						variant="secondary"
					>
						<FileBadge /> Education
					</Button>
				</div>
			</header>
			<div className="p-4 pt-0" id="prova1">
				<div id="peova2" className="">
					<AssetSelectorForm />
				</div>
				
			</div>
		</main>
	);
}
