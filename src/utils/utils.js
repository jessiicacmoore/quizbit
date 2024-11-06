const COLORS = {
  defaultBar: '#99DBF8',
  answeredBar: '#FAD9BD',
  correctBar: '#D7EED7',
  wrongBar: '#eb8c95',
  defaultValue: '#00a6ed',
  answeredValue: '#f39f5a',
  correctValue: '#8dcd8d',
  wrongValue: '#dc3545',
};

export const shuffleArray = (array) => {
  return array.sort(() => Math.random() - 0.5);
}

export const getAnswerState = (answer, correctAnswer) => {
  if (answer === null) return 'skipped';
  return answer === correctAnswer ? 'correct' : 'wrong';
};

export const getColorsByMode = (mode) => {
  switch (mode) {
    case 'answered':
      return { barColor: COLORS.answeredBar, valueColor: COLORS.answeredValue };
    case 'correct':
      return { barColor: COLORS.correctBar, valueColor: COLORS.correctValue };
    case 'wrong':
      return { barColor: COLORS.wrongBar, valueColor: COLORS.wrongValue };
    default:
      return { barColor: COLORS.defaultBar, valueColor: COLORS.defaultValue };
  }
}