import { Component, signal, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup } from "@angular/forms";
import { IgdsButton } from "@igds/angular/button";
import { IgdsRadioGroup } from "@igds/angular/radio-group";
import { IgdsRadio } from "@igds/angular/radio";
import { IgdsInput } from "@igds/angular/input";

@Component({
  selector: 'app-root',
  imports: [ReactiveFormsModule, IgdsButton, IgdsRadioGroup, IgdsRadio, IgdsInput],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class App {
  inputValue = signal('default');
  inputValue2 = '';
  checkboxValue = false;
  variant = signal<typeof this.buttonVariants[number]>('primary');
  buttonVariants = [
    'alternative',
    'link',
    'link-inline',
    'primary',
    'secondary',
  ] as const;

  form: FormGroup = new FormGroup({
    input: new FormControl(''),
  });

  submit(_event: SubmitEvent) {
    const formValues = this.form.value;
    console.log('form submitted:', formValues);
    alert(`Form input value: ${formValues.input}`);
  }

  handleChange(variant: CustomEvent<{value: string;}>) {
    console.log('handleChange', variant.detail.value, this.buttonVariants);
    this.variant.set(variant.detail.value as typeof this.buttonVariants[number]);
  }

  handleInput(event: Event) {
    const value = (event as CustomEvent).detail.value;
    this.inputValue.set(value);
  }
}
