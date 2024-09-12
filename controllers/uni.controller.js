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

const getSingleUni = async (req, res) => {
  try {
    const { id } = req.params;
    const uni = await prisma.uni.findUnique({
      where: {
        id: +id,
      },
    });
    if (!uni) {
      return res
        .status(404)
        .json({ success: false, message: 'university not found' });
    }
    res.json({ success: true, message: uni });
  } catch (e) {
    console.error(e);
  } finally {
    await prisma.$disconnect();
  }
};

module.exports = { getUnis, getSingleUni };
