import { Component } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { PermissionsService } from '../services/permissions.service'
import { IfObjectPermissionsDirective } from './if-object-permissions.directive'

@Component({
  template: `
    <div>
      <button
        *pngxIfObjectPermissions="{
          object: { id: 2, owner: user1 },
          action: 'view',
        }"
      >
        Some Text
      </button>
    </div>
  `,
  imports: [IfObjectPermissionsDirective],
})
class TestComponent {}

describe('IfObjectPermissionsDirective', () => {
  let fixture: ComponentFixture<TestComponent>
  let permissionsService: PermissionsService

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [IfObjectPermissionsDirective, TestComponent],
      providers: [PermissionsService],
    })
    permissionsService = TestBed.inject(PermissionsService)
  })

  it('should create element if user has object permissions', () => {
    jest
      .spyOn(permissionsService, 'currentUserHasObjectPermissions')
      .mockImplementation(() => {
        return true
      })

    fixture = TestBed.createComponent(TestComponent)

    fixture.detectChanges()

    const rootEl = (fixture.nativeElement as HTMLDivElement).children[0]
    expect(rootEl.querySelectorAll('button').length).toEqual(1)
  })

  it('should not create element if user does not have object permissions', () => {
    jest
      .spyOn(permissionsService, 'currentUserHasObjectPermissions')
      .mockImplementation(() => {
        return false
      })

    fixture = TestBed.createComponent(TestComponent)

    fixture.detectChanges()

    const rootEl = (fixture.nativeElement as HTMLDivElement).children[0]
    expect(rootEl.querySelectorAll('button').length).toEqual(0)
  })
})
