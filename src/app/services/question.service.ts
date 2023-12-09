import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http:HttpClient) { }

  // get questions of quiz
  public getQuestionsOfQuiz(qid:any){
    return this.http.get(`${baseUrl}/question/quiz/all/${qid}`);
  }

  // get questions of quiz for test
  public getQuestionsOfQuizForTest(qid:any){
    return this.http.get(`${baseUrl}/question/quiz/${qid}`);
  }

  //add question
  public addQuestion(question:any,qId:any){
    return this.http.post(`${baseUrl}/question/${qId}`, question);
  }

  // delete question
  public deleteQuestion(qId:any){
    return this.http.delete(`${baseUrl}/question/${qId}`);
  }

  // eval-quiz
  public evalQuiz(questions:any){
    return this.http.post(`${baseUrl}/question/eval-quiz`,questions);
  }
}
