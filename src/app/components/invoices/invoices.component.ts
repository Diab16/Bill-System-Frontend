import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-invoices',
  standalone: true,
  imports: [ReactiveFormsModule,NgIf,NgFor],
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.css']
})
export class InvoicesComponent implements OnInit {
  billForm: FormGroup;
  clients = [
    { id: 1, name: 'Client 1' },
    { id: 2, name: 'Client 2' }
  ];
  items = [
    { id: 1, name: 'Item 1', sellingPrice: 100, unit: 'Unit 1' },
    { id: 2, name: 'Item 2', sellingPrice: 200, unit: 'Unit 2' }
  ];
  addedItems: any[] = [];
  totalValue: number = 0;

  constructor(private fb: FormBuilder) {
    this.billForm = this.fb.group({
      billDate: ['', Validators.required],
      billNumber: [{ value: this.generateBillNumber(), disabled: true }],
      clientName: ['', Validators.required],
      itemName: ['', Validators.required],
      sellingPrice: [0, [Validators.required]],
      quantity: [1, [Validators.required, Validators.min(1)]],
      totalValue: [{ value: 0, disabled: true }]
    });
  }

  ngOnInit(): void {
    this.billForm.get('quantity')?.valueChanges.subscribe(() => this.calculateTotalValue());
    this.billForm.get('sellingPrice')?.valueChanges.subscribe(() => this.calculateTotalValue());
  }

  generateBillNumber(): number {
    return Math.floor(1000 + Math.random() * 9000); 
  }

  onItemSelect(event: any): void {
    const selectedItem = this.items.find(item => item.id === +event.target.value);
    if (selectedItem) {
      this.billForm.get('sellingPrice')?.setValue(selectedItem.sellingPrice);
    }
  }

  calculateTotalValue(): void {
    const quantity = this.billForm.get('quantity')?.value || 0;
    const sellingPrice = this.billForm.get('sellingPrice')?.value || 0;
    this.totalValue = quantity * sellingPrice;
    this.billForm.get('totalValue')?.setValue(this.totalValue);
  }

  addItem(): void {
    if (this.billForm.valid) {
      const selectedItem = this.items.find(item => item.id === +this.billForm.get('itemName')?.value);
      const addedItem = {
        code: selectedItem?.id,
        name: selectedItem?.name,
        unit: selectedItem?.unit,
        quantity: this.billForm.get('quantity')?.value,
        sellingPrice: this.billForm.get('sellingPrice')?.value,
        discount: 0, 
        totalBalance: this.totalValue
      };

      this.addedItems.push(addedItem);

      this.billForm.get('itemName')?.reset('');
      this.billForm.get('quantity')?.reset(1);
      this.billForm.get('sellingPrice')?.reset(0);
      this.totalValue = 0;
      this.billForm.get('totalValue')?.reset(0);
    }
  }

  onSubmit(): void {
    if (this.billForm.valid) {
      console.log('Form Submitted', this.billForm.value);
    }
  }
}
