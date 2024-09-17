import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CompanyService } from '../../Services/company.service';

@Component({
  selector: 'app-invoices',
  standalone: true,
  imports: [ReactiveFormsModule,NgIf,NgFor],
  imports: [CommonModule , ReactiveFormsModule ,RouterLink,],
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
export class InvoicesComponent implements OnInit{
  isLoading:boolean=false;

  AddInvoiceDetailsForm:FormGroup = new FormGroup({
    billsTotal: new FormControl(1000),
    percentageDiscount:new FormControl(null , [ Validators.required , Validators.min(0), Validators.max(100)] ),
    valueDiscount:new FormControl(null),
    net:new FormControl(null),
    paidUp:new FormControl(null,[Validators.required]),
    rest:new FormControl(null),

    //------------- Request A Form Data ------------------------

    employeeName: new FormControl(null,[Validators.required]),
    date:new FormControl(null , [ Validators.required ] ),
    startTime:new FormControl(null),
    endTime:new FormControl(null),
  },{validators:[this.PriceValidation(),this.TimeValidation()]});
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
  //Time custom  validators
  TimeValidation():ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const endTime = control.get('endTime')?.value;
      const startTime = control.get('startTime')?.value; 
      if(endTime != null && startTime != null) 
      {
        if (startTime >= endTime) {
          return { endTimeGreaterThanStartTime: true };
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
  ngOnInit(): void {}

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
  // -------------- Request A Form --------------------

  employeeList:string[]=["Sanad",'Diab','Alaa','Yousef','Abdullah'];
  

  handelAdditem(Form:FormGroup)
  {
   this.isLoading=true; 
   if (Form.valid)
  {
    console.log(Form.value);
    this.isLoading=false; 
    this.AddInvoiceDetailsForm.reset();
  }

 }

}
