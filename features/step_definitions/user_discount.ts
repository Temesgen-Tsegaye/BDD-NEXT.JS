import { After, Before, Given, Then, When } from "@cucumber/cucumber";
import { PrismaClient } from "@prisma/client";
import assert from "assert";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import container, { CreateDiscount } from "../../src/DI/di";
import { PrismaDiscountMock } from "../step_definitions/mock/prisma_discount_mock";
//use this.prom to make moke responce based on promocode using mwjs

///
Before(async function () {
   //


   

this.server = setupServer(
    http.post('https://paymentgateway/api/discount', () => {

        if(this.paymentGatewayStatus == 'success'){
            return HttpResponse.json({
                id: '12',
                message: 'Created',
                status: 'success'
              })
        } else  {
            return HttpResponse.json({
                
                status: 'fail'
              })
        } 

    }
)
    
  )
   
  // Start the interception.
  this.server.listen()





   //
  const originalDb = container.resolve<PrismaClient>("db");
 

  this.originalDB = originalDb;
});

Given(
  "agent can create discoutnt for users",
  function () {
    return;
  }
);

When(
  "agent with  {string},{string} and {string} trys to create discount with amount of  {string} and {string} plan",
 function (agentID:string,promoCode: string, commissionPercentage: number,discountPercentage:number,plan:string) {
    this.agentID = agentID;
    this.promoCode = promoCode;
    this.commissionPercentage = commissionPercentage;
    this.discountPercentage = discountPercentage;
    this.plan = plan;
  }
);
When('payment gatway status {string}', async  function (gateway_status: string) {
  this.payment_gateway_status = gateway_status;
  container.register<PrismaDiscountMock>("db",{
    useFactory: () =>
      new PrismaDiscountMock (
        this.agentID,
        this.plan,
        this.commissionPercentage,
      )
  

  })
  const discountValidator = container.resolve<CreateDiscount>("Discount");
    try{
     let val=await discountValidator(this.agentID,this.discountPercentage,this.plan)
     this.result=val

    }catch(e:unknown){
        if(e instanceof Error){
          this.result=e.message
        }
    }
 




});
Then(
  "The expected message should be   {string}",
  function (exprected_message: string) {
    console.log(this.result,'rererererAAAA')
    assert.equal(this.result, exprected_message);
  }
);
After(async function () {
  container.register<PrismaClient>("db", {
    useFactory: () => this.originalDB,
  });
   this.server.close()
});


