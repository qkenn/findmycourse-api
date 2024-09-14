const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getAllSubjects = async (req, res) => {
  try {
    const subjects = await prisma.subject.findMany({
      include: {
        universityProgrammes: {
          select: {
            name: true,
          },
        },
      },
    });
    console.dir(subjects, { depth: null });
    res.json(subjects);
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  } finally {
    await prisma.$disconnect();
  }
};

const getSingleSubject = async (req, res) => {
  try {
    const { id } = req.params;
    const subject = await prisma.subject.findUnique({
      where: {
        id: +id,
      },
    });
    if (!subject) {
      return res.sendStatus(404);
    }

    res.json(subject);
  } catch (e) {
    console.error(e);
  } finally {
    await prisma.$disconnect();
  }
};

module.exports = { getAllSubjects, getSingleSubject };
