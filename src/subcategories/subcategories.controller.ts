import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { SubcategoriesService } from './subcategories.service';
import { CreateSubcategoryDto } from './dto/create-subcategory.dto';
import { UpdateSubcategoryDto } from './dto/update-subcategory.dto';

@Controller('subcategories')
export class SubcategoriesController {
  constructor(private readonly subcategoriesService: SubcategoriesService) {}

  @Post()
  create(@Body() createSubcategoryDto: CreateSubcategoryDto) {
    return this.subcategoriesService.create(createSubcategoryDto);
  }

  // @Get()
  // findAll() {
  //   return this.subcategoriesService.findAll();
  // }

  @Get()
  findAll(@Query('categoryId') categoryId?: string) {
    if (categoryId) {
      return this.subcategoriesService.findByCategory(categoryId);
    }
    return this.subcategoriesService.findAll();
  }

  // @Get(':categoryId')
  // findOne(@Param('categoryId') categoryId: string) {
  //   return this.subcategoriesService.findOne(categoryId);
  // }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSubcategoryDto: UpdateSubcategoryDto) {
    return this.subcategoriesService.update(id, updateSubcategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.subcategoriesService.remove(id);
  }
}
