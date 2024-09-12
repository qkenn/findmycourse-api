const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getUnis = async (req, res) => {
  try {
    const unis = await prisma.uni.findMany();
    res.json({ success: true, message: unis });
  } catch (e) {
    console.error(e);
  } finally {
    await prisma.$disconnect();
  }
};

const getSingleUni = (req, res) => {
  const { id } = req.params;
  res.json({ success: true, message: `${id} university details` });
};

module.exports = { getUnis, getSingleUni };
