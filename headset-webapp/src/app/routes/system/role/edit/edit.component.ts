import {Component, Input, OnInit} from '@angular/core';
import {NzMessageService, NzModalRef} from 'ng-zorro-antd';
import {Observable} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {IRole} from "@shared/model/role.model";
import {RoleService} from "../role.service";

@Component({
  selector: 'app-system-role-edit',
  templateUrl: './edit.component.html',
})
export class SystemRoleEditComponent implements OnInit {
  @Input()
  record: IRole;

  @Input()
  isEdit: boolean;

  loading$: Observable<boolean>;

  title = '新建角色';

  constructor(
    private modal: NzModalRef,
    public service: RoleService
  ) {
  }


  ngOnInit(): void {

    if (this.record.id) {
      this.title = `编辑 ${this.record.name} 信息`;
    }
  }

  save(value: any) {
    value.id = this.record.id;
    const o = this.record.id ? this.service.update(value) : this.service.create(value);
    o.subscribe(() => this.modal.destroy(true))
  }

  close() {
    this.modal.destroy();
  }
}
