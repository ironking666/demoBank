import { faker } from "@faker-js/faker";

export const addressData = {
  street: faker.address.street(),
  zipCode: faker.address.zipCode(),
  city: faker.address.city(),
  email: faker.internet.email(),
};
