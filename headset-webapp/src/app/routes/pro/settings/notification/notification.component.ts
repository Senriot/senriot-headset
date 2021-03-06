import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NzMessageService }                   from 'ng-zorro-antd';

@Component({
  selector       : 'app-account-settings-notification',
  templateUrl    : './notification.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProAccountSettingsNotificationComponent {
  i: any = {
    password: true,
    messages: true,
    todo    : true,
  };

  constructor(public msg: NzMessageService) {
  }
}
