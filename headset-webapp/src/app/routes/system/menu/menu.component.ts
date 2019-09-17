import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {MenuService, ModalHelper}                        from '@delon/theme';
import {STData}                                          from '@delon/abc';
import {SFSchema, SFUISchema}                            from '@delon/form';
import {Observable}                                      from 'rxjs';
import { log, NzTableComponent, NzTreeNode }             from 'ng-zorro-antd';
import {takeUntil}                                       from 'rxjs/operators';
import {ArrayService, deepCopy}                          from '@delon/util';
import {SystemMenuEditComponent}                         from './edit/edit.component';
import {IMenu, Menu}                                     from "@shared/model/menu.model";
import {MenuService as MenuSrv}                          from "./menu.service";
import {SystemMenuAddTypeComponent}                      from "./add-type/add-type.component";
import {SystemMenuAddComponent}                          from "./add/add.component";

@Component({
    selector: 'app-system-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.less'],
})
export class SystemMenuComponent implements OnInit {
    selectedRows: STData[] = [];
    record: Menu = new Menu();
    treeNodes: NzTreeNode[] = [];

    menuArray: Menu[];

    selected: Menu;

    schema: SFSchema = {
        properties: {
            text: {type: 'string', title: '名称', maxLength: 15},
            menuType: {
                type: 'string', title: '类型',
                enum: [
                    {label: '菜单', value: 1},
                    {label: '按钮', value: 2},
                ],
                ui: {
                    widget: 'select',
                },
            },
            link: {type: 'string', title: '路由'},
            icon: {type: 'string', title: '图标'},
            group: {type: 'boolean', title: '显示分组名', ui: {grid: {span: 6}}},
            hide: {type: 'boolean', title: '隐藏菜单', ui: {grid: {span: 6}}},
            hideInBreadcrumb: {type: 'boolean', title: '隐藏面包屑', ui: {grid: {span: 6}}},
            disabled: {type: 'boolean', title: '禁用', ui: {grid: {span: 6}}},
            externalLink: {type: 'string', title: '外部链接'},
            sortNo: {type: 'number', title: '排序'},
            remark: {type: 'string', title: '描述', maxLength: 140},
        },
        required: ['text', 'menuType'],
    };
    ui: SFUISchema = {
        '*': {
            spanLabelFixed: 100,
            grid: {span: 12},
        },
        $remark: {
            widget: 'textarea',
            grid: {span: 12},
        },
    };
    expandedKeys = [];

    @ViewChild('table', {static: true}) table: NzTableComponent;
    searchSchema: SFSchema = {
        properties: {
            text: {
                type: 'string',
                title: '名称',
                ui: {placeholder: '按名称搜索'}
            },
        },
    };

    constructor(private arraySrv: ArrayService,
                private menuSrv: MenuSrv,
                private menuService: MenuService,
                private modal: ModalHelper) {
    }

    ngOnInit() {

        // this.menuSrv.loadAll({sort: 'sortOrder,asc'}).subscribe(value => {
        //   if (value && value.length > 0) {
        //     this.menuArray = this.arraySrv.arrToTree(value)
        //   }
        // })
        this.reload()

        // this.store.select(menu).pipe(takeUntil(this.ngDestroy)).subscribe(value => {
        //   if (value && value.length > 0) {
        //     this.expandedKeys = [];
        //     this.arraySrv.visitTree(this.treeNodes, (item: NzTreeNode) => {
        //       if (item.isExpanded)
        //         this.expandedKeys.push(item.key);
        //     });
        //     this.treeNodes = this.arraySrv.arrToTreeNode(deepCopy(value), {
        //       titleMapName: 'text',
        //     });
        //     this.arraySrv.visitTree(this.treeNodes, (item: NzTreeNode) => {
        //       item.isExpanded = this.expandedKeys.includes(item.key);
        //     });
        //   }
        // });
    }

    // private tree(value) {
    //   this.expandedKeys = [];
    //   this.arraySrv.visitTree(this.treeNodes, (item: NzTreeNode) => {
    //     if (item.isExpanded)
    //       this.expandedKeys.push(item.key);
    //   });
    //   this.treeNodes = this.arraySrv.arrToTreeNode(deepCopy(value), {
    //     titleMapName: 'text',
    //   })[1].children;
    //   this.arraySrv.visitTree(this.treeNodes, (item: NzTreeNode) => {
    //     item.isExpanded = this.expandedKeys.includes(item.key);
    //   });
    // }

    addType() {
        const record = new Menu();
        record.isGroup = true;
        this.modal
            .createStatic(SystemMenuAddTypeComponent, {record}, {size: "md"})
            .subscribe(() => this.reload());
    }

    expandChange(e: boolean, menu) {
        if (!e) {
            this.arraySrv.visitTree(menu.children, (item: NzTreeNode) => {
                item.isExpanded = e;
            });
        }
    }

    edit(i) {
        const menu: IMenu = i.origin;
        this.modal.createStatic(SystemMenuEditComponent, {record: menu}).subscribe(() => this.reload());
    }


    delete(origin: any) {
        this.menuSrv.delete(origin.id).subscribe(() => this.reload())
    }

    onSearch(e) {
        console.log(e);
        this.menuSrv.loadAll(e).subscribe(value => {
            if (value && value.length > 0) {
                // this.tree(value);
            }
        })
    }

    reload() {
        this.menuSrv.loadAll({sort: ["createdDate", 'sortOrder']}).subscribe(value => {
            if (value && value.length > 0) {
                this.menuArray = this.arraySrv.arrToTree(value);
                if (this.selected) {
                    this.menuArray.forEach((i: any) => {
                        if (i.id === this.selected.id) {
                            i.selected = true;
                            this.to(i)
                        } else i.selected = false;
                    });
                } else {
                    this.menuArray[0].selected = true;
                    this.selected = this.menuArray[0];
                    this.to(this.menuArray[0])
                }
                console.log(this.menuArray)
            }
        })
    }

    to(m) {
        this.selected = m;
        const c = this.arraySrv.treeToArr(m.children);
        m.children.forEach(value => {
            if (value.parentId === m.id) {
                value.parentId = null
            }
        });
        this.treeNodes = this.arraySrv.arrToTreeNode(c, {titleMapName: 'text', expandedMapname: 'id'});
    }

    addRoot() {
        const record = new Menu();
        record.parentId = this.selected.id;
        this.modal.createStatic(SystemMenuEditComponent, {record}).subscribe(() => this.reload());
    }

    delType() {
        this.menuSrv.delete(this.selected.id).subscribe(() => {
            this.selected = null;
            return this.reload();
        })
    }

    addChildren(menu) {
        const record = new Menu();
        record.parentId = menu.key;
        console.log(record);
        this.modal.createStatic(SystemMenuEditComponent, {record}).subscribe(() => this.reload());
    }
}
