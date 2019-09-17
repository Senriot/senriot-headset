import { Component, Input, OnInit } from '@angular/core';
import { NzModalRef, NzTreeNode }   from 'ng-zorro-antd';
import { SFSchemaEnumType }         from '@delon/form';
import { Observable }               from 'rxjs';
import { ArrayService }             from '@delon/util';
import { IUser }                    from "@core/user/user.model";
import { UserService }              from "@core/user/user.service";
import { RoleService }              from "../../role/role.service";
import { DatePipe }                 from "@angular/common";

@Component({
    selector   : 'app-system-user-edit',
    templateUrl: './edit.component.html',
})
export class SystemUserEditComponent implements OnInit
{
    @Input()
    record: IUser;

    roles$: Observable<SFSchemaEnumType[]>;
    dept$: Observable<NzTreeNode[]>;

    constructor(
        private modal: NzModalRef,
        public userSrv: UserService,
        private arrayService: ArrayService,
        private roleSrv: RoleService,
        private datePipe: DatePipe,
    )
    {
    }

    ngOnInit(): void
    {
        this.roles$ = this.roleSrv.loadAll()
        // this.roles$ = this.store.select(role).pipe(takeUntil(this.ngDestroy), map(value => value.map(role => ({
        //   label: role.name,
        //   value: role.id,
        // }))));
        // this.loading$ = this.userFacade.isSaving.pipe(takeUntil(this.ngDestroy));
        // this.roles$   = this.roleFacade.selectTree().pipe(takeUntil(this.ngDestroy));
        // this.dept$    = this.departmentFacade.treeNode().pipe(takeUntil(this.ngDestroy));
        // this.departmentFacade.total.pipe(first()).subscribe(value => value <= 0 ? this.departmentFacade.loadAll() : 0);
        // this.roleFacade.total.pipe(first()).subscribe(value => value <= 0 ? this.roleFacade.loadAll() : 0);
        // this.subscriptions.push(this.eventSrv.eventEmitter.subscribe((value: EventModel) => {
        //   if (value) this.modal.close();
        // }));
    }

    save( value: any )
    {
        if ( this.record.birthday )
        {
            this.record.birthday = this.datePipe.transform(this.record.birthday, 'yyyy-MM-dd')
        }
        const ac = this.record.id ? this.userSrv.update(this.record) : this.userSrv.create(this.record);
        ac.subscribe(() => this.modal.destroy(true));
    }

    close()
    {
        this.modal.destroy();
    }
}
