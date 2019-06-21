import { NgModule } from '@angular/core';
import { GroupbyPipe } from './groupby.pipe';
import { CommonModule } from "@angular/common";

@NgModule({
	declarations: [GroupbyPipe],
	imports: [CommonModule],
	exports: [GroupbyPipe]
})
export class PipesModule {}