import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http'
import { provideHttpClientTesting } from '@angular/common/http/testing'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import {
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms'
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap'
import { NgSelectModule } from '@ng-select/ng-select'
import { SelectComponent } from '../../select/select.component'
import { PermissionsGroupComponent } from '../permissions-group/permissions-group.component'
import { PermissionsUserComponent } from '../permissions-user/permissions-user.component'
import { PermissionsFormComponent } from './permissions-form.component'

describe('PermissionsFormComponent', () => {
  let component: PermissionsFormComponent
  let fixture: ComponentFixture<PermissionsFormComponent>

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        NgbAccordionModule,
        NgSelectModule,
        PermissionsFormComponent,
        SelectComponent,
        PermissionsGroupComponent,
        PermissionsUserComponent,
      ],
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    }).compileComponents()

    fixture = TestBed.createComponent(PermissionsFormComponent)
    fixture.debugElement.injector.get(NG_VALUE_ACCESSOR)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should support use of select for owner', () => {
    const changeSpy = jest.spyOn(component, 'onChange')
    component.ngOnInit()
    component.users = [
      {
        id: 2,
        username: 'foo',
      },
      {
        id: 3,
        username: 'bar',
      },
    ]
    component.form.get('owner').patchValue(2)
    fixture.detectChanges()
    expect(changeSpy).toHaveBeenCalledWith({
      owner: 2,
      set_permissions: {
        view: { users: [], groups: [] },
        change: { users: [], groups: [] },
      },
    })
  })

  it('should disable form on disabled state change', () => {
    component.setDisabledState(false)
    expect(component.form.disabled).toBeFalsy()
    component.setDisabledState(true)
    expect(component.form.disabled).toBeTruthy()
  })
})
