const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getAllCourses = async (req, res) => {
  try {
    const q = req.query.q;

    if (q) {
      const courses = await prisma.universityCourse.findMany({
        where: {
          OR: [
            {
              name: {
                search: q,
                mode: 'insensitive',
              },
            },
            {
              subject: {
                name: {
                  search: q,
                  mode: 'insensitive',
                },
              },
            },
            {
              keywords: {
                has: q,
              },
            },
            {
              university: {
                name: {
                  search: q,
                  mode: 'insensitive',
                },
              },
            },
          ],
        },
        include: {
          university: true,
          subject: true,
        },
      });

      if (courses.length === 0) {
        console.log('course not found');
        return res.sendStatus(404);
      }

      console.dir(courses, { depth: null });
      return res.json(courses);
    }

    const courses = await prisma.universityCourse.findMany();
    console.dir(courses, { depth: null });
    res.json(courses);
  } catch (e) {
    console.error(e);
  } finally {
    await prisma.$disconnect();
  }
};

const getSingleCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const course = await prisma.universityCourse.findUnique({
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
