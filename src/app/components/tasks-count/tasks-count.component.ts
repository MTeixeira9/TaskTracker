import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-tasks-count',
  templateUrl: './tasks-count.component.html',
  styleUrls: ['./tasks-count.component.css']
})
export class TasksCountComponent implements OnInit {

  @Input() numberTask!: number;

  constructor() { }

  ngOnInit(): void {
  }

}
