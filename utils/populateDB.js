const { PrismaClient } = require('@prisma/client');

const subjects = require('./data/subjects.json');
const universities = require('./data/universities.json');
const courses = require('./data/courses.json');

const prisma = new PrismaClient({
  log: [
    { level: 'warn', emit: 'event' },
    { level: 'info', emit: 'event' },
    { level: 'error', emit: 'event' },
  ],
  errorFormat: 'pretty',
});

prisma.$on('warn', (e) => {
  console.log(e);
});

prisma.$on('info', (e) => {
  console.log(e);
});

prisma.$on('error', (e) => {
  console.log(e);
});

async function createEntries(model, data) {
  await model.deleteMany({});

  const created = await model.createManyAndReturn({
    data,
    skipDuplicates: true,
  });

  const count = await model.count({});

  console.log(created, count);
}

async function main() {
  // await createEntries(prisma.university, universities);
  // await createEntries(prisma.subject, subjects);
  await createEntries(prisma.course, courses);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
