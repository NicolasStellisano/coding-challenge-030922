import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from 'src/app/model/task';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent {
  name:string = "";
  task!: Task;
  constructor(private route: ActivatedRoute,private router : Router,private api: ApiService) {}

 
  ngOnInit() {
    this.route.params.subscribe(params => {
      let taskId = params['id'];
      this.api.getTask(taskId).subscribe((task) => {
        this.task = task;
      });
    });
  }
  done()
  {
    this.task.status = "Done";
    this.api.addTimeSpent(this.task).subscribe((tasks) => {
      console.log(tasks);
    });
  }

  back()
  {
    this.router.navigate(['/tasks']);
  }


}
