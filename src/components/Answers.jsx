import List from "@/components/common/List";
import Button from "@/components/common/Button";

function Answers({ answers, answeredState, userAnswer, onSelect }) {
  return ( 
    <List className="answer-list">
      {answers.map((answer, index) => {
        const isSelected = userAnswer.selectedAnswer === answer;
        let btnState = '';

        if (answeredState === 'answered' && isSelected) {
          btnState = 'selected';
        } 

        if ((answeredState === 'correct' || answeredState === 'wrong') && isSelected) {
          btnState = answeredState;
        }

        return (
          <li key={index}>
            <Button btnState={btnState} disabled={answeredState !== ''} onClick={() => onSelect(answer)} >{answer}</Button>
          </li>
        )
      })}
    </List>
  );
}

export default Answers;