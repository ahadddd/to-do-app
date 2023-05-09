import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.css']
})
export class ToDoComponent implements OnInit {
  @ViewChild('listText', { static: true })
  listText!: ElementRef;

  items: any = ['Hello', 'World', 'Load', 'Test', 'Items'];
  editMode = false;
  itemData!: FormGroup;
  holder: number = 0;
  invalid = false;
  complete = false;
  selected = -1;

  ngOnInit(): void {

    this.itemData = new FormGroup({
      item: new FormControl('Enter', [Validators.required, Validators.maxLength(10)]),
    });
    console.log(this.item);

  }

  toggle(index: any) {
    
    if (this.selected === index) {
      this.selected = -1;
    } else {
      this.selected = index;
    }
  }

  get item() {
    return this.itemData.controls['item'];
  }

  addItem() {
    const itemControl = this.itemData.controls['item'];
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
      this.items.push(itemControl.getRawValue())
      this.itemData.reset()
    }
  }


  save() {
    const itemControl = this.itemData.controls['item'];
    if (itemControl.valid) {
      this.items[this.holder] = itemControl.getRawValue();
      this.holder = 0;
      this.editMode = false;
      this.itemData.reset()
    }
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
