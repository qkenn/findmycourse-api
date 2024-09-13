const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getAllCourses = async (req, res) => {
  try {
    const q = (req.query.q || '').toLowerCase();
    console.log(q);

    const queries = q
      .split(' ')
      .map((term) => term.trim())
      .filter((term) => term.length > 0);

    if (queries.length > 0) {
      const courses = await prisma.universityProgramme.findMany({
        where: {
          OR: queries.map((term) => ({
            OR: [
              {
                name: {
                  search: term,
                },
              },
              {
                subject: {
                  name: {
                    search: term,
                  },
                },
              },
              {
                university: {
                  name: {
                    search: term,
                  },
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
          subject: {
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

      if (courses.length === 0) {
        console.log('course not found');
        return res.sendStatus(404);
      }

      return res.json(courses);
    }

    const courses = await prisma.universityProgramme.findMany({
      include: {
        subject: true,
        university: true,
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

const getSingleCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const course = await prisma.universityProgramme.findUnique({
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

module.exports = { getAllCourses, getSingleCourse };
