const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// data imports
const subjects = require('./data/subjects.json');
const universities = require('./data/universities.json');
const courses = require('./data/courses.json');
const programmes = require('./data/programmes.json');

// create db entries utility
async function createEntries(model, data) {
  const created = await model.createManyAndReturn({
    data,
    skipDuplicates: true,
  });

  console.log(created);
}

// delete all db entries utility
async function deleteAllEntries() {
  await prisma.$transaction([
    prisma.programme.deleteMany(),
    prisma.university.deleteMany(),
    prisma.course.deleteMany(),
    prisma.subject.deleteMany(),
  ]);
}

async function main() {
  await deleteAllEntries();

  await createEntries(prisma.subject, subjects);
  await createEntries(prisma.university, universities);
  await createEntries(prisma.course, courses);
  await createEntries(prisma.programme, programmes);
}

main()
  .catch(async (e) => {
    console.error(e.message);
    process.exit(1);
  })
  .finally(async () => await prisma.$disconnect());
