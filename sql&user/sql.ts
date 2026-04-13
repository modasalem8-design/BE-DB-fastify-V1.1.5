import fastify from "fastify";
import "dotenv/config"
import fp from "fastify-plugin"
import type { FastifyInstance } from "fastify";
import fastifyPostgres from "@fastify/postgres";
import { register } from "node:module";
//معغير postgres,neonالمشترك 
export const dev: any = process.env.DEV
//الاتصال بي db web
export async function name(con: FastifyInstance) {
    try {
        //neon لم اجي ارفع 
        if (dev == "web") {
            console.log("connect in neno")
            await con.register(fastifyPostgres, {
                connectionString: process.env.DB,
                ssl: {
                    rejectUnauthorized: false
                }
            },

            )
        }
        //محلي
        if (dev == "dev") {
            (console.log("connect in local postgres",),
                await con.register(fastifyPostgres, {
                    connectionString: (process.env.LOCAL)
                })
            )
        }
        console.log("connect to db🦾 is", process.env.DEV)
    } catch (err) {
        console.log(err)
    }
}
export default fp(name)

