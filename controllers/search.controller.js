const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function searchDB(req, res) {
  try {
    const q = (req.query.q || '').toLowerCase();
    console.log(q);

    const queries = q
      .split(' ')
      .map((term) => term.trim())
      .filter((term) => term.length > 0);

    if (queries.length > 0) {
      const programmes = await prisma.programme.findMany({
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

      if (programmes.length < 1) {
        return res.sendStatus(404);
      }

      return res.json(programmes);
    }

    const programmes = await prisma.programme.findMany({
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
    console.dir(programmes, { depth: null });
    res.json(programmes);
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  } finally {
    await prisma.$disconnect();
  }
}

module.exports = searchDB;
