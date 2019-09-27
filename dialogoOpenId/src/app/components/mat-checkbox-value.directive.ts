import {Directive, Input} from '@angular/core';
import {MatCheckbox} from '@angular/material/checkbox';

@Directive({
  selector: 'mat-checkbox[checkboxValue]',
  exportAs: 'checkboxValue'
})
export class CheckboxValueDirective {

  @Input('checkboxValue') checkbox: MatCheckbox;
  @Input() falseValue: string = '0';
  @Input() trueValue: string = '1';

  ngOnInit() {
    this.checkbox.value = this.checkbox.checked ? this.trueValue : this.falseValue;
    this.checkbox.registerOnChange((checked: boolean) => {
      this.checkbox.value = checked ? this.trueValue : this.falseValue;
    })
  }
}
