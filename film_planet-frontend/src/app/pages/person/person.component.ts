import {ChangeDetectionStrategy, Component, inject, OnInit, WritableSignal} from '@angular/core';
import {CastCrewMember} from '../../core/interfaces/cast-crew-member.interface';
import {PosterUrlPipePipe} from '../../core/pipes/poster-url-pipe.pipe';
import {DetailsService} from '../../core/services/details.service';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {DataUtils} from '../../core/utils/data.utils';
import {DatePipe, DecimalPipe, NgIf} from '@angular/common';
import {TableModule} from 'primeng/table';
import {ItemCredit} from '../../core/interfaces/item-credit.interface';
import {DividerModule} from 'primeng/divider';
import {ButtonModule} from 'primeng/button';
import {ItemCreditUrlPipe} from '../../core/pipes/item-credit-url.pipe';
import {Accordion, AccordionContent, AccordionHeader, AccordionPanel} from 'primeng/accordion';

@Component({
  selector: 'app-person',
  standalone: true,
  imports: [
    PosterUrlPipePipe,
    NgIf,
    DatePipe,
    TableModule,
    DecimalPipe,
    DividerModule,
    ButtonModule,
    RouterLink,
    ItemCreditUrlPipe,
    Accordion,
    AccordionPanel,
    AccordionHeader,
    AccordionContent
  ],
  templateUrl: './person.component.html',
  styleUrl: './person.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PersonComponent implements OnInit {
  protected readonly det = inject(DetailsService);
  private route = inject(ActivatedRoute);
  protected readonly dataUtils = DataUtils;

  person: WritableSignal<CastCrewMember> = this.det.person;
  castCredits: WritableSignal<ItemCredit[]> = this.det.castCredits;
  crewCredits: WritableSignal<ItemCredit[]> = this.det.crewCredits;

  isLoading: WritableSignal<boolean> = this.det.isLoading;

  ngOnInit() {
    this.isLoading.set(true);
    this.route.paramMap.subscribe(params => {
      // Extracts the full item name from the url (id + title)
      const pageSegment = params.get('id') || '';

      const personId = this.dataUtils.getIdFromUrlSegment(pageSegment);
      this.det.getPersonDetails(personId);
    })
  }
}
