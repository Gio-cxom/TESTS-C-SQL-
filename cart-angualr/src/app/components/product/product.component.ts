import { Component,OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
  public productList : any;
  public filterCategory:any;
  searchKey:string="";

  constructor(private api :ApiService, private cartService:CartService){}

  ngOnInit(): void{
    this.api.getProduct()
    .subscribe(res=>{
      this.productList = res;
      this.filterCategory=res;
      this.productList.forEach((a:any) => {
        if(a.category==="women's clothing" || a.category === "men's clothing"){
          a.category="shorts"
        }
        Object.assign(a,{quantity:1, total:a.price});
        console.log(a)
      });
    })
    this.cartService.search.subscribe((val:any)=>{
      this.searchKey = val;
    })
  }
  addtocart(item:any){
    this.cartService.addtoCart(item);
  }
  
  filter(category:string){
    this.filterCategory = this.productList
    .filter((a:any)=>{
      if(a.category == category || category==""){
        return a;
      }
    })
  }
}
