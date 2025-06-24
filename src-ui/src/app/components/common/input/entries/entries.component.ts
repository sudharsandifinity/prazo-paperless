import { Component, forwardRef } from '@angular/core'
import {
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms'
import { NgxBootstrapIconsModule } from 'ngx-bootstrap-icons'
import { AbstractInputComponent } from '../abstract-input'

@Component({
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => EntriesComponent),
      multi: true,
    },
  ],
  selector: 'pngx-input-entries',
  templateUrl: './entries.component.html',
  styleUrl: './entries.component.scss',
  imports: [FormsModule, ReactiveFormsModule, NgxBootstrapIconsModule],
})
export class EntriesComponent extends AbstractInputComponent<object> {
  entries = []

  constructor() {
    super()
  }

  inputChange(): void {
    // Remove empty keys
    this.onChange(
      Object.fromEntries(this.entries.filter(([key]) => key?.length))
    )
  }

  writeValue(newValue: any): void {
    if (!newValue) {
      newValue = {}
    }
    this.entries = Object.entries(newValue)
    this.value = newValue
  }

  addEntry(): void {
    this.entries.push(['', ''])
    this.inputChange()
  }

  removeEntry(index: number): void {
    this.entries.splice(index, 1)
    this.inputChange()
  }
}
