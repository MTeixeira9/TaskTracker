import { Component, OnInit } from '@angular/core';
import { UiService } from '../../services/ui.service';
import { TaskService } from '../../services/task.service';
import { Task } from '../../Task';
import { Subscription } from 'rxjs';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  tasks: Task[] = [];
  subscription!: Subscription;

  constructor(private taskService: TaskService, private uiService: UiService) {    
    this.subscription = this.uiService.onToggle().subscribe((task) => this.updateTask(task));
  }

  ngOnInit(): void {
    this.taskService.getTasks().subscribe((tasks) => this.tasks = tasks);
  }

  deleteTask(task: Task) {
    this.taskService
    .deleteTask(task)
    .subscribe(
      () => (this.tasks = this.tasks.filter(t => t.id !== task.id))
    );
  }

  addTask(task: Task) {
    this.taskService.addTask(task).subscribe((task) => this.tasks.push(task));
  }

  updateTask(task: Task) {    
    this.taskService.updateTask(task).subscribe((task) => {
      let taskIndex = this.tasks.findIndex(t => t.id === task.id);
      this.tasks[taskIndex] = task;
    });
  }

  drop(event: CdkDragDrop<string[]>) {
    const previousIndexTaskText = this.tasks[event.previousIndex].text;
    const previousIndexTaskDay = this.tasks[event.previousIndex].day;
    const previousIndexTaskReminder = this.tasks[event.previousIndex].reminder;

    this.tasks[event.previousIndex].text = this.tasks[event.currentIndex].text;
    this.tasks[event.previousIndex].day = this.tasks[event.currentIndex].day;
    this.tasks[event.previousIndex].reminder = this.tasks[event.currentIndex].reminder;

    this.tasks[event.currentIndex].text = previousIndexTaskText;
    this.tasks[event.currentIndex].day = previousIndexTaskDay;
    this.tasks[event.currentIndex].reminder = previousIndexTaskReminder;

    this.updateTask(this.tasks[event.previousIndex]);
    this.updateTask(this.tasks[event.currentIndex]);
  }
}
