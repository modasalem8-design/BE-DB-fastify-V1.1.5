import fastify from "fastify";
import '@fastify/postgres';
import "dotenv/config";
import conn from "./sql&user/connect.app.js";


const app = fastify({ 
  logger: { 
    transport: { target: 'pino-pretty' } 
  } 
});
const start = async () => {
  try {
    
    // 3. ضيف الـ Home route (اختياري هنا أو بره بس جوه الـ start أضمن)
    app.get('/', async (request, reply) => {
      return { status: "good", message: "hello" };
    });
    await app.register(conn)
    // 4. شغل السيرفر في الآخر خالص
    await app.listen({
      port: Number(process.env.PORT) || 8000,
      host: "0.0.0.0"
    });
    
    console.log(`🚀 Server is running on port 8000`);
  } catch (error) {
    app.log.error(error);
    process.exit(1);
  }
};
start();