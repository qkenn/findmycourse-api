const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function searchDB(req, res) {
  try {
    // get search queries
    const q = (req.query.q || '').toLowerCase();
    const queries = q
      .split(' ')
      .map((term) => term.trim())
      .filter((term) => term.length > 0);

    // search when there are queries
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
          keywords: true,
        },
      });

      // no results for the selected query
      if (programmes.length < 1) {
        return res.sendStatus(404);
      }

      // sort searched results based on relevence
      const programmesWithRelevance = programmes.map((programme) => {
        let relevance = 0;

        queries.forEach((term) => {
          if (programme.name.toLowerCase().includes(term)) {
            relevance++;
          }

          if (programme.course.name.toLowerCase().includes(term)) {
            relevance++;
          }

          if (programme.university.name.toLowerCase().includes(term)) {
            relevance++;
          }

          programme.keywords.forEach((k) => {
            if (k.toLowerCase().includes(term)) relevance++;
          });
        });

        return { ...programme, relevance };
      });
      programmesWithRelevance.sort((a, b) => b.relevance - a.relevance);

      return res.json(programmesWithRelevance);
    }

    // get all programmes when there are no queries
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
    res.json(programmes);
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  } finally {
    await prisma.$disconnect();
  }
}

module.exports = searchDB;
