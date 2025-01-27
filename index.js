import { PrismaClient } from "@prisma/client";
import express from "express";

const prisma = new PrismaClient();
const app = express();

async function main() {
  const users = await prisma.user.findMany();
  console.log(users);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

app.use(express.json());

app.get("/users", async (req, res) =>  {
  const users = await prisma.user.findMany();
  res.json(users);
});

const server = app.listen(3002, () => {
  console.log(`Server started on port ${server.address().port}`);
});
