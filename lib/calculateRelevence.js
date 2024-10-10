// relevenance calculate utility
function calculateRelevance(programmes, queries) {
  return (
    programmes
      .map((programme) => {
        let relevance = 0;

        queries.forEach((word) => {
          if (programme.name.toLowerCase().includes(word)) {
            relevance++;
          }

          if (programme.course.name.toLowerCase().includes(word)) {
            relevance++;
          }

          if (programme.university.name.toLowerCase().includes(word)) {
            relevance++;
          }

          programme.keywords.forEach((k) => {
            if (k.toLowerCase().includes(word)) relevance++;
          });
        });

        return { ...programme, relevance };
      })
      // sort based on relevance descending
      .sort((a, b) => b.relevance - a.relevance)
  );
}

module.exports = { calculateRelevance };
