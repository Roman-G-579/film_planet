import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnInit,
  Signal,
  WritableSignal
} from '@angular/core';
import {CastCrewMember} from '../../core/interfaces/cast-crew-member.interface';
import {PosterUrlPipePipe} from '../../core/pipes/poster-url-pipe.pipe';
import {DetailsService} from '../../core/services/details.service';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {DataUtils} from '../../core/utils/data.utils';
import {DatePipe, NgIf} from '@angular/common';
import {TableModule} from 'primeng/table';
import {ItemCredit} from '../../core/interfaces/item-credit.interface';
import {DividerModule} from 'primeng/divider';
import {ButtonModule} from 'primeng/button';
import {Accordion, AccordionContent, AccordionHeader, AccordionPanel} from 'primeng/accordion';
import {CreditsTableComponent} from './credits-table/credits-table.component';

// Interface for links to external websites
export interface ExternalLink {
  id: string | null | undefined;
  url: string;
  label: string;
}

// Interface for links to social media sites
export interface SocialLink {
  id: string | null | undefined;
  url: string;
  icon: string;
}

@Component({
  selector: 'app-person',
  standalone: true,
  imports: [
    PosterUrlPipePipe,
    NgIf,
    DatePipe,
    TableModule,
    DividerModule,
    ButtonModule,
    Accordion,
    AccordionPanel,
    AccordionHeader,
    AccordionContent,
    CreditsTableComponent,
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
  crewCredits: WritableSignal<ItemCredit[][]> = this.det.crewCredits;

  isLoading: WritableSignal<boolean> = this.det.isLoading;

  externalLinks: Signal<ExternalLink[]>  = computed(() => [
    {
      id: this.person().external_ids?.imdb_id,
      url: `https://www.imdb.com/name/${this.person().external_ids?.imdb_id || ''}`,
      label: 'IMDB'
    },
    {
      id: this.person().external_ids?.wikidata_id,
      url: `https://www.wikidata.org/wiki/${this.person().external_ids?.wikidata_id || ''}`,
      label: 'WikiData'
    }
  ]);

  socialLinks: Signal<SocialLink[]> = computed(() => [
    {
      id: this.person().external_ids?.instagram_id,
      url: `https://instagram.com/${this.person().external_ids?.instagram_id || ''}`,
      icon: 'pi-instagram'
    },
    {
      id: this.person().external_ids?.twitter_id,
      url: `https://twitter.com/${this.person().external_ids?.twitter_id || ''}`,
      icon: 'pi-twitter'
    },
    {
      id: this.person().external_ids?.facebook_id,
      url: `https://www.facebook.com/${this.person().external_ids?.facebook_id || ''}`,
      icon: 'pi-facebook'
    },
    {
      id: this.person().external_ids?.youtube_id,
      url: `https://www.youtube.com/${this.person().external_ids?.youtube_id || ''}`,
      icon: 'pi-youtube'
    }
  ]);

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
