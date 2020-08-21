export class Product {
  public id: number;
  public title: string;
  public description: string;
  public category: string;
  public price: number;
  public imageUrl: string;

  constructor(
    id: number,
    title: string,
    description: string,
    category: string,
    price: number,
    imageUrl: string
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.category = category;
    this.price = price;
    this.imageUrl = imageUrl;
  }
}
