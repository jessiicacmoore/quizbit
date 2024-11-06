export async function fetchQuestions (categoryId) {
  const res = await fetch(`https://opentdb.com/api.php?amount=10&category=${categoryId}&difficulty=easy&type=multiple`);
  const resData = await res.json();

  return resData.results;
}