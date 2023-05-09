import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.css']
})
export class ToDoComponent implements OnInit {
  items: any = [];

  itemData!: FormGroup;

  ngOnInit(): void {

    this.itemData = new FormGroup({
      item: new FormControl()
    });
  }

  addItem() {
    this.items.push( this.itemData.controls['item'].getRawValue());
  }

}
