//تعريفات واستدعائات
import Cors from "@fastify/cors";
import name from "./sql.js";
import type { FastifyInstance } from "fastify"
import createUser from "../user-company/creuse.js"
import del from "../user-company/deluser.js";
import up from "../user-company/upuser.js";

export default async function (conn: FastifyInstance) {
    await conn.register(name);
    await conn.register(createUser);
    await conn.register(del)
    await conn.register(up)
    await conn.register(Cors,{origin:true})
    console.log("connect to app")
}