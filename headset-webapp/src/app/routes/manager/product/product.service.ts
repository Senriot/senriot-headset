import {Injectable} from '@angular/core';
import {BaseService} from "@shared/service/base.service";
import {Store} from "@shared/model/store-dto";
import {Product} from "@shared/model/product.model";

@Injectable({
    providedIn: 'root',
})
export class ProductService extends BaseService<Product> {
    resourceUrl = "api/products"
}
