
import { PrismaClient } from "@prisma/client";
import axios from "axios";
import container from "../DI/di";

async function createDiscount(agetID:string,discount_percentage:number,plan:"weekly"|"monthly"|"yearly") {
const prisma=container.resolve<PrismaClient>('db')
    const agent=await prisma.agent.findUnique({where:{id:agetID}})
    const commission=await prisma.commission.findUnique({where:{agentId:agetID}})
 
         console.log(agent, 'agent12');
    console.log(commission, 'commission12');
    if(!agent){ 
        throw new Error('agent not found')
    }
    if(commission![plan]<discount_percentage){
        throw new Error('discount can\'t excced commision percentage')
    }
     
    try {
        await axios.post('https://paymentgateway/api/discount', {
            agentId:agetID,
            discountPercentage:discount_percentage
          });
    } catch (error:unknown) {

        if(error instanceof Error){
            return error.message
        }
        return error
    }
    
    return 'success'
}

export { createDiscount };

