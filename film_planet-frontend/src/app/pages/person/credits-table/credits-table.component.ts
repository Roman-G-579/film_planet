import {ChangeDetectionStrategy, Component, input, InputSignal} from '@angular/core';
import {ButtonModule} from "primeng/button";
import {DatePipe, DecimalPipe, NgClass, NgIf} from "@angular/common";
import {ItemCreditUrlPipe} from "../../../core/pipes/item-credit-url.pipe";
import {ImageUrlPipePipe} from "../../../core/pipes/image-url.pipe";
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
    ImageUrlPipePipe,
    SharedModule,
    TableModule,
    RouterLink,
    NgClass
  ],
  templateUrl: './credits-table.component.html',
  styleUrl: './credits-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreditsTableComponent {
  departmentCredits: InputSignal<ItemCredit[]> = input<ItemCredit[]>([]);
}
