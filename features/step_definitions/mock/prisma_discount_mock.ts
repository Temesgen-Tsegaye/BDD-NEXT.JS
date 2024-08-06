type FF =
  | { model: "agent"; where: { id: string } }
  | { model: "commission"; where: { agentId: string } }


class PrismaDiscountMock {
  private agents;
  private commissions;

  constructor(
    private agentId: string,
    private plan: string,
    private commissionPercentage: number,
  ) {
    this.agents = [
      {
        id: this.agentId,
        phoneNumber: "1234567890",
        promoCode: "promo1",
        commission: 20,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

  
    this.commissions = [
      { id: "1", [this.plan]: this.commissionPercentage, agentId: "1" },
    ];
  }
 
  agent = {
    findUnique: async (params: { where: { id: string } }) =>
      this._findUnique({ model: "agent", ...params }),
  };

  commission = {
    findUnique: async (params: { where: { agentId: string } }) =>
      this._findUnique({ model: "commission", ...params }),
  };

 

  async _findUnique(param: FF) {
    const { where, model } = param;
    switch (model) {
      case "agent":
        return this.agents.find((agent) => agent.id === where.id);
      case "commission":
        return this.commissions.find(
          (commission) => commission.agentId === where.agentId
        );
     default:
        return null;
    }
  }
}
export { PrismaDiscountMock };

