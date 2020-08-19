export class User {
  public id: number;
  public name: string;
  public surname: string;
  public email: string;
  public password: string;
  public city: string;
  public phone: number;

  constructor(
    id: number,
    name: string,
    surname: string,
    email: string,
    password: string,
    city: string,
    phone: number,
  ) {
    this.id = id;
    this.name = name;
    this.surname = surname;
    this.email = email;
    this.password = password;
    this.city = city;
    this.phone = phone;
  }
}
