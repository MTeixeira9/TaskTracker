import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UiService {

  private showAddTask: boolean = false;
  private updatedTask!: Task;
  private subject = new Subject<any>();

  constructor() { }

  toggleAddTask(): void {
    this.showAddTask = !this.showAddTask;
    this.subject.next(this.showAddTask);
  }

  toggleUpdateTask(newTask: any): void {
    this.updatedTask = newTask;
    this.subject.next(this.updatedTask);
  }

  onToggle(): Observable<any> {
    return this.subject.asObservable();
  }
}
