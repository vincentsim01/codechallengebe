import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { BrandsService } from './brands.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';

@Controller('brands')
export class BrandsController {
  constructor(private readonly brandsService: BrandsService) {}

  @Post()
  create(@Body() createBrandDto: CreateBrandDto) {
    return this.brandsService.create(createBrandDto);
  }

  @Get()
  findAll(@Query('subCategoryId') subCategoryId?: string) {
    if (subCategoryId) {
      return this.brandsService.findBySubcategory(subCategoryId);
    }
    return this.brandsService.findAll();
  }

  @Get(':subCategoryId')
  findOne(@Param('subCategoryId') subCategoryId: string) {
    return this.brandsService.findOne(subCategoryId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBrandDto: UpdateBrandDto) {
    return this.brandsService.update(id, updateBrandDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.brandsService.remove(id);
  }
}
