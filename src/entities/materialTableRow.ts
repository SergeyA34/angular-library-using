import { FormArray, FormControl, FormGroup } from '@angular/forms';

export interface MaterialTableRow {
  rowId: number;
  material: string;
  taxId: string;
  collectingEntityName: string;
  capacity: number | null;
}

export type MaterialTableRowForm = FormGroup<{
  rowId: FormControl<number>;
  material: FormControl<string>;
  taxId: FormControl<string>;
  collectingEntityName: FormControl<string>;
  capacity: FormControl<number | null>;
}>;

export type MaterialTableForm = FormGroup<{
  rows: FormArray<MaterialTableRowForm>;
}>;

export function createMaterialTableRowFormGroup(
  row: Partial<MaterialTableRow> & Pick<MaterialTableRow, 'rowId'>,
): MaterialTableRowForm {
  return new FormGroup({
    rowId: new FormControl(row.rowId, { nonNullable: true }),
    material: new FormControl(row.material ?? '', { nonNullable: true }),
    taxId: new FormControl(row.taxId ?? '', { nonNullable: true }),
    collectingEntityName: new FormControl(
      row.collectingEntityName ?? '',
      { nonNullable: true },
    ),
    capacity: new FormControl(row.capacity ?? null),
  });
}

export function createMaterialTableForm(
  initialRows: Array<Partial<MaterialTableRow> & Pick<MaterialTableRow, 'rowId'>> = [
    { rowId: 1, material: 'WOOD', taxId: '1234567890', collectingEntityName: 'Test Entity', capacity: 100 },
    { rowId: 2, material: 'METAL', taxId: '1234567891', collectingEntityName: 'Test Entity 2', capacity: 200 },
  ],
): MaterialTableForm {
  return new FormGroup({
    rows: new FormArray(
      initialRows.map((row) => createMaterialTableRowFormGroup(row)),
    ),
  });
}
