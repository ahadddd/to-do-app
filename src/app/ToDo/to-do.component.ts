import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.css']
})
export class ToDoComponent implements OnInit {
  items: any = ['Hello', 'World', 'Test', 'To-do', 'item', 'Item2', 'Item3', 'Item4', 'Item5', 'Item6'];
  editMode = false;
  itemData!: FormGroup;
  holder: number = 0;
  invalid = false;

  ngOnInit(): void {

    this.itemData = new FormGroup({
      item: new FormControl('', [Validators.required, Validators.maxLength(200)])
    });
  }

  addItem() {

    const itemControl = this.itemData.controls['item'];
    if (itemControl.invalid) {
      alert('Field is required.')
    }
    // let exists = false;
    // this.items.forEach((item: any) => {
    //   if (this.itemData.controls['item'].getRawValue() == item) {
    //     exists = true;
    //     return;
    //   }
    // })
    // if (exists == false) {
    //   this.items.push(this.itemData.controls['item'].getRawValue());
    //   alert('To do added.')
    // }
    // else {
    //   alert('To do already exists.')
    // }
    if (itemControl.valid) {
      this.items.push(itemControl.getRawValue())
      this.itemData.reset()
    }
  }

  save() {
    this.items[this.holder] = this.itemData.controls['item'].getRawValue();
    this.holder = 0;
    this.editMode = false;
    this.itemData.reset();
  }

  editToDo(index: any) {
    this.itemData.setValue({ item: this.items[index] })
    this.editMode = true;
    this.holder = index;
  }

  deleteToDo(index: any) {
    this.items.splice(index, 1);
  }

  cancelChanges() {
    this.editMode = false;
    this.itemData.reset();
  }

}
