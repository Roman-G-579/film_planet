import {ChangeDetectionStrategy, Component, input, InputSignal} from '@angular/core';
import {ButtonModule} from "primeng/button";
import {DatePipe, DecimalPipe, NgIf} from "@angular/common";
import {ItemCreditUrlPipe} from "../../../core/pipes/item-credit-url.pipe";
import {PosterUrlPipePipe} from "../../../core/pipes/poster-url-pipe.pipe";
import {SharedModule} from "primeng/api";
import {TableModule} from "primeng/table";
import {RouterLink} from '@angular/router';
import {ItemCredit} from '../../../core/interfaces/item-credit.interface';

@Component({
  selector: 'app-credits-table',
  standalone: true,
  imports: [
    ButtonModule,
    DatePipe,
    DecimalPipe,
    ItemCreditUrlPipe,
    NgIf,
    PosterUrlPipePipe,
    SharedModule,
    TableModule,
    RouterLink
  ],
  templateUrl: './credits-table.component.html',
  styleUrl: './credits-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreditsTableComponent {
  departmentCredits: InputSignal<ItemCredit[]> = input<ItemCredit[]>([]);
}
