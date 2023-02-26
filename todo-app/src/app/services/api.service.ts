import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Task } from '../model/task';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getTasks() {
    return this.http.get<Task[]>(`${environment.apiUrl}/tasks`);
  }
  getTask(id: string) {
    return this.http.get<Task>(`${environment.apiUrl}/tasks/${id}`);
  }
  addTimeSpent(task: Task) {
    return this.http.put<Task>(
      `${environment.apiUrl}/tasks/${task.id}`,
      JSON.stringify(task),
      {headers: { 'Content-type': 'application/json' }}
    );
  }
}
