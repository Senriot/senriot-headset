import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {NzModalRef, NzMessageService} from 'ng-zorro-antd';
import {_HttpClient} from '@delon/theme';
import {SFSchema, SFUISchema} from '@delon/form';
import {IMenu} from "@shared/model/menu.model";
import {MenuService} from "../menu.service";

@Component({
  selector: 'app-system-menu-add-type',
  templateUrl: './add-type.component.html',
})
export class SystemMenuAddTypeComponent implements OnInit {
  @Input()
  record: IMenu = {};
  schema: SFSchema = {
    properties: {
      text: {type: 'string', title: '分类名称'},
      isGroup: {
        type: 'boolean', title: '分类名', ui: {
          checkedChildren: '显示',
          unCheckedChildren: '隐藏',
        },
      },
    },
    required: ['text'],
  };
  ui: SFUISchema = {
    '*': {
      spanLabelFixed: 100,
      grid: {span: 24},
    },
    $no: {
      widget: 'text'
    },
    $text: {
      widget: 'string',
      placeholder: '输入菜单分类的名称'
    },
  };

  constructor(
    private modal: NzModalRef,
    public menuService: MenuService
  ) {
  }

  ngOnInit(): void {
  }

  save(value: any) {
    this.menuService.create(value).subscribe(() => this.modal.destroy(true))
  }

  close() {
    this.modal.destroy();
  }
}
