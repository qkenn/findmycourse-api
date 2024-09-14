const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getAllCourses = async (req, res) => {
  try {
    const subjects = await prisma.course.findMany({
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

const getSingleCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const subject = await prisma.course.findUnique({
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

module.exports = { getAllCourses, getSingleCourse };
