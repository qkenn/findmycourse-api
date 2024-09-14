const { PrismaClient } = require('@prisma/client');

const subjects = require('./data/subjects.json');
const universities = require('./data/universities.json');
const courses = require('./data/courses.json');
const programmes = require('./data/programmes.json');

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
  const created = await model.createManyAndReturn({
    data,
    skipDuplicates: true,
  });

  console.log(created);
}

async function deleteAllEntries() {
  const deleteUnis = prisma.university.deleteMany();
  const deleteSubjects = prisma.subject.deleteMany();
  const deleteCourses = prisma.course.deleteMany();
  const deleteProgrammes = prisma.programme.deleteMany();

  await prisma.$transaction([
    deleteProgrammes,
    deleteUnis,
    deleteCourses,
    deleteSubjects,
  ]);
}

async function main() {
  await deleteAllEntries();

  await createEntries(prisma.university, universities);
  await createEntries(prisma.subject, subjects);
  await createEntries(prisma.course, courses);
  await createEntries(prisma.programme, programmes);
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
