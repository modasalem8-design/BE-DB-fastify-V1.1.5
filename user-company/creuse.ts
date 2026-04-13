// استدعائات
import "dotenv/config"
import type { FastifyInstance } from "fastify"
import "@fastify/postgres";
import bcrypt from "bcryptjs";
//استخراج الدالة 
export default async function (createUser: FastifyInstance) {
    // تجربة
    createUser.get('/user', async (request, reply) => {
        return ({ message: "conected to  CreateUser" })
    })
    // انشاء حساب
    createUser.post('/user', async (request, replay) => {
        const { name_company, type_company, pass } = (request.body as any)
        // تأكد أولاً أن القيم موجودة ولها قيمة (ليست null أو undefined)
        if (!name_company || !pass || !type_company ||
            name_company.length < 5 || pass.length < 5 || type_company.length < 5 ||
            name_company === pass) {

            return replay.code(400).send({ // كود 400 أنسب للأخطاء دي
                status: "err in input",
                message: "All fields must be at least 5 characters and valid.",
            });
        }
        // الربط  بي pg سواء محلي او ويب
        const cu = await createUser.pg.connect()
        try {
            const hash = await bcrypt.hash(pass, 10);
            const app = await cu.query("SELECT * FROM app WHERE name_company =$1", [name_company])
            console.log("dev")
            if (app.rows.length > 0) {
                return replay.code(400).send({ "error": "please Enter another name or pass" })
            }
            const arm = await cu.query("INSERT INTO app(name_company,type_company,pass) VALUES ($1,$2,$3)", [name_company,type_company , pass])
            return replay.code(201).send({ "message": " create succesful", name_company, hash })
        } catch (err) {
            console.error(err)

            return ({ "message": "error db undfind", })
        }
        finally {
            if (cu) { cu.release(); }
        }
    })

}
