import {ChangeDetectionStrategy, Component, computed, input, InputSignal, Signal} from '@angular/core';
import {DatePipe, NgIf} from "@angular/common";
import {ExternalIDs} from '../../../core/interfaces/external-ids.interface';

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
  selector: 'app-details-panel',
  standalone: true,
    imports: [
        DatePipe,
        NgIf
    ],
  templateUrl: './details-panel.component.html',
  styleUrl: './details-panel.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailsPanelComponent {
  creditsCnt: InputSignal<number> = input(0);
  external_ids: InputSignal<ExternalIDs | undefined> = input();
  known_for_department: InputSignal<string> = input('');
  gender: InputSignal<number> = input(1);
  place_of_birth: InputSignal<string> = input('');
  birthday: InputSignal<string> = input('');

  externalLinks: Signal<ExternalLink[]>  = computed(() => [
    {
      id: this.external_ids()?.imdb_id,
      url: `https://www.imdb.com/name/${this.external_ids()?.imdb_id || ''}`,
      label: 'IMDB'
    },
    {
      id: this.external_ids()?.wikidata_id,
      url: `https://www.wikidata.org/wiki/${this.external_ids()?.wikidata_id || ''}`,
      label: 'WikiData'
    }
  ]);

  socialLinks: Signal<SocialLink[]> = computed(() => [
    {
      id: this.external_ids()?.instagram_id,
      url: `https://instagram.com/${this.external_ids()?.instagram_id || ''}`,
      icon: 'pi-instagram'
    },
    {
      id: this.external_ids()?.twitter_id,
      url: `https://twitter.com/${this.external_ids()?.twitter_id || ''}`,
      icon: 'pi-twitter'
    },
    {
      id: this.external_ids()?.facebook_id,
      url: `https://www.facebook.com/${this.external_ids()?.facebook_id || ''}`,
      icon: 'pi-facebook'
    },
    {
      id: this.external_ids()?.youtube_id,
      url: `https://www.youtube.com/${this.external_ids()?.youtube_id || ''}`,
      icon: 'pi-youtube'
    }
  ]);
}
