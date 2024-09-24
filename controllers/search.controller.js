const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const {
  findWithQueriesAndUni,
  findWithQueries,
  findWithUni,
  findWithoutAny,
  findWithQueriesAndFilters,
  findWithQueriesAndSubjects,
  findWithSubjects,
  filterWithoutQueries,
} = require('../prisma/queries');
const {
  countWithQueries,
  countWithQueriesAndFilters,
  countWithQueriesAndSubjects,
  countWithQueriesAndUni,
  countWithSubjects,
  countWithUni,
  countWithoutAny,
  countWithoutQueries,
} = require('../prisma/counts');
const { calculateRelevance } = require('../utils/calculateRelevence');

async function searchProgrammes(req, res) {
  try {
    // getting search query
    // converts to lowercase, split into individual words, trim and filter out empty strings
    const q = (req.query.q || '').toLowerCase();
    const queries = q
      .split(' ')
      .map((query) => query.trim())
      .filter((query) => query.length > 0);

    // getting page number
    // converts to an int, if not a number or is not provided defaults to 1
    const page = Math.max(1, parseInt(req.query.page) || 1);

    const pageSize = 8;

    // getting university filter
    // split into individual ids, trims, filter out empty values and keeps only numbers
    const universityFilter = (req.query.university || '')
      .split(',')
      .map((id) => id.trim())
      .filter((id) => id.length > 0 && !isNaN(Number(id)))
      .map(Number);

    const subjectFilter = (req.query.subject || '')
      .split(',')
      .map((id) => id.trim())
      .filter((id) => id.length > 0 && !isNaN(Number(id)))
      .map(Number);

    console.log(req.url);
    console.log(universityFilter, subjectFilter);

    // university filter, subject filter and queries
    if (
      universityFilter.length > 0 &&
      subjectFilter.length > 0 &&
      queries.length > 0
    ) {
      const [programmes, count] = await Promise.all([
        findWithQueriesAndFilters({
          page,
          pageSize,
          queries,
          universityFilter,
          subjectFilter,
        }),
        countWithQueriesAndFilters({
          queries,
          universityFilter,
          subjectFilter,
        }),
      ]);

      if (programmes.length < 1) {
        return res.sendStatus(404);
      }

      return res.json({
        programmes: calculateRelevance(programmes, queries),
        count,
        pageSize,
        page,
      });
    }

    // university filter and subject filter without queries
    if (
      universityFilter.length > 0 &&
      subjectFilter.length > 0 &&
      queries.length < 1
    ) {
      const [programmes, count] = await Promise.all([
        findWithQueriesAndFilters({
          page,
          pageSize,
          queries,
          universityFilter,
          subjectFilter,
        }),
        countWithQueriesAndFilters({
          queries,
          universityFilter,
          subjectFilter,
        }),
      ]);

      if (programmes.length < 1) {
        return res.sendStatus(404);
      }

      return res.json({
        programmes: calculateRelevance(programmes, queries),
        count,
        pageSize,
        page,
      });
    }

    // subject filter and queries
    if (subjectFilter.length > 0 && queries.length > 0) {
      const [programmes, count] = await Promise.all([
        filterWithoutQueries({
          page,
          pageSize,
          subjectFilter,
          universityFilter,
        }),
        countWithoutQueries({ subjectFilter, universityFilter }),
      ]);

      if (programmes.length < 1) {
        return res.sendStatus(404);
      }

      return res.json({
        programmes,
        count,
        pageSize,
        page,
      });
    }

    // subject filter without queries
    if (subjectFilter.length > 0) {
      const [programmes, count] = await Promise.all([
        findWithSubjects({ page, pageSize, subjectFilter }),
        countWithSubjects(subjectFilter),
      ]);

      if (programmes.length < 1) {
        return res.sendStatus(404);
      }

      return res.json({
        programmes,
        count,
        pageSize,
        page,
      });
    }

    // univesity filter and queries
    if (universityFilter.length > 0 && queries.length > 0) {
      const [programmes, count] = await Promise.all([
        findWithQueriesAndUni({ page, pageSize, queries, universityFilter }),
        countWithQueriesAndUni({ queries, universityFilter }),
      ]);

      if (programmes.length < 1) {
        return res.sendStatus(404);
      }

      return res.json({
        programmes: calculateRelevance(programmes, queries),
        count,
        pageSize,
        page,
      });
    }

    // university filter without queries
    if (universityFilter.length > 0) {
      const [programmes, count] = await Promise.all([
        findWithUni({
          page,
          pageSize,
          universityFilter,
        }),
        countWithUni(universityFilter),
      ]);

      if (programmes.length < 1) {
        return res.sendStatus(404);
      }

      return res.json({ programmes, count, pageSize, page });
    }

    // queries only
    if (queries.length > 0) {
      const [programmes, count] = await Promise.all([
        findWithQueries({ page, pageSize, queries }),
        countWithQueries(queries),
      ]);

      if (programmes.length < 1) {
        return res.sendStatus(404);
      }

      return res.json({
        programmes: calculateRelevance(programmes, queries),
        count,
        pageSize,
        count,
        pageSize,
        page,
      });
    }

    // no filters and no queries
    const [programmes, count] = await Promise.all([
      findWithoutAny({ page, pageSize }),
      countWithoutAny(),
    ]);

    if (programmes.length < 1) {
      return res.sendStatus(404);
    }

    return res.json({ programmes, count, pageSize, page });
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  } finally {
    await prisma.$disconnect();
  }
}

module.exports = searchProgrammes;
