import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  private data = {
    "products":[
      { "id": "P1", "brandId": "B1", "name": "Asus ROG Zephyrus", "price": 25000000 },
      { "id": "P2", "brandId": "B2", "name": "MacBook Pro M3", "price": 30000000 },
      { "id": "P3", "brandId": "B3", "name": "Samsung Galaxy S24", "price": 15000000 },
      { "id": "P4", "brandId": "B4", "name": "Xiaomi 14 Pro", "price": 12000000 },
      { "id": "P5", "brandId": "B5", "name": "Erigo T-Shirt Black", "price": 150000 },
      { "id": "P6", "brandId": "B6", "name": "Uniqlo Flannel Shirt", "price": 399000 },
      { "id": "P7", "brandId": "B7", "name": "Nike Air Force 1", "price": 1500000 },
      { "id": "P8", "brandId": "B8", "name": "Adidas Ultraboost", "price": 2800000 }
    ]
  }
  create(createProductDto: CreateProductDto) {
    const exists = this.data.products.find(c => c.id === createProductDto.id);
    if (exists) {
      throw new Error(`Product with id ${createProductDto.id} already exists`);
    }
    this.data.products.push(createProductDto);
    return createProductDto;
  }

  findAll() {
    return this.data.products;
  }

  findProducts(brandId: string) {
    return this.data.products.filter(
      s => s.brandId === brandId
    );
  }

  findOne(brandId: string) {
    const product = this.data.products.find(c => c.brandId === brandId);
    if (!product) {
      throw new Error(`Product for brand ${brandId} not found`);
    }
    return product;
  }

  update(id: string, updateProductDto: UpdateProductDto) {
    const index = this.data.products.findIndex(c => c.id === id);
    if (index === -1) {
      throw new Error(`Product with id ${id} not found`);
    }

    this.data.products[index] = {
      ...this.data.products[index],
      ...updateProductDto,
    };

    return this.data.products[index];
  }

  remove(id: string) {
    const index = this.data.products.findIndex(c => c.id === id);
    if (index === -1) {
      throw new Error(`Product with id ${id} not found`);
    }
    const removed = this.data.products.splice(index, 1);
    return removed[0];
  }
}
