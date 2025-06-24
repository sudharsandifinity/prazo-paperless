import { DatePipe } from '@angular/common'
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http'
import { provideHttpClientTesting } from '@angular/common/http/testing'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap'
import { NgxBootstrapIconsModule, allIcons } from 'ngx-bootstrap-icons'
import { of } from 'rxjs'
import { IfPermissionsDirective } from 'src/app/directives/if-permissions.directive'
import { SortableDirective } from 'src/app/directives/sortable.directive'
import { CorrespondentService } from 'src/app/services/rest/correspondent.service'
import { PageHeaderComponent } from '../../common/page-header/page-header.component'
import { CorrespondentListComponent } from './correspondent-list.component'

describe('CorrespondentListComponent', () => {
  let component: CorrespondentListComponent
  let fixture: ComponentFixture<CorrespondentListComponent>
  let correspondentsService: CorrespondentService

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [
        NgbPaginationModule,
        FormsModule,
        ReactiveFormsModule,
        NgxBootstrapIconsModule.pick(allIcons),
        CorrespondentListComponent,
        SortableDirective,
        PageHeaderComponent,
        IfPermissionsDirective,
      ],
      providers: [
        DatePipe,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    }).compileComponents()
    correspondentsService = TestBed.inject(CorrespondentService)
  })

  // Tests are included in management-list.component.spec.ts

  it('should use correct delete message', () => {
    jest.spyOn(correspondentsService, 'listFiltered').mockReturnValue(
      of({
        count: 3,
        all: [1, 2, 3],
        results: [
          {
            id: 1,
            name: 'Correspondent1',
          },
          {
            id: 2,
            name: 'Correspondent2',
          },
          {
            id: 3,
            name: 'Correspondent3',
          },
        ],
      })
    )
    fixture = TestBed.createComponent(CorrespondentListComponent)
    component = fixture.componentInstance
    fixture.detectChanges()

    expect(
      component.getDeleteMessage({ id: 1, name: 'Correspondent1' })
    ).toEqual(
      'Do you really want to delete the correspondent "Correspondent1"?'
    )
  })

  it('should support very old date strings', () => {
    jest.spyOn(correspondentsService, 'listFiltered').mockReturnValue(
      of({
        count: 2,
        all: [1, 2],
        results: [
          {
            id: 1,
            name: 'Correspondent1',
            last_correspondence: '1832-12-31T15:32:54-07:52:58',
          },
          {
            id: 2,
            name: 'Correspondent2',
            last_correspondence: '1901-07-01T00:00:00+00:09:21',
          },
        ],
      })
    )
    fixture = TestBed.createComponent(CorrespondentListComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })
})
