import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.css']
})
export class ToDoComponent implements OnInit {
  items: any = [];
  editMode = false;
  itemData!: FormGroup;
  holder: number = 0;
  invalid = false;
  checked = false;

  ngOnInit(): void {

    this.itemData = new FormGroup({
      item: new FormControl('Enter To-Do Item', [Validators.required, Validators.maxLength(5)]),
      checked: new FormControl(false)
    });
    console.log(this.item);
    
  }

  get item() {
    return this.itemData.controls['item'];
  }

  addItem() {
    const itemControl = this.itemData.controls['item'];
    const strikeControl = this.itemData.controls['checked'];
    if (itemControl.invalid) {
      console.log(itemControl.errors)
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
      this.items.push(this.itemData.getRawValue())
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
