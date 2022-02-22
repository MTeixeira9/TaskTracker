import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UiService } from '../../services/ui.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit {

  id?: number;
  text: string = '';
  day: string = '';
  reminder: boolean = false;

  constructor(private route: ActivatedRoute, private taskService: TaskService, 
    private router: Router, private uiService: UiService) { }

  ngOnInit(): void {
    const taskId: number = Number(this.route.snapshot.paramMap.get('id'));
    this.taskService.getTask(taskId).subscribe(task => { 
      this.id = task.id; 
      this.text = task.text;
      this.day = task.day;
      this.reminder = task.reminder;
    });
  }

  onSubmit() {
    if (!this.text) {
      alert("Please add task's title!");
      return;
    }

    if (!this.day) {
      alert("Please add task's day!");
      return;
    }

    const newTask = {
      id: this.id,
      text: this.text,
      day: this.day,
      reminder: this.reminder
    }
    
    this.uiService.toggleUpdateTask(newTask);
    this.router.navigate([`/`]);
  }

}
