import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CompanyService } from '../../Services/company.service';

@Component({
  selector: 'app-invoices',
  standalone: true,
  imports: [CommonModule , ReactiveFormsModule ,RouterLink,NgIf,NgFor],
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.css']
})
export class InvoicesComponent implements OnInit {
  clients = [
    { id: 1, name: 'Client 1' },
    { id: 2, name: 'Client 2' }
  ];
  allItems = [
    { id: 1, name: 'Item 1', sellingPrice: 100, unit: 'Unit 1' },
    { id: 2, name: 'Item 2', sellingPrice: 200, unit: 'Unit 2' },
    { id: 3, name: 'Item 3', sellingPrice: 300, unit: 'Unit 3' }
  ];
  items = [// for select only
    { id: 1, name: 'Item 1', sellingPrice: 100, unit: 'Unit 1' },
    { id: 2, name: 'Item 2', sellingPrice: 200, unit: 'Unit 2' },
    { id: 3, name: 'Item 3', sellingPrice: 300, unit: 'Unit 3' }
  ];
  addedItems: any[] = [];
  totalValue: number = 0;

  AddItemDetailsForm:FormGroup = new FormGroup({
    itemName:new FormControl("", [ Validators.required]),
    sellingPrice:new FormControl(null, [ Validators.required]),
    quantity:new FormControl(null, [ Validators.required,Validators.min(1)]),
    totalValue:new FormControl(null)
  });
  AddInvoiceDetailsForm:FormGroup = new FormGroup({
    billsTotal: new FormControl(null),
    percentageDiscount:new FormControl(null , [ Validators.required , Validators.min(0), Validators.max(100)] ),
    valueDiscount:new FormControl(null),
    net:new FormControl(null),
    paidUp:new FormControl(null,[Validators.required]),
    rest:new FormControl(null),
    billDate:new FormControl(null, [ Validators.required]),
    billNumber:new FormControl(this.generateBillNumber()),
    clientName:new FormControl("", [ Validators.required])
    
  },{validators:[this.PriceValidation()]});
  //price custom  validators
  PriceValidation():ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const paidPrice = control.get('paidUp')?.value;
      const netPrice = control.get('net')?.value; 
      if(paidPrice != null && netPrice != null) 
      {
        if (netPrice > paidPrice) {
          return { paidPriceGreaterThanOrEqualNet: true };
        }
      }
      return null
   }
  }

  // Get Properties
  get getbillsTotal(){
    return this.AddInvoiceDetailsForm.controls["billsTotal"];
  }
  get getpercentageDiscount(){
    return this.AddInvoiceDetailsForm.controls["percentageDiscount"];
  }
  get getvalueDiscount(){
    return this.AddInvoiceDetailsForm.controls["valueDiscount"];
  }
  get getNet(){
    return this.AddInvoiceDetailsForm.controls["net"];
  }
  get getPaidUp(){
    return this.AddInvoiceDetailsForm.controls["paidUp"];
  }
  get getRest(){
    return this.AddInvoiceDetailsForm.controls["rest"];
  }

  constructor(private companyService:CompanyService) {}

  ngOnInit(): void {
    this.AddInvoiceDetailsForm.get('quantity')?.valueChanges.subscribe(() => this.calculateTotalValue());
    this.AddInvoiceDetailsForm.get('sellingPrice')?.valueChanges.subscribe(() => this.calculateTotalValue());
  }

  generateBillNumber(): number {
    return Math.floor(1000 + Math.random() * 9000); 
  }

  onItemSelect(event: any): void {
    const selectedItem = this.items.find(item => item.id === +event.target.value);
    if (selectedItem) {
      this.AddItemDetailsForm.get('sellingPrice')?.setValue(selectedItem.sellingPrice);
    }
  }

  calculateTotalValue(): void {
    const quantity = this.AddItemDetailsForm.get('quantity')?.value || 0;
    const sellingPrice = this.AddItemDetailsForm.get('sellingPrice')?.value || 0;
    this.totalValue = quantity * sellingPrice;
    if(quantity > 0 && sellingPrice >=0){
      this.AddItemDetailsForm.get('totalValue')?.setValue(this.totalValue);
    }
  }

  addItem(): void {
    if (this.AddItemDetailsForm.valid) {
      const selectedItem = this.items.find(item => item.id === +this.AddItemDetailsForm.get('itemName')?.value);
      const addedItem = {
        code: selectedItem?.id,
        name: selectedItem?.name,
        unit: selectedItem?.unit,
        quantity: this.AddItemDetailsForm.get('quantity')?.value,
        sellingPrice: this.AddItemDetailsForm.get('sellingPrice')?.value,
        totalBalance: this.totalValue
      };

      this.addedItems.push(addedItem);
      this.items = this.items.filter(item => item.id != selectedItem?.id);
      this.AddInvoiceDetailsForm.get('billsTotal')?.setValue(Number(this.AddInvoiceDetailsForm.get('billsTotal')?.value) + Number(this.totalValue));
      this.totalValue = 0;
      this.AddItemDetailsForm.reset();
      this.AddItemDetailsForm.get('itemName')?.reset('');
    }
  }
  deleteRow(itemCode:number){
    var deletedItem = this.addedItems.find(item => item.code == itemCode);
    this.addedItems = this.addedItems.filter(item => item.code != itemCode);
    const selectedItem = this.allItems.find(item => item.id == itemCode);
    if(selectedItem){
      this.items.push(selectedItem);
      this.items.sort((a,b)=> a.id-b.id);
      this.AddInvoiceDetailsForm.get('billsTotal')?.setValue(Number(this.AddInvoiceDetailsForm.get('billsTotal')?.value) - Number(deletedItem.totalBalance));
    }
   

  }

  onSubmit(): void {
    if (this.AddInvoiceDetailsForm.valid) {
      console.log('Form Submitted', this.AddInvoiceDetailsForm.value);
    }
  }
  isLoading:boolean=false;


   
  onBillTotalOrDiscountChange(): void {
    const disc = this.getpercentageDiscount.value;
    const total = this.getbillsTotal.value;
    if(total >= 0 && disc >= 0 && disc <= 100){
      this.getvalueDiscount.setValue(Number(disc) * Number(total)*0.01);
      this.getNet.setValue(Number(total)-Number(this.getvalueDiscount.value))
    }else{
      this.getvalueDiscount.setValue(null);
      this.getNet.setValue(null)
    }
   
    
  }
  onPaidUpChange(): void {
    const net = this.getNet.value;
    const paid = this.getPaidUp.value;
    if (paid >=net) {
      this.getRest.setValue(Number(paid) - Number(net));
    }else{
      this.getRest.setValue(null);
    }
    
  }
  

  handelAdditem(Form:FormGroup)
  {
   this.isLoading=true; 
   if (Form.valid)
  {
    console.log(Form.value);
    this.isLoading=false; 
    this.AddInvoiceDetailsForm.reset();
    this.AddItemDetailsForm.reset();
    this.AddItemDetailsForm.get('itemName')?.reset('');
    this.AddInvoiceDetailsForm.get('clientName')?.reset('');
    this.addedItems =[];
    this.items = this.allItems;

  }

 }
}
