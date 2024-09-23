const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const selectFields = {
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
};

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

const paginationFields = (page, pageSize) => {
  return {
    skip: (page - 1) * pageSize,
    take: pageSize,
  };
};

async function findWithQueriesAndUni({
  page,
  pageSize,
  queries,
  universityFilter,
}) {
  return await prisma.programme.findMany({
    ...paginationFields(page, pageSize),
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
    select: {
      ...selectFields,
    },
  });
}

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

async function findWithQueries({ page, pageSize, queries }) {
  return await prisma.programme.findMany({
    ...paginationFields(page, pageSize),
    where: {
      OR: queries.map((word) => ({
        OR: [...searchFields(word)],
      })),
    },
    select: {
      ...selectFields,
    },
  });
}

async function findWithUni({ page, pageSize, universityFilter }) {
  return await prisma.programme.findMany({
    ...paginationFields(page, pageSize),
    where: {
      universityId: {
        in: universityFilter,
      },
    },
    select: {
      ...selectFields,
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

async function findWithoutAny({ page, pageSize }) {
  return await prisma.programme.findMany({
    ...paginationFields(page, pageSize),
    select: {
      ...selectFields,
    },
  });
}

async function countWithoutAny() {
  return await prisma.programme.findMany({});
}

async function findWithQueriesAndFilters({
  page,
  pageSize,
  queries,
  universityFilter,
  subjectFilter,
}) {
  return await prisma.programme.findMany({
    ...paginationFields(page, pageSize),
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
    select: {
      ...selectFields,
    },
  });
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

async function findWithQueriesAndSubjects({
  page,
  pageSize,
  queries,
  subjectFilter,
}) {
  return await prisma.programme.findMany({
    ...paginationFields(page, pageSize),
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
    select: {
      ...selectFields,
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

// find with subjects without queries
async function findWithSubjects({ page, pageSize, subjectFilter }) {
  return await prisma.programme.findMany({
    ...paginationFields(page, pageSize),
    where: {
      course: {
        subjectId: {
          in: subjectFilter,
        },
      },
    },
    select: {
      ...selectFields,
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

module.exports = {
  findWithQueriesAndUni,
  countWithQueriesAndUni,
  countWithQueries,
  findWithQueries,
  findWithUni,
  countWithUni,
  findWithoutAny,
  countWithoutAny,
  findWithQueriesAndFilters,
  findWithQueriesAndSubjects,
  findWithSubjects,
  countWithSubjects,
  countWithQueriesAndFilters,
  countWithQueriesAndSubjects,
};
