type FF =
  | { model: "agent"; where: { promoCode: string } }
  | { model: "commission"; where: { agentId: string } }
  | { model: "subscription"; where: { name: string } }
  | { model: "discount"; where: { agentId: string } };

class PrismaMock {
  private agents;
  private commissions;
  private subscriptions;
  private discounts;
  constructor(
    private promoCode: string,
    private plan: string,
    private commissionPercentage: number,
    private discountPercentage: number,
    private price: number
  ) {
    this.agents = [
      {
        id: "1",
        phoneNumber: "1234567890",
        promoCode: this.promoCode,
        commission: 20,
        commissionPercentage: this.commissionPercentage,
        discountPercentage: this.discountPercentage,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

  
    this.commissions = [
      { id: "1", [this.plan]: this.commissionPercentage, agentId: "1" },
    ];

    this.discounts = [{ id: "1", [this.plan]: this.discountPercentage, agentId: "1" }];
    this.subscriptions = [{ id: "1", name: this.plan, price: this.price }];

  }
 
  agent = {
    findUnique: async (params: { where: { promoCode: string } }) =>
      this._findUnique({ model: "agent", ...params }),
  };

  commission = {
    findUnique: async (params: { where: { agentId: string } }) =>
      this._findUnique({ model: "commission", ...params }),
  };

  subscription = {
    findUnique: async (params: { where: { name: string } }) =>
      this._findUnique({ model: "subscription", ...params }),
  };
  discount={
    findUnique: async (params: { where: { agentId: string } }) =>
      this._findUnique({ model: "discount", ...params }),
  }

  async _findUnique(param: FF) {
    const { where, model } = param;
    switch (model) {
      case "agent":
        return this.agents.find((agent) => agent.promoCode === where.promoCode);
      case "commission":
        return this.commissions.find(
          (commission) => commission.agentId === where.agentId
        );
      case "subscription":
        return this.subscriptions.find(
          (subscription) => subscription.name === where.name
        );
      case "discount":
        return this.discounts.find(
          (discount) => discount.agentId === where.agentId
        );
      default:
        return null;
    }
  }
}
export { PrismaMock };

