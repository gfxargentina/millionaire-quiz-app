import React, { useEffect, useState } from "react";
import useSound from "use-sound";
import intro from "../assets/intro-music.wav";
import correct from "../assets/Correct.wav";
import wrong from "../assets/incorrect.wav";

const Trivia = ({ data, setTimeStop, questionNumber, setQuestionNumber }) => {
  const [question, setQuestion] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [className, setClassName] = useState("answer");
  //para reproducirs los sonidos
  const [play, { sound }] = useSound(intro);
  const [correctAnswer] = useSound(correct);
  const [wrongAnswer] = useSound(wrong);

  useEffect(() => {
    play();
  }, [play]);

  useEffect(() => {
    setQuestion(data[questionNumber - 1]);
  }, [data, questionNumber]);

  const delay = (duration, callback) => {
    setTimeout(() => {
      callback();
    }, duration);
  };

  const handleClick = (answer) => {
    setSelectedAnswer(answer);
    setClassName("answer active");
    delay(2000, () =>
      setClassName(answer.correct ? "answer correct" : "answer wrong")
    );
    delay(5000, () => {
      if (answer.correct) {
        sound.fade(0, 1, 2000);
        correctAnswer();
        delay(2000, () => {
          setQuestionNumber((prev) => prev + 1);
          setSelectedAnswer(null);
        });
      } else {
        wrongAnswer();
        delay(1000, () => {
          setTimeStop(true);
        });
      }
    });
  };

  return (
    <div className="trivia">
      <div className="question">{question?.question}</div>
      <div className="answers">
        {question?.answers.map((answer) => (
          <div
            className={selectedAnswer === answer ? className : "answer"}
            onClick={() => handleClick(answer)}
          >
            {answer.text}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Trivia;
