import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ItemsServiceService } from '../../../Services/items-service.service';
import { Iitems } from '../../../Interfaces/Iitems';
import { IInvoiceItem } from '../../../Interfaces/iInvoiceItem';
import { InvoiceService } from '../../../Services/invoice.service';
import { IInvoice } from '../../../Interfaces/iInvoice';
import { ClientService } from '../../../Services/client.service';

@Component({
  selector: 'app-add-invoice',
  standalone: true,
  imports: [CommonModule , ReactiveFormsModule ,RouterLink,NgIf,NgFor],
  templateUrl: './add-invoice.component.html',
  styleUrl: './add-invoice.component.css'
})
export class AddInvoiceComponent implements OnInit {
  clients :any[]=[];
  allItems :Iitems[] = [];
  items :Iitems[] =[]; // for select only
  invoiceData:any;
  tableItems:any[] = [];
  addedItems: IInvoiceItem[] = [];
  totalValue: number = 0;
  randomNum:number = 0;
  successMessage: string | null = null; // For storing success message
  isLoading:boolean=false;
  itemEdits:{itemId:number,newQuantity:number}[] = []

  AddItemDetailsForm:FormGroup = new FormGroup({
    itemId:new FormControl("", [ Validators.required]),
    sellingPrice:new FormControl(null, [ Validators.required ,Validators.min(0)]),
    quantity:new FormControl(null, [ Validators.required,Validators.min(1)]),
    totalValue:new FormControl(null)
  });
  AddInvoiceDetailsForm:FormGroup = new FormGroup({
    billTotal: new FormControl(null),
    percentageDiscount:new FormControl(0 , [ Validators.required , Validators.min(0), Validators.max(100)] ),
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

  constructor(private clientService:ClientService, private itemService:ItemsServiceService ,private invoiceService :InvoiceService , private router:Router , private activatedRoute:ActivatedRoute) {
    
  }

  allInvoices:IInvoice[]=[];
  ngOnInit(): void {
    this.AddInvoiceDetailsForm.get('quantity')?.valueChanges.subscribe(() => this.calculateTotalValue());
    this.AddInvoiceDetailsForm.get('sellingPrice')?.valueChanges.subscribe(() => this.calculateTotalValue());
    this.itemService.getAllItems().subscribe({
      next: (response)=>{
        this.allItems = response.filter(i=>i.availableAmount != 0);
        this.items = response.filter(i=>i.availableAmount != 0);
      }
    });
    this.clientService.getClients().subscribe({
      next:(response)=>{
        this.clients = response;
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
      rand =Math.floor(1000 + Math.random() * 8999);
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
    const selectedItem = this.items.find(item => item.id === +this.AddItemDetailsForm.get('itemId')?.value);
    console.log(selectedItem);
    
    if (selectedItem) {
      this.itemService.getAmountById(selectedItem.id).subscribe({
        next:(currentAmount)=>{
          if(currentAmount >= Number(this.AddItemDetailsForm.get('quantity')?.value)){
            console.log("in if");
            if (this.AddItemDetailsForm.valid) {
              const addedItem = {
                code: selectedItem?.id,
                name: selectedItem?.name,
                unit: selectedItem?.unit.name,
                quantity: this.AddItemDetailsForm.get('quantity')?.value,
                sellingPrice: this.AddItemDetailsForm.get('sellingPrice')?.value,
                totalBalance: this.totalValue
              };
              const itemEdit={
                itemId:selectedItem.id,
                newQuantity:Number(selectedItem.availableAmount)-Number(addedItem.quantity)
              }
              console.log(itemEdit);
              
              this.successMessage = `${selectedItem.name} Added Successfully!`;
              setTimeout(() => {
                this.successMessage = null; // Clear message after 3 seconds
              }, 2000);
              this.itemEdits.push(itemEdit);
              this.tableItems.push(addedItem);
              this.addedItems.push({...this.AddItemDetailsForm.value});
              this.items = this.items.filter(item => item.id != selectedItem?.id);
              this.AddInvoiceDetailsForm.get('billTotal')?.setValue(Number(this.AddInvoiceDetailsForm.get('billTotal')?.value) + Number(this.totalValue));
              this.totalValue = 0;
              this.AddItemDetailsForm.reset();
              this.AddItemDetailsForm.get('itemId')?.reset('');
            }
           
          }
          else{
            console.log("in else");
            this.successMessage = `${selectedItem.name.toUpperCase()} : Only ${selectedItem.availableAmount} ${selectedItem.unit.name}s Left !`;
            setTimeout(() => {
              this.successMessage = null; // Clear message after 3 seconds
            }, 2000);
          }         
        }
      });
    }
    
    
  }
  deleteRow(itemCode:number){
    console.log(this.itemEdits);
    const selectedItem = this.allItems.find(item => item.id == itemCode);
    if(selectedItem){
      var deletedItem = this.addedItems.find(item => item.itemId == itemCode);
      this.addedItems = this.addedItems.filter(item => item.itemId != itemCode);
      this.tableItems = this.tableItems.filter(item => item.code != itemCode);
      this.itemEdits = this.itemEdits.filter(item => item.itemId != itemCode);
      console.log(this.itemEdits);
      this.items.push(selectedItem);
      this.items.sort((a,b)=> a.id-b.id);
      this.getbillTotal.setValue(Number(this.getbillTotal?.value) - Number(deletedItem?.totalValue));
      this.successMessage = `${selectedItem.name} Deleted Successfully`;
      setTimeout(() => {
        this.successMessage = null; // Clear message after 3 seconds
      }, 2000);
    }
    
  }
   
  onBillTotalOrDiscountChange(): void {
    const disc = this.getpercentageDiscount.value;
    const total = this.getbillTotal.value;
    if(total >= 0 && disc > 0 && disc <= 100){
      this.getvalueDiscount.setValue(Number(disc) * Number(total)*0.01);
      this.getNet.setValue(Number(total)-Number(this.getvalueDiscount.value))
    }else if(disc == 0){
      this.getvalueDiscount.setValue(0);
      this.getNet.setValue(total);
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
    for (const item of this.itemEdits) {
      console.log(item);
      this.itemService.editAmountByItemId(item.itemId,item.newQuantity).subscribe();
    }
    this.isLoading=true;     
    if (Form.valid)
    { 
      this.invoiceData = {...this.AddInvoiceDetailsForm.value ,invoiceItems: this.addedItems};
      this.invoiceService.AddInvoice(this.invoiceData).subscribe({
        next:()=>{
          this.successMessage = 'Invoice added Successfully!'; // Set success message
          setTimeout(() => {
            this.successMessage = null; // Clear message after 3 seconds
            this.router.navigate(['..'],{relativeTo:this.activatedRoute}); // Navigate Back to previous route
          }, 1500);
        },
        error:()=>{
          console.log("error");
        }
      });
      
      this.isLoading=false; 
      // this.AddInvoiceDetailsForm.reset();
      // this.AddItemDetailsForm.reset();
      // this.AddItemDetailsForm.get('itemId')?.reset('');
      // this.AddInvoiceDetailsForm.get('clientId')?.reset('');
      this.addedItems =[];
      this.items = this.allItems;                
    }
 }
 
 

}
