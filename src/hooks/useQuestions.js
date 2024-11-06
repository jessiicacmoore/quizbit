import { useState, useCallback } from 'react';
import { decode } from 'html-entities';
import { fetchQuestions } from '@/services/api';
import { shuffleArray } from '@/utils/utils';

export function useQuestions() {
  const [questions, setQuestions] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  const loadQuestions = useCallback(async (categoryId) => {
    setIsFetching(true);
    const fetchedQuestions = await fetchQuestions(categoryId);
    
    // Decode and manipulate questions before storing them
    const processedQuestions = fetchedQuestions.map((question) => ({
      ...question,
      question: decode(question.question),
      correctAnswer: decode(question.correct_answer),
      answers: shuffleArray([
        ...question.incorrect_answers.map((answer) => decode(answer)),
        decode(question.correct_answer),
      ]),
    }));

    setQuestions(processedQuestions);
    setIsFetching(false);
  }, []);

  return { questions, isFetching, loadQuestions };
}