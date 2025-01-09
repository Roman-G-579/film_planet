import {ChangeDetectionStrategy, Component, inject, OnInit, signal, WritableSignal} from '@angular/core';
import {CastCrewMember} from '../../core/interfaces/cast-crew-member.interface';
import {PosterUrlPipePipe} from '../../core/pipes/poster-url-pipe.pipe';
import {DetailsService} from '../../core/services/details.service';
import {ActivatedRoute} from '@angular/router';
import {DataUtils} from '../../core/utils/data.utils';
import {DatePipe, NgIf} from '@angular/common';

@Component({
  selector: 'app-person',
  standalone: true,
  imports: [
    PosterUrlPipePipe,
    NgIf,
    DatePipe
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
