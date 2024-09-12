const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getAllCourses = async (req, res) => {
  try {
    const q = req.query.q || '';

    if (q) {
      const courses = await prisma.universityCourse.findMany({
        where: {
          OR: [
            {
              name: {
                search: q,
              },
            },
            {
              subject: {
                name: {
                  search: q,
                },
              },
            },
            {
              subject: {
                keywords: {
                  has: q,
                },
              },
            },
          ],
        },
      });

      if (courses.length === 0) {
        return res.sendStatus(404);
      }

      return res.json(courses);
    }

    const courses = await prisma.universityCourse.findMany();
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
    const course = await prisma.course.findUnique({
      where: {
        id: +id,
      },
    });
    if (!course) {
      return res
        .status(404)
        .json({ success: false, message: 'university not found' });
    }
    res.json({ success: true, message: course });
  } catch (e) {
    console.error(e);
  } finally {
    await prisma.$disconnect();
  }
};

module.exports = { getAllCourses, getSingleCourse };
