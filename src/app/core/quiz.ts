import { Gadget } from './gadget';

export interface IQuestion {
  id: string;
  pergunta: string;
  livro: string;
  nivel: string;
  ajuda_pergunta: string;
  op_resp_1: string;
  op_resp_2: string;
  op_resp_3: string;
  op_resp_4: string;
  op_resp_5: string;
  resp_certa: string;
}

export class Quiz extends Gadget {

    public questions: IQuestion[];
    public selectedQuestion: IQuestion;
    public value: string;
    public transitionRight: string;
    public transitionWrong: string;

    constructor(question?: IQuestion, transitionRight?: string, transitionWrong?: string) {
      super('quiz', 'Quiz');
      this.clearQuestions();
      this.value = "";
      if(question) {
        this.selectedQuestion = question;
        this.transitionRight = transitionRight;
        this.transitionWrong = transitionWrong;
      } else {
        this.clearSelectedQuestion();
      }
    }

    add(question: IQuestion) {
      this.questions.push(question);
    }

    get(index: number) {
      return this.questions[index];
    }

    setSelectedQuestion(id: string) {
      this.selectedQuestion = this.questions.find(question => question.id === id);
    }

    clearSelectedQuestion() {
      this.selectedQuestion = {
        id: "",
        pergunta: "",
        livro: "",
        nivel: "",
        ajuda_pergunta: "",
        op_resp_1: "",
        op_resp_2: "",
        op_resp_3: "",
        op_resp_4: "",
        op_resp_5: "",
        resp_certa: "",
      };
    }

    clearQuestions() {
      this.questions = [];
    }

    get data() {
      return {
        selectedQuestion: this.selectedQuestion,
        transitionRight: this.transitionRight,
        transitionWrong: this.transitionWrong
      }
    }



    get isAnswered(): boolean {
      console.log("value: " + this.value);
      return this.value != undefined && this.value.length > 0;
    }
  }
