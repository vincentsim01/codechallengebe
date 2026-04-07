import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoriesModule } from './categories/categories.module';
import { SubcategoriesModule } from './subcategories/subcategories.module';
import { BrandsModule } from './brands/brands.module';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [CategoriesModule, SubcategoriesModule, BrandsModule, ProductsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
