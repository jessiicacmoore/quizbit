export const shuffleArray = (array) => {
  return array.sort(() => Math.random() - 0.5);
}

export const getAnswerState = (answer, correctAnswer) => {
  if (answer === null) return 'skipped';
  return answer === correctAnswer ? 'correct' : 'wrong';
};