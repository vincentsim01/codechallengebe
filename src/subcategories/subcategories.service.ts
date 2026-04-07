import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSubcategoryDto } from './dto/create-subcategory.dto';
import { UpdateSubcategoryDto } from './dto/update-subcategory.dto';

@Injectable()
export class SubcategoriesService {
  private data = {
    subcategories: [
      { "id": "S1", "categoryId": "C1", "name": "Laptop" },
      { "id": "S2", "categoryId": "C1", "name": "Smartphone" },
      { "id": "S3", "categoryId": "C2", "name": "Men's Tops" },
      { "id": "S4", "categoryId": "C2", "name": "Footwear" },
    ],
  };
  create(createSubcategoryDto: CreateSubcategoryDto) {
    const exists = this.data.subcategories.find(c => c.id === createSubcategoryDto.id);
    if (exists) {
      throw new Error(`Subcategory with id ${createSubcategoryDto.id} already exists`);
    }

    this.data.subcategories.push(createSubcategoryDto);
    return createSubcategoryDto;
  }

  findAll() {
    return this.data.subcategories;
  }

  findOne(id: string) {
    const subcategory = this.data.subcategories.find(s => s.id === id);
    if (!subcategory) {
      throw new NotFoundException(`Subcategory ${id} not found`);
    }
    return subcategory;
  }

  update(id: string, updateSubcategoryDto: UpdateSubcategoryDto) {
    const index = this.data.subcategories.findIndex(c => c.id === id);
    if (index === -1) {
      throw new NotFoundException(`Category ${id} not found`);
    }

    this.data.subcategories[index] = {
      ...this.data.subcategories[index],
      ...updateSubcategoryDto,
    };

    return this.data.subcategories[index];
  }

  remove(id: string) {
    const index = this.data.subcategories.findIndex(c => c.id === id);
    if (index === -1) {
      throw new NotFoundException(`Subcategory ${id} not found`);
    }

    const removed = this.data.subcategories.splice(index, 1);
    return removed[0];
  }
}
