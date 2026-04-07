import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';

@Injectable()
export class BrandsService {
  private data = {
    "brands": [
      { "id": "B1", "subCategoryId": "S1", "name": "Asus" },
      { "id": "B2", "subCategoryId": "S1", "name": "Apple" },
      { "id": "B3", "subCategoryId": "S2", "name": "Samsung" },
      { "id": "B4", "subCategoryId": "S2", "name": "Xiaomi" },
      { "id": "B5", "subCategoryId": "S3", "name": "Erigo" },
      { "id": "B6", "subCategoryId": "S3", "name": "Uniqlo" },
      { "id": "B7", "subCategoryId": "S4", "name": "Nike" },
      { "id": "B8", "subCategoryId": "S4", "name": "Adidas" }
    ],
  };
  create(createBrandDto: CreateBrandDto) {
    const exist = this.data.brands.find(c => c.id === createBrandDto.id);
    if(exist){
      throw new Error(`Brand with id ${createBrandDto.id} already exists`);
    }
    this.data.brands.push(createBrandDto);
    return createBrandDto;
  }

  findAll() {
    return this.data.brands;
  }

  findBySubcategory(subCategoryId: string) {
    return this.data.brands.filter(
      s => s.subCategoryId === subCategoryId
    );
  }

  findOne(subCategoryId: string) {
    const brand = this.data.brands.find(c => c.subCategoryId === subCategoryId);
    if(!brand){
      throw new NotFoundException(`Brand for subcategory ${subCategoryId} not found`);
    }
    return brand;
  }

  update(id: string, updateBrandDto: UpdateBrandDto) {
    const index = this.data.brands.findIndex(c => c.id === id);
    if (index === -1) {
      throw new NotFoundException(`Brand ${id} not found`);
    }

    this.data.brands[index] = {
      ...this.data.brands[index],
      ...updateBrandDto,
    };

    return this.data.brands[index];
  }

  remove(id: string) {
    const index = this.data.brands.findIndex(c => c.id === id);
    if (index === -1) {
      throw new NotFoundException(`Brand ${id} not found`);
    }

    const removed = this.data.brands.splice(index, 1);
    return removed[0];
  }
}
