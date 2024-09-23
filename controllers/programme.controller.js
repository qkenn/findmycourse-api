const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getAllProgrammes = async (req, res) => {
  try {
    const programmes = await prisma.programme.findMany({
      include: {
        course: {
          select: {
            name: true,
          },
        },
        university: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    console.dir(programmes, { depth: null });
    res.json(programmes);
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  } finally {
    await prisma.$disconnect();
  }
};

const getSingleProgramme = async (req, res) => {
  try {
    const { id } = req.params;
    const course = await prisma.programme.findUnique({
      where: {
        id: +id,
      },
      include: {
        university: {
          select: {
            id: true,
            name: true,
          },
        },
        course: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    if (!course) {
      return res.sendStatus(404);
    }

    res.json(course);
  } catch (e) {
    console.error(e);
  } finally {
    await prisma.$disconnect();
  }
};

module.exports = { getAllProgrammes, getSingleProgramme };
