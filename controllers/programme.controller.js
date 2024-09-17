const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getAllProgrammes = async (req, res) => {
  try {
    const q = (req.query.q || '').toLowerCase();
    console.log(q);

    const queries = q
      .split(' ')
      .map((term) => term.trim())
      .filter((term) => term.length > 0);

    if (queries.length > 0) {
      const courses = await prisma.programme.findMany({
        where: {
          OR: queries.map((term) => ({
            OR: [
              {
                name: {
                  contains: term,
                  mode: 'insensitive',
                },
              },
              {
                course: {
                  name: {
                    contains: term,
                    mode: 'insensitive',
                  },
                },
              },
              {
                university: {
                  name: {
                    contains: term,
                    mode: 'insensitive',
                  },
                },
              },
              {
                keywords: {
                  has: term,
                },
              },
            ],
          })),
        },
        select: {
          id: true,
          name: true,
          duration: true,
          medium: true,
          course: {
            select: {
              name: true,
            },
          },
          university: {
            select: {
              name: true,
            },
          },
        },
      });

      if (courses.length < 1) {
        return res.sendStatus(404);
      }

      return res.json(courses);
    }

    const courses = await prisma.programme.findMany({
      include: {
        course: {
          select: {
            name: true,
          },
        },
        university: {
          select: {
            name: true,
          },
        },
      },
    });
    console.dir(courses, { depth: null });
    res.json(courses);
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
