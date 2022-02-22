import { Component, OnInit } from '@angular/core';
import { UiService } from '../../services/ui.service';
import { TaskService } from '../../services/task.service';
import { Task } from '../../Task';
import { Subscription } from 'rxjs';

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

  toggleReminder(task: Task) {
    task.reminder = !task.reminder;
    this.taskService.updateTaskReminder(task).subscribe();
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
}
