import { Component } from '@angular/core';
import { ProductService } from '../../../product.service';
import { UserService } from '../../../user.service';
import { Router } from '@angular/router';
import { LocalDataSource } from 'ng2-smart-table';

@Component({
  selector: 'ngx-smart-table',
  templateUrl: './smart-table.component.html',
  styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }
  `],
})
export class SmartTableComponent {

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
      confirmSave : true
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
        editable: false

      },
      updatedAt: {
        title: 'Last Updated At',
        type: 'date',
        editable: false
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

  source: LocalDataSource;

  constructor(private productService: ProductService,
              private userService: UserService,
              private router: Router,) {
    this.source = new LocalDataSource();
    this.getProducts();
  }

  canAdd(): boolean {
    var user = this.userService.getUser();
    if(user === null)
      return false;
    else
      return user.userType === 'admin' || user.userType === 'manager';
  }
  canEdit(): boolean {
    var user = this.userService.getUser();
    if(user === null)
      return false;
    else
      return user.userType === 'admin' || user.userType === 'manager';
  }
  canDelete(): boolean {
    var user = this.userService.getUser();
    if(user === null)
      return false;
    else
      return user.userType === 'admin';
  }

  message(): String {
    return 'No Products in the Data Base sold by Ahmed Darwish.';
  }

  getProducts() {
    var self = this;
    this.productService.getProducts().subscribe(function (res) {
      if (res.msg === 'Products retrieved successfully.'){
        var Prods: any[] = res.data;
        var mine: any[] = [];
        for(var i = 0; i < Prods.length; i++){
          Prods[i].createdAt = new Date(Prods[i].createdAt);
          Prods[i].updatedAt = new Date(Prods[i].updatedAt);
          if(Prods[i].sellerName === 'Ahmed Darwish')
            mine.push(Prods[i]);
        }
        self.source.load(mine);
      }
    });
  }

  onCreateConfirm(event): void {
    event.newData.createdAt = new Date();
  
    event.newData.updatedAt = new Date()

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
        if(newProd.sellerName === 'Ahmed Darwish')  
          event.confirm.resolve(newProd);
        alert('Product Added!');
      }
    },
      function (error) {
        alert("ID already used");
      });
  }


  onEditConfirm(event):void{
    var prodToEdit = {
      id: event.newData.id,
      name: event.newData.name,
      price: event.newData.price,
      createdAt: event.data.createdAt,
      updatedAt: new Date(),
      sellerName: event.newData.sellerName,
      stock: event.newData.stock,
      _id: event.data._id
    };

    var self = this;
    this.productService.editProduct(prodToEdit).subscribe(function (res) {
      if (res.msg === 'Product was updated successfully.') {
        if(prodToEdit.sellerName === 'Ahmed Darwish')  
          event.confirm.resolve(res.data);
        else
          self.source.remove(event.data);
        alert('Product Edited!');
      }
    });
  }

  onDeleteConfirm(event): void {
    var self = this;
    this.productService.deleteProduct(event.data._id).subscribe(function (res) {
      if(res.msg === 'Product was deleted successfully.'){
        console.log(res.data);
        event.confirm.resolve();
        alert('Product deleted!');
      }
    }, function (err) {
      alert("Error");
    });
  }
}
