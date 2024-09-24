const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const searchFields = (word) => {
  return [
    {
      name: {
        contains: word,
        mode: 'insensitive',
      },
    },
    {
      course: {
        name: {
          contains: word,
          mode: 'insensitive',
        },
      },
    },
    {
      university: {
        name: {
          contains: word,
          mode: 'insensitive',
        },
      },
    },
    {
      keywords: {
        has: word,
      },
    },
  ];
};

async function countWithQueriesAndUni({ queries, universityFilter }) {
  return await prisma.programme.count({
    where: {
      AND: [
        {
          OR: queries.map((word) => ({
            OR: [...searchFields(word)],
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
  });
}

async function countWithQueries(queries) {
  return await prisma.programme.count({
    where: {
      OR: queries.map((word) => ({
        OR: [...searchFields(word)],
      })),
    },
  });
}

async function countWithUni(universityFilter) {
  return await prisma.programme.count({
    where: {
      universityId: {
        in: universityFilter,
      },
    },
  });
}

async function countWithoutAny() {
  return await prisma.programme.count({});
}

async function countWithQueriesAndFilters({
  queries,
  universityFilter,
  subjectFilter,
}) {
  return await prisma.programme.count({
    where: {
      AND: [
        {
          OR: queries.map((word) => ({
            OR: [...searchFields(word)],
          })),
        },
        {
          universityId: {
            in: universityFilter,
          },
        },
        {
          course: {
            subjectId: {
              in: subjectFilter,
            },
          },
        },
      ],
    },
  });
}

async function countWithQueriesAndSubjects({ queries, subjectFilter }) {
  return await prisma.programme.count({
    where: {
      AND: [
        {
          OR: queries.map((word) => ({
            OR: [...searchFields(word)],
          })),
        },
        {
          course: {
            subjectId: {
              in: subjectFilter,
            },
          },
        },
      ],
    },
  });
}

async function countWithSubjects(subjectFilter) {
  return await prisma.programme.count({
    where: {
      course: {
        subjectId: {
          in: subjectFilter,
        },
      },
    },
  });
}

async function countWithoutQueries({ subjectFilter, universityFilter }) {
  return await prisma.programme.count({
    where: {
      course: {
        subjectId: {
          in: subjectFilter,
        },
      },
      universityId: {
        in: universityFilter,
      },
    },
  });
}

module.exports = {
  countWithQueries,
  countWithQueriesAndFilters,
  countWithQueriesAndSubjects,
  countWithQueriesAndUni,
  countWithSubjects,
  countWithUni,
  countWithoutAny,
  countWithoutQueries,
};
