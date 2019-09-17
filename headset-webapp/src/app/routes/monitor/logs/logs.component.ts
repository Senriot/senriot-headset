import { Component, OnInit, ViewChild }  from '@angular/core';
import { STColumn, STComponent, STPage } from '@delon/abc';
import { SFSchema }                      from '@delon/form';
import { Log }                           from './log.model';
import { LogsService }                   from './logs.service';

@Component({
  selector   : 'app-monitor-logs',
  templateUrl: './logs.component.html',
})
export class MonitorLogsComponent implements OnInit {
  // url = 'management/loggers';

  searchSchema: SFSchema = {
    properties: {
      no: {
        type : 'string',
        title: '编号',
      },
    },
  };
  @ViewChild('st', { static: false }) st: STComponent;
  columns: STColumn[]    = [
    { title: '名称', index: 'name' },
    { title: '等级', render: 'buttons', width: 540 },
  ];

  loggers: Log[];
  filter: string;
  orderProp: string;
  reverse: boolean;

  page: STPage = {
    front: false,
    show : false,
  };

  constructor(private logsService: LogsService) {
    this.filter    = '';
    this.orderProp = 'name';
    this.reverse   = false;
  }

  ngOnInit() {
    this.logsService.findAll().subscribe(response => this.extractLoggers(response));
  }

  changeLevel(name: string, level: string) {
    this.logsService.changeLevel(name, level).subscribe(() => {
      this.logsService.findAll().subscribe(response => this.extractLoggers(response));
    });
  }

  private extractLoggers(response) {
    // @ts-ignore
    this.loggers = Object.entries(response.body.loggers).map(e => new Log(e[0], e[1].effectiveLevel));
  }


}
