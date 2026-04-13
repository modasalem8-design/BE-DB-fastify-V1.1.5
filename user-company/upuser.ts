import  type  { FastifyInstance } from "fastify";
import fastify from "fastify";
import "@fastify/postgres";
export default async function (up:FastifyInstance) {
up.get('/update',async(request,response)=>{
    return ({"message":"good in update"})
    
})}
// export const up=fastify({
//     logger:true
// })
