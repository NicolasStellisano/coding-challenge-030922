import { Component, Input } from '@angular/core';
import { Task } from 'src/app/model/task';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
})
export class TimerComponent {
  @Input() task!: Task; // decorate the property with @Input()

  timeSpent!: number;
  timeStopped!: Date;
  timeStarted!: Date;
  showTime: string = '';
  maxSeconds = 1800;
  /**
   *
   */
  constructor(private api: ApiService) {}

  ngAfterViewInit() {
    this.timeSpent = this.task.timeSpent;
    this.showTime = this.millisToMinutesAndSeconds(this.timeSpent);

    let timer = document.getElementsByClassName('timer');
    if (this.timeSpent > 0) {
      timer[0].classList.remove('hidden');
      let percentage =
        ((100 * (this.timeSpent / 1000)) / this.maxSeconds).toString() + '%';

      let el: HTMLElement = document.querySelector('.timer')!;
      el.style.setProperty('--percentage', percentage);

    }
  }

  millisToMinutesAndSeconds(millis: any) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + 'm ' + (seconds < '10' ? '0' : '') + seconds + 's';
  }

  play() {
    let boton = document.getElementsByClassName('boton');
    if (boton[0].classList.contains('pause')) {
      this.timeStopped = new Date();
      this.timeSpent += this.timeStopped.getTime() - this.timeStarted.getTime();
      this.showTime = this.millisToMinutesAndSeconds(this.timeSpent);
      this.task.timeSpent = this.timeSpent;
      this.api.addTimeSpent(this.task).subscribe((tasks) => {
        console.log(tasks);
      });
    } else {
      this.timeStarted = new Date();
    }
    boton[0].classList.toggle('pause');

    let timer = document.getElementsByClassName('timer');
    timer[0].classList.remove('hidden');
    timer[0].classList.toggle('pause');
  }

}
