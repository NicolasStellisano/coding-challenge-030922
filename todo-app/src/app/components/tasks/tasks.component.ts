import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Task } from 'src/app/model/task';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent {
  tasks: Task[] = [];

  constructor(private router: Router, private api: ApiService) {}

  ngOnInit() {
    this.api.getTasks().subscribe((tasks) => {
      this.tasks = tasks;
    });
  }

  public openTask(id: string) {
    this.router.navigate(['/task', id]);
  }


  public millisToMinutesAndSeconds(millis: any) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + 'm ' + (seconds < '10' ? '0' : '') + seconds + 's';
  }
}
