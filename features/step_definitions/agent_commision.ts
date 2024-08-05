import { After, Before, Given, Then, When } from "@cucumber/cucumber";
import { PrismaClient } from "@prisma/client";
import assert from "assert";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import container, { Subscribe } from "../../src/DI/di";
import { PrismaMock } from "./mock/prisma_mock";
//use this.prom to make moke responce based on promocode using mwjs

///
Before(async function () {
  const server = setupServer(
    http.get("/user", () => {
      return HttpResponse.json({
        id: "15d42a4d-1948-4de4-ba78-b8a893feaf45",
        firstName: "John",
      });
    })
  );
  const originalDb = container.resolve<PrismaClient>("db");
 

  this.originalDB = originalDb;
});

Given(
  "User successfully completed subscription on the payment gateway",
  function () {
    return;
  }
);

When(
  "the {string} and  {string} returned",
  function (promoCode: string, plan: string) {
    this.promoCode = promoCode;
    this.plan = plan;
  }
);
When('discount percentage is {string}', function (discount_percentage: string) {
  this.discount_percentage = discount_percentage;
});
When("Price is  {string}", function (price:string) {
  this.price = price;
});
When(
  "commission percentage is {string}",
  async function (commission_percentage: string) {
    this.commission_percentae = commission_percentage;
    console.log(this.commission_percentae, 'comm22');
    container.register<PrismaMock>("db", {
      useFactory: () =>
        new PrismaMock(
          this.promoCode,
          this.plan,
          this.commission_percentae,
          this.discount_percentage,
          this.price
        ),
    });

    //OVER RIIDE db HERE
    const agentCommission = container.resolve<Subscribe>("Subscribe");

    this.result = await agentCommission(this.promoCode, this.plan);
    console.log(this.result,'rere');
  }
);

Then(
  "expected agent commission must be  {string}",
  function (agent_commission: string) {
    assert.equal(this.result, agent_commission);
  }
);
After(async function () {
  container.register<PrismaClient>("db", {
    useFactory: () => this.originalDB,
  });
});
// When("the user tries to subscribe", function () {
//   const sign = container.resolve<Subscribe>("Subscribe");
//   const prisma = container.resolve<PrismaClient>("db");

//   prisma.user.findUnique = () => {
//     return this.userId;
//   };

//   type FindUniqueSubscriptionArgs = Parameters<
//     PrismaClient["subscription"]["findUnique"]
//   >;
//   type FindUniqueSubscriptionReturnType = ReturnType<
//     PrismaClient["subscription"]["findUnique"]
//   >;

//   prisma.subscription.findUnique = function (
//     args: Prisma.SubscriptionFindUniqueArgs
//   ) {
//     const plan = [
//       { id: "1", name: "YEARLY", price: 900 },
//       { id: "2", name: "MONTHLY", price: 500 },
//       { id: "3", name: "WEEKLY", price: 100 },
//     ];
//     const value = plan.find((item) => item.name === this.plan)!;
//     return value;
//   };

//   prisma.agent.findUnique = (args) => {
//     const agent = [
//       { promoCode: "PROMO1", discountPercentage: 0.05, commission: 0.1 },
//     ];
//     return agent.find((item) => item.promoCode === this.promoCode);
//   };
//   const subscribe = container.resolve<Subscribe>("Subscribe");

//   this.result = subscribe(this.userId, this.promoCode, this.plan);
// });

// Then(
//   "the purchase should be processed successfully with expected discount {string}",
//   function (discount) {
//     assert.equal(this.result.discount, discount);
//   }
// );

// Then(
//   "the purchase should be processed successfully with expected commission {expected_commission}",
//   function (commision) {
//     assert.equal(this.result.commission, commision);
//   }
// );
// After(async function () {
//   container.register<PrismaClient>("db", {
//     useFactory: () => this.originalDB,
//   });
// });

// // import { Given, When, Then } from '@cucumber/cucumber';
// // import { expect } from 'chai';
// // import { container } from 'tsyringe';
// // import { PrismaClient } from '@prisma/client';
// // import { MockPaymentService } from './mocks/paymentServiceMock';

// // // Register Prisma Client and PaymentService mocks
// // const prisma = container.resolve<PrismaClient>('PrismaClient');
// // const paymentService = container.resolve<MockPaymentService>('PaymentService');

// // Given('the user with id {int} exists', async function (userId) {
// //   prisma.user.findUnique.mockResolvedValue({ id: userId, wallet: 1000 }); // Mock user with sufficient funds
// //   this.currentUser = await prisma.user.findUnique({ where: { id: userId } });
// //   expect(this.currentUser).to.exist;
// // });

// // Given('the promo code is {string}', function (promoCode) {
// //   this.currentPromoCode = promoCode;
// //   const promo = promoCodes[promoCode] || { discount: 0 };
// //   this.currentPromo = promo;
// // });

// // When('the user subscribes using promo code {string}', async function (promoCode) {
// //   const user = this.currentUser;
// //   const promo = this.currentPromo;

// //   // Mock the pricing based on subscription type
// //   let subscriptionPrice = 0;
// //   switch (this.subscriptionType) {
// //     case 'WEEKLY':
// //       subscriptionPrice = 100;
// //       break;
// //     case 'MONTHLY':
// //       subscriptionPrice = 500;
// //       break;
// //     case 'YEARLY':
// //       subscriptionPrice = 900;
// //       break;
// //   }

// //   let finalPrice = subscriptionPrice;
// //   if (promo && promo.discount) {
// //     finalPrice -= (subscriptionPrice * promo.discount) / 100;
// //   }

// //   try {
// //     await paymentService.processPayment(user.id, finalPrice);
// //     user.wallet -= finalPrice;
// //     await prisma.purchase.create({ data: { userId: user.id, amount: finalPrice } });
// //     this.paymentResult = 'success';
// //   } catch (error) {
// //     this.paymentResult = 'failed';
// //     this.errorMessage = error;
// //   }
// // });

// // Then('the purchase should be processed successfully', function () {
// //   expect(this.paymentResult).to.equal('success');
// // });

// // Then('the agent\'s wallet should be updated based on the final price', async function () {
// //   // Check if the agent's wallet was updated correctly
// //   const agentWallet = await prisma.agent.findUnique({ where: { id: 1 } }); // Assume agent ID is 1
// //   expect(agentWallet.balance).to.be.greaterThan(0); // Implement your logic here
// // });

// // Then('the purchase should fail with error {string}', function (errorMessage) {
// //   expect(this.paymentResult).to.equal('failed');
// //   expect(this.errorMessage).to.equal(errorMessage);
// // });

// // Then('the agent\'s wallet should not be updated', async function () {
// //   // Ensure the agent's wallet has not been updated
// //   const agentWallet = await prisma.agent.findUnique({ where: { id: 1 } }); // Assume agent ID is 1
// //   expect(agentWallet.balance).to.equal(1000); // Implement your logic here
// // });
