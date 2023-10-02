import { faker } from "@faker-js/faker";

export const paymentData = {
  transferReceiver: faker.name.fullName(),
  accountNumber: faker.finance.accountNumber("XX-XXXX-XXXX-XXXX-XXXX"),
  transferAmount: faker.finance.amount(100, 2000, 0),
  transferTitle: faker.lorem.sentence(),
  topUpReceiver: "503 xxx xxx",
  topUpAmount: "40",
};
