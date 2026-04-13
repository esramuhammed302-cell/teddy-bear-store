import { Injectable } from '@angular/core';
import { IProduct } from '../Models/Iproduct';
import { ICategory } from '../Models/Icategory';
@Injectable({ providedIn: 'root' })
export class ProductsService {
  private productList: IProduct[] = [
    {
      ID: 1,
      Name: 'BirthDay Cake',
      Quantity: 5,
      Price: 1000,
      Img: 'https://sugarandsparrow.s3.us-west-2.amazonaws.com/flour/wp-content/uploads/2022/02/16214527/Best-Vanilla-Cake-Recipe-6.jpeg',
      CategoryID: 2,
    },
    {
      ID: 2,
      Name: 'Bear Cake',
      Quantity: 2,
      Price: 500,
      Img: 'https://www.bettycrocker.co.uk/wp-content/uploads/2023/11/polar-bear-cake-mobile-1.png',
      CategoryID: 1,
    },
    {
      ID: 3,
      Name: 'Strawberry Cake',
      Quantity: 1,
      Price: 200,
      Img: 'https://www.piesandtacos.com/wp-content/uploads/2024/05/Strawberry-Cake-6-scaled.jpg',
      CategoryID: 2,
    },
    {
      ID: 4,
      Name: 'Chocolate Cake',
      Quantity: 3,
      Price: 300,
      Img: 'https://www.cakegallery.ae/image/cache/catalog/0category/Real%20chocolate/realchocolatecake-500x500.png.webp',
      CategoryID: 1,
    },
    {
      ID: 5,
      Name: 'Strawberry-Krispy Chocolate',
      Quantity: 4,
      Price: 400,
      Img: 'https://www.salesucre.com/_next/image?url=https%3A%2F%2Fbackend.salesucre.com%2Fstorage%2Fmedia%2Fc73bc383-ecd5-40c9-b29f-ceaaf802c57e.jpeg&w=1920&q=75',
      CategoryID: 2,
    },
    {
      ID: 6,
      Name: 'Kinder Molten Cake',
      Quantity: 6,
      Price: 600,
      Img: 'https://www.salesucre.com/_next/image?url=https%3A%2F%2Fbackend.salesucre.com%2Fstorage%2Fmedia%2F91203-1.webp&w=1920&q=75',
      CategoryID: 1,
    },
    {
      ID: 7,
      Name: 'Praliné Surprise',
      Quantity: 0,
      Price: 700,
      Img: 'https://www.salesucre.com/_next/image?url=https%3A%2F%2Fbackend.salesucre.com%2Fstorage%2Fmedia%2F70c25939-bff0-4e02-b9a3-c92b12ef44b3.jpeg&w=1920&q=75',
      CategoryID: 1,
    },
    {
      ID: 8,
      Name: 'Charlotte aux Fraises',
      Quantity: 2,
      Price: 800,
      Img: 'https://www.salesucre.com/_next/image?url=https%3A%2F%2Fbackend.salesucre.com%2Fstorage%2Fmedia%2F91317-1.webp&w=1920&q=75',
      CategoryID: 2,
    },
  ];
   categories: ICategory[] = [
    { ID: 1, Name: 'Chocolate' },
    { ID: 2, Name: 'Strawberry' },
  ];


  getAllProducts(): IProduct[] {
    return this.productList;
  }
  getAllCategories(): ICategory[] {
  return this.categories;
}

  getProductByID(id: number): IProduct | undefined {
    return this.productList.find((p) => p.ID === id);
  }
  buy(product: IProduct) {
    if (product.Quantity > 0) product.Quantity--;
  }

  searchProducts(keyword: string): IProduct[] {
    return this.productList.filter((p) => p.Name.toLowerCase().includes(keyword.toLowerCase()));
  }
}










