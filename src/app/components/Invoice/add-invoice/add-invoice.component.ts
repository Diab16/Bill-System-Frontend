import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ItemsServiceService } from '../../../Services/items-service.service';
import { Iitems } from '../../../Interfaces/Iitems';
import { IInvoiceItem } from '../../../Interfaces/iInvoiceItem';
import { InvoiceService } from '../../../Services/invoice.service';
import { IInvoice } from '../../../Interfaces/iInvoice';

@Component({
  selector: 'app-add-invoice',
  standalone: true,
  imports: [CommonModule , ReactiveFormsModule ,RouterLink,NgIf,NgFor],
  templateUrl: './add-invoice.component.html',
  styleUrl: './add-invoice.component.css'
})
export class AddInvoiceComponent {
  clients = [
    { id: 1, name: 'Client 1' },
    { id: 2, name: 'Client 2' }
  ];
  allItems :Iitems[] = [];
  items :Iitems[] =[]; // for select only
  invoiceData:any;
  tableItems:any[] = [];
  addedItems: IInvoiceItem[] = [];
  totalValue: number = 0;
  randomNum:number = 0;

  AddItemDetailsForm:FormGroup = new FormGroup({
    itemId:new FormControl("", [ Validators.required]),
    sellingPrice:new FormControl(null, [ Validators.required ,Validators.min(0)]),
    quantity:new FormControl(null, [ Validators.required,Validators.min(1)]),
    totalValue:new FormControl(null)
  });
  AddInvoiceDetailsForm:FormGroup = new FormGroup({
    billTotal: new FormControl(null),
    percentageDiscount:new FormControl(null , [ Validators.required , Validators.min(0), Validators.max(100)] ),
    valueDiscount:new FormControl({value:null,disabled:true}),
    net:new FormControl({value:null,disabled:true}),
    paidUp:new FormControl(null,[Validators.required]),
    rest:new FormControl({value:null,disabled:true}),
    date:new FormControl(null, [ Validators.required]),
    billNumber:new FormControl(this.randomNum),
    clientId:new FormControl("", [ Validators.required])
    
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
  get getbillTotal(){
    return this.AddInvoiceDetailsForm.controls["billTotal"];
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

  constructor(private itemService:ItemsServiceService ,private invoiceService :InvoiceService , private router:Router) {
    
  }

  allInvoices:IInvoice[]=[];
  ngOnInit(): void {
    this.AddInvoiceDetailsForm.get('quantity')?.valueChanges.subscribe(() => this.calculateTotalValue());
    this.AddInvoiceDetailsForm.get('sellingPrice')?.valueChanges.subscribe(() => this.calculateTotalValue());
    this.itemService.getAllItems().subscribe({
      next: (response)=>{
        this.allItems = response;
        this.items = response;
      }
    });
    this.invoiceService.GetAllInvoices().subscribe({
      next:(response)=>{
        this.allInvoices = response;
        this.randomNum = this.generateBillNumber(this.allInvoices);
        this.AddInvoiceDetailsForm.get('billNumber')?.setValue(this.randomNum);        
        
      }
    })
  }

  generateBillNumber(arr:any[]): number {  
    var flag = false;
    var rand= 0;
    while (!flag) {
      rand =Math.floor( Math.random() * 9999);
      flag=true;
      for (var inv of arr) {
        if(inv.billNumber == rand){
          flag=false;
          break;
        }
      }
    }
    return rand; 
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
      const selectedItem = this.items.find(item => item.id === +this.AddItemDetailsForm.get('itemId')?.value);
      const addedItem = {
        code: selectedItem?.id,
        name: selectedItem?.name,
        unit: selectedItem?.unit.name,
        quantity: this.AddItemDetailsForm.get('quantity')?.value,
        sellingPrice: this.AddItemDetailsForm.get('sellingPrice')?.value,
        totalBalance: this.totalValue
      };
      this.tableItems.push(addedItem);
      this.addedItems.push({...this.AddItemDetailsForm.value});
      this.items = this.items.filter(item => item.id != selectedItem?.id);
      this.AddInvoiceDetailsForm.get('billTotal')?.setValue(Number(this.AddInvoiceDetailsForm.get('billTotal')?.value) + Number(this.totalValue));
      this.totalValue = 0;
      this.AddItemDetailsForm.reset();
      this.AddItemDetailsForm.get('itemId')?.reset('');
    }
  }
  deleteRow(itemCode:number){
    
    var deletedItem = this.addedItems.find(item => item.itemId == itemCode);


    this.addedItems = this.addedItems.filter(item => item.itemId != itemCode);

    
    this.tableItems = this.tableItems.filter(item => item.code != itemCode);


    const selectedItem = this.allItems.find(item => item.id == itemCode);
    if(selectedItem){
      this.items.push(selectedItem);
      this.items.sort((a,b)=> a.id-b.id);
      
      
      this.getbillTotal.setValue(Number(this.AddInvoiceDetailsForm.get('billTotal')?.value) - Number(deletedItem?.totalValue));
    }
   

  }
  isLoading:boolean=false;


   
  onBillTotalOrDiscountChange(): void {
    const disc = this.getpercentageDiscount.value;
    const total = this.getbillTotal.value;
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
    this.invoiceData = {...this.AddInvoiceDetailsForm.value ,invoiceItems: this.addedItems};
    this.invoiceService.AddInvoice(this.invoiceData).subscribe({
      next:()=>{
        this.router.navigate(['/manage/Invoices'])
        
      },
      error:()=>{
        console.log("error");
        
      }
    })
    this.isLoading=false; 
    this.AddInvoiceDetailsForm.reset();
    this.AddItemDetailsForm.reset();
    this.AddItemDetailsForm.get('itemId')?.reset('');
    this.AddInvoiceDetailsForm.get('clientId')?.reset('');
    this.addedItems =[];
    this.items = this.allItems;

  }

 }
}
