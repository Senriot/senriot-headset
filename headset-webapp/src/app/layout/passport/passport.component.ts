import { Component }       from '@angular/core';
import { SettingsService } from '@delon/theme';

@Component( {
  selector: 'layout-passport',
  templateUrl: './passport.component.html',
  styleUrls: ['./passport.component.less'],
} )
export class LayoutPassportComponent
{

  constructor(public settingService: SettingsService)
  {
  }

  links = [
    {
      title: '帮助',
      href: '',
    },
    {
      title: '隐私',
      href: '',
    },
    {
      title: '条款',
      href: '',
    },
  ];
}
