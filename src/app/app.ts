import { Component, signal, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup } from "@angular/forms";
import { IgdsButton } from "@igds/angular/button";
import { IgdsRadioGroup } from "@igds/angular/radio-group";
import { IgdsRadio } from "@igds/angular/radio";
import { IgdsInput } from "@igds/angular/input";
import { IgdsTable } from "@igds/angular/table";
import { IgdsTableHeader } from "@igds/angular/table-header";
import { IgdsTableRow } from "@igds/angular/table-row";
import { IgdsTableCell } from "@igds/angular/table-cell";
import { IgdsDropdown } from "@igds/angular/dropdown";
import { IgdsIcon } from "@igds/angular/icon";
import { Option } from "@igds/core-web/dropdown";
import { plus, pencilOutlined } from "@igds/icons";

@Component({
  selector: 'app-root',
  imports: [
    ReactiveFormsModule,
    IgdsButton,
    IgdsRadioGroup,
    IgdsRadio,
    IgdsInput,
    IgdsTable,
    IgdsTableHeader,
    IgdsTableRow,
    IgdsTableCell,
    IgdsDropdown,
    IgdsIcon,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class App {
  inputValue = signal('default');
  inputValue2 = '';
  checkboxValue = false;
  variant = signal<typeof this.buttonVariants[number]>('primary');
  selectedRows = signal<string[]>([]);
  buttonVariants = [
    'alternative',
    'link',
    'link-inline',
    'primary',
    'secondary',
  ] as const;
  dropdownOptions: Option[] = [
    {
      id: '1',
      label: "Option #1"
    },
    {
      id: '2',
      label: "Option #2"
    },
    {
      id: '3',
      label: "Option #3"
    },
  ]
  rows = ['1', '2', '3'];
  plusIcon = plus
  pencilIcon = pencilOutlined

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

  handleRowSelection($event: CustomEvent<{value: string[]}>) {
    this.selectedRows.set($event.detail.value);
  }

  getFieldDisableState(id: string) {
    return !this.selectedRows().includes(id);
  }
}
