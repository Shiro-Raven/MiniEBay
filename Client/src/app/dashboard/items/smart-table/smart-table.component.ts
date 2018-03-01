import { Component } from '@angular/core';
import { ProductService } from '../../../product.service';
import { UserService } from '../../../user.service';

@Component({
  selector: 'ngx-smart-table',
  templateUrl: './smart-table.component.html',
  styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }
  `],
})
export class SmartTableComponent{

  settings = {
    noDataMessage: this.message(),
    actions: {
      add: this.canAdd(),
      edit: this.canEdit(),
      delete: this.canDelete()
    },
    add: {
      addButtonContent: '<i class="nb-plus" ></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmCreate: true
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      id: {
        title: 'ID',
        type: 'number',
        editable: false
      },
      name: {
        title: 'Product Name',
        type: 'string',
      },
      price: {
        title: 'Price',
        type: 'number'
      },
      createdAt: {
        title: 'Created At',
        type: 'date',

      },
      updatedAt: {
        title: 'Last Updated At',
        type: 'date',
      },
      sellerName: {
        title: 'Seller Name',
        type: 'string',
      },
      stock: {
        title: 'Amount in stock',
        type: 'number'
      }
    },
  };

  source: Array<any>;

  constructor(private productService: ProductService,
    private userService: UserService) {
      this.getProducts();
  }

  canAdd(): boolean {
    return true;
  }
  canEdit(): boolean {
    return true;
  }
  canDelete(): boolean {
    return true;
  }

  message() : String{
    return 'No Products in the Data Base ';
  }

  getProducts(){
    var self = this;
    this.productService.getProducts().subscribe(function(res){
      if(res.msg === 'Products retrieved successfully.')
        self.source = res.data;
    });
  }

  // Service will be used here
  onCreateConfirm(event): void {
    if(event.newData.createdAt !== null){}
    else{
      event.newData.createdAt = new Date();
    }

    if(event.newData.updatedAt !== null){}
    else{
      event.newData.updatedAt = new Date()
    }

    var newProd = {
      id: event.newData.id,
      name: event.newData.name,
      price: event.newData.price,
      createdAt: event.newData.createdAt,
      updatedAt: event.newData.updatedAt,
      sellerName: event.newData.sellerName,
      stock: event.newData.stock
    };

    var self = this;
    this.productService.addProduct(newProd).subscribe(function (res) {
      if (res.msg === 'Product was created successfully.') {
        event.confirm.resolve();
        alert('Product Added!');
      }
    },
      function (error) {
        alert("ID already used");
      });
  }


  onDeleteConfirm(event): void {
    // This will be edited to deleted from 
    event.confirm.resolve();
    alert('Product Deleted');
  }
}
