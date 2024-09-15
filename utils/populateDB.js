const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const subjects = require('./data/subjects.json');
const universities = require('./data/universities.json');
const courses = require('./data/courses.json');
const programmes = require('./data/programmes.json');

const models = [
  { model: prisma.university, data: universities },
  { model: prisma.subject, data: subjects },
  { model: prisma.course, data: courses },
  { model: prisma.programme, data: programmes },
];

async function createEntries(model, data) {
  const created = await model.createManyAndReturn({
    data,
    skipDuplicates: true,
  });

  console.log(created);
}

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

  for (const m of models) {
    await createEntries(m.model, m.data);
  }
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
