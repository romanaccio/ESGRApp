export class Vehicle {
  constructor(public color: string) {}
}

export class Car extends Vehicle {
  constructor(public wheels: number, color: string) {
    super(color);
  }
}
