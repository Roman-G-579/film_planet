import {ChangeDetectionStrategy, Component, inject, OnInit, signal, WritableSignal} from '@angular/core';
import {CastCrewMember} from '../../core/interfaces/cast-crew-member.interface';
import {PosterUrlPipePipe} from '../../core/pipes/poster-url-pipe.pipe';
import {DetailsService} from '../../core/services/details.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-person',
  standalone: true,
  imports: [
    PosterUrlPipePipe
  ],
  templateUrl: './person.component.html',
  styleUrl: './person.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PersonComponent implements OnInit {
  protected readonly det = inject(DetailsService);
  private route = inject(ActivatedRoute);

  person: WritableSignal<CastCrewMember> = this.det.person;

  isLoading: WritableSignal<boolean> = this.det.isLoading;

  ngOnInit() {
    this.isLoading.set(true);
    this.route.paramMap.subscribe(params => {
      const personId = params.get('id') || '';

      this.det.getPersonDetails(Number(personId));
    })
  }
}
