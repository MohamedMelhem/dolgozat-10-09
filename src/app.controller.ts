import { Body, Controller, Get, Post, Query, Render } from '@nestjs/common';
import { Product } from './Product.interface.js';
import { CreateProductViewDto } from './create-Product.view.dto.js';

@Controller()
export class AppController {
  private readonly products: Product[] = [
    {
      name: 'Vezeték nélküli egér',
      category: 'elektronika',
      price: 8990,
      stock: 12,
    },
    {
      name: 'Programozás kezdőknek',
      category: 'könyv',
      price: 6490,
      stock: 4,
    },
    {
      name: 'Mechanikus billentyűzet',
      category: 'elektronika',
      price: 24990,
      stock: 3,
    },
    {
      name: 'Fekete kapucnis pulóver',
      category: 'ruházat',
      price: 12990,
      stock: 8,
    },
    {
      name: 'Catan társasjáték',
      category: 'játék',
      price: 11990,
      stock: 0,
    },
    {
      name: 'USB-C töltőkábel',
      category: 'elektronika',
      price: 4990,
      stock: 25,
    },
    {
      name: 'Adidas sportcipő',
      category: 'ruházat',
      price: 27990,
      stock: 2,
    },
    {
      name: 'A kis herceg',
      category: 'könyv',
      price: 3990,
      stock: 15,
    },
    {
      name: 'LEGO City rendőrségi állomás',
      category: 'játék',
      price: 34990,
      stock: 5,
    },
    {
      name: 'Bluetooth hangszóró',
      category: 'elektronika',
      price: 15990,
      stock: 7,
    },
  ];

  private getCategories(): string[] {
    const categories = new Set<string>();
    for (const product of this.products) {
      categories.add(product.category);
    }
    return Array.from(categories);
  }

  private sortByPrice(products: Product[]): Product[] {
   return products.sort((a, b) => a.price - b.price);
  }

  @Get()
  @Render('index')
  getProducts() {
    return {
      title: 'Termékek ár szerint növekvő sorrendben',
      products: this.sortByPrice(this.products),
    };
  }

  @Get('filter')
  @Render('filter')
  getFilteredProducts(@Query('category') category?: string) {
    const products = category
      ? this.products.filter((product) => product.category === category)
      : this.products;

    return {
      categories: this.getCategories(),
      selectedCategory: category ?? '',
      products: this.sortByPrice(products),
    };
  }

  @Get('new')
  @Render('new')
  getNewProductForm() {
    return {
      success: false,
      error: null,
      formData: { name: '', category: '', price: '', stock: '' },
    };
  }

  @Post('new')
  @Render('new')
  createProduct(@Body() dto: CreateProductViewDto) {
    const name = typeof dto?.name === 'string' ? dto.name.trim() : '';
    const category =
      typeof dto?.category === 'string' ? dto.category.trim() : '';
    const rPrice = dto?.price;
    const rStock = dto?.stock;
    const price = Number(rPrice);
    const stock = Number(rStock);
    const formData = {
      name,
      category,
      price: typeof rPrice === 'string' ? rPrice : '',
      stock: typeof rStock === 'string' ? rStock : '',
    };


    if (!Number.isFinite(price) || price < 0) {
      return {
        success: false,
      };
    }

    this.products.push({ name, category, price, stock });

    return {
      success: true,
      error: null,
      formData: { name: '', category: '', price: '', stock: '' },
    };
  }
}
