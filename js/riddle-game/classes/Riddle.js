import readline from "readline-sync";
export class Riddle{
    constructor({id, name, taskDescription, correctAnswer,difficulty}){
        this.id = id;
        this.name = name;
        this.taskDescription = taskDescription;
        this.correctAnswer = correctAnswer;
        this.difficulty=difficulty
    }

    async ask(){
        console.log(this.taskDescription);
        let answer;
        
        do{
            answer = readline.question('Your answer: ');
        }while(answer!=this.correctAnswer);
        console.log("correct!");
    }
}
