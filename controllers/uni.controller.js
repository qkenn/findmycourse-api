const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getUnis = async (req, res) => {
  try {
    const unis = await prisma.university.findMany({
      include: {
        programmes: true,
      },
    });
    res.json(unis);
  } catch (e) {
    console.error(e);
  } finally {
    await prisma.$disconnect();
  }
};

const getSingleUni = async (req, res) => {
  try {
    const { id } = req.params;
    const uni = await prisma.university.findUnique({
      where: {
        id: +id,
      },
    });
    if (!uni) {
      return res
        .status(404)
        .json({ success: false, message: 'university not found' });
    }

    res.json(uni);
  } catch (e) {
    console.error(e);
  } finally {
    await prisma.$disconnect();
  }
};

module.exports = { getUnis, getSingleUni };
