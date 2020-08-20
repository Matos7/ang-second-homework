import { Product } from './../../core/models/product';
import { DataService } from './../../core/services/data.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  public product: Product;

  constructor(
    private activatedRoute: ActivatedRoute,
    private dataService: DataService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({id}) => {
      this.dataService.getproductsFromDB().subscribe(({ data }) => {
        this.product = data.find(item => item.id === +id);
        if(!this.product){
          this.router.navigateByUrl('/not-found');
        }
      });
    });

    this.activatedRoute.queryParams.subscribe((queryParams)=>{
      console.log("queryParams",queryParams);
    })
  }
}