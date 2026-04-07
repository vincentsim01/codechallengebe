import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  private data = {
    categories: [
      { id: 'C1', name: 'Electronics' },
      { id: 'C2', name: 'Apparel' },
    ],
  };
  create(createCategoryDto: CreateCategoryDto) {
    // Optional: check duplicate id
    const exists = this.data.categories.find(c => c.id === createCategoryDto.id);
    if (exists) {
      throw new Error(`Category with id ${createCategoryDto.id} already exists`);
    }

    this.data.categories.push(createCategoryDto);
    return createCategoryDto;
  }

  findAll() {
    return this.data.categories;
  }

  findOne(id: string) {
    const category = this.data.categories.find(c => c.id === id);
    if (!category) {
      throw new NotFoundException(`Category ${id} not found`);
    }
    return category;
  }

  update(id: string, updateCategoryDto: UpdateCategoryDto) {
    const index = this.data.categories.findIndex(c => c.id === id);
    if (index === -1) {
      throw new NotFoundException(`Category ${id} not found`);
    }

    this.data.categories[index] = {
      ...this.data.categories[index],
      ...updateCategoryDto,
    };

    return this.data.categories[index];
  }

  remove(id: string) {
    const index = this.data.categories.findIndex(c => c.id === id);
    if (index === -1) {
      throw new NotFoundException(`Category ${id} not found`);
    }

    const removed = this.data.categories.splice(index, 1);
    return removed[0];
  }
}
