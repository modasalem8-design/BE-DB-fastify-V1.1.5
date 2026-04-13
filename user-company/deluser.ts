import type { FastifyInstance } from "fastify";
import "@fastify/postgres";
export default async function (delUser: FastifyInstance) {
    delUser.get('/delUser', (request, replay) => {
        return ({ "message": "connect in deluser" })
    })
    delUser.delete('/delUser', async (request, replay) => {
        const { name_company, type_company, pass} = request.body as any
        const cu = await delUser.pg.connect()
        try {
            const delsl = await cu.query("SELECT * FROM  app WHERE name_company = $1 AND pass=$2 AND type_company=$3",[name_company,pass])
            if (delsl.rows.length === 0) {
                return replay.code(404).send({ "error": "user undfind" })
            }
            const delt = await cu.query("DELETE FROM app WHERE name_company = $1 AND pass=$2 AND type_company=$3", [name_company,pass])
            if(delt.rowCount ===0){
                return replay.code(450).send({"message":"error in delete name or pass undfind"})
            }
            return replay.code(200).send({"message":"user delete finsh"})
        } catch (err) {
            return replay.code(500).send({ "err": "err in DateBase" })
        } finally {
            if (cu) { cu.release() }
        }
    })

}