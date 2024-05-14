import { compileNgModule } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'Angular-15-CRUD-app-using-material-UI';

  form: FormGroup;

  formDataStored: any = [];

  constructor(private _formBuilder: FormBuilder) {
    this.form = this._formBuilder.group({
      id: [''],
      name: [''],
      lastname: [''],
      email: [''],
    });

    const storedData = localStorage.getItem('formData');

    if (storedData) {
      this.formDataStored = JSON.parse(storedData);
    }
  }

  ngOnInit(): void {}

  submit() {
    const currentValue = this.form.value;
    currentValue.id = this.formDataStored.length + 1;
    this.formDataStored.push(currentValue);
    localStorage.setItem('formData', JSON.stringify(this.formDataStored));
    this.form.reset();
  }

  editData(id: number) {
    // const index = id - 1;
    const index = this.formDataStored.findIndex((item: any) => item.id === id);
    const dataToEdit = this.formDataStored[index];
    this.form.patchValue(dataToEdit);
  }

  deleteData(id: number) {
    // const index = id - 1;
    const index = this.formDataStored.findIndex((item: any) => item.id === id);
    const confirmation = confirm('Are you sure you want to delete');
    if (confirmation) {
      this.formDataStored.splice(index, 1);
      localStorage.setItem('formData', JSON.stringify(this.formDataStored));
    }
  }

  updateName() {
    const updateData = this.form.value;
    const index = this.formDataStored.findIndex(
      (dataId: any) => dataId.id === updateData.id
    );
    if (index !== -1) {
      this.formDataStored[index] = updateData;
      // Update localStorage
      localStorage.setItem('formData', JSON.stringify(this.formDataStored));
      // Clear the form
      this.form.reset();
    }
  }
}
