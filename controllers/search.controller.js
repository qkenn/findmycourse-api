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
    const page = isNaN(+(req.query.page || 1)) ? 1 : +(req.query.page || 1);
    const pageSize = 8;
    const universityFilter = (req.query.university || '')
      .split(',')
      .map((term) => term.trim())
      .filter((term) => term.length > 0)
      .map((term) => {
        const number = Number(term);
        return isNaN(number) ? term : number;
      });

    console.log(universityFilter);

    if (universityFilter.length > 0 && queries.length > 0) {
      const [programmes] = await Promise.all([
        await prisma.programme.findMany({
          skip: (page - 1) * pageSize,
          take: pageSize,
          where: {
            AND: [
              {
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
              {
                university: {
                  id: {
                    in: universityFilter,
                  },
                },
              },
            ],
          },
          select: {
            id: true,
            name: true,
            duration: true,
            medium: true,
            keywords: true,
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
                subject: {
                  select: {
                    id: true,
                    name: true,
                  },
                },
              },
            },
          },
        }),
      ]);

      return res.json({ programmes });
    }

    if (universityFilter.length > 0) {
      const [programmes, count] = await Promise.all([
        await prisma.programme.findMany({
          skip: (page - 1) * pageSize,
          take: pageSize,
          where: {
            university: {
              id: {
                in: universityFilter,
              },
            },
          },
          select: {
            id: true,
            name: true,
            duration: true,
            medium: true,
            keywords: true,
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
                subject: {
                  select: {
                    id: true,
                    name: true,
                  },
                },
              },
            },
          },
        }),

        await prisma.programme.count(),
      ]);

      return res.json({ programmes, count, pageSize, page });
    }

    // no queries, get all programmes
    if (queries.length < 1) {
      const [programmes, count] = await Promise.all([
        await prisma.programme.findMany({
          skip: (page - 1) * pageSize,
          take: pageSize,
          select: {
            id: true,
            name: true,
            duration: true,
            medium: true,
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
                subject: {
                  select: {
                    id: true,
                    name: true,
                  },
                },
              },
            },
          },
        }),
        await prisma.programme.count(),
      ]);
      return res.json({ programmes, count, pageSize, page });
    }

    console.log(queries);

    // search for programmes with matching queries
    const [programmes, count] = await Promise.all([
      await prisma.programme.findMany({
        skip: (page - 1) * pageSize,
        take: pageSize,
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
          keywords: true,
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
              subject: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          },
        },
      }),
      await prisma.programme.count({
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
      }),
    ]);

    // no results
    if (programmes.length < 1) {
      return res.sendStatus(404);
    }

    console.log(programmes);

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

    return res.json({
      programmes: programmesWithRelevance,
      count,
      pageSize,
      count,
      pageSize,
      page,
    });
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  } finally {
    await prisma.$disconnect();
  }
}

module.exports = searchDB;
