import { Component, Input, OnInit }                        from '@angular/core';
import { NzMessageService, NzModalRef, UploadChangeParam } from 'ng-zorro-antd';
import { Track }                                           from "@shared/model/track-dto";
import { TrackService }                                    from "../track.service";

@Component({
    selector   : 'app-track-list-edit',
    templateUrl: './edit.component.html',
})
export class TrackEditComponent implements OnInit
{
    @Input()
    record: Track = {};
    i: Track;
    data = { output: 'json' };

    showUpload = true;

    fileList = [];

    constructor(
        private modal: NzModalRef,
        private msgSrv: NzMessageService,
        public trackService: TrackService,
    )
    {}

    ngOnInit(): void
    {
        if ( this.record.id )
            this.trackService.load(this.record.id).subscribe(value =>
            {
                this.i = value;
                this.fileList.push({
                    uid   : 1,
                    name  : value.fileInfo.fileName,
                    status: 'done',
                    url   : value.fileInfo.url
                });
                this.showUpload = false
            });
        else this.i = this.record
    }

    save( value: any )
    {
        if ( !this.i.fileInfo.url )
        {
            this.msgSrv.error("文件不能为空")
        }
        else if ( this.i.id )
        {
            this.trackService.update(this.i).subscribe(res => this.modal.destroy(true))
        }
        else
        {
            this.trackService.create(this.i).subscribe(res => this.modal.destroy(true))
        }
    }

    close()
    {
        this.modal.destroy();
    }

    uploadChange( e: UploadChangeParam )
    {
        console.log(e);
        if ( e.type === 'success' )
        {
            this.i.fileInfo = {};
            const src = e.file.response.src.split('/');
            this.i.fileInfo.fileName = src[src.length - 1];
            this.i.fileInfo.domain = e.file.response.domain;
            this.i.fileInfo.size = e.file.response.size;
            this.i.fileInfo.url = e.file.response.url;
            this.showUpload = false
        }

        if ( e.type === 'removed' )
        {
            this.i.fileInfo = {};
            this.showUpload = true
        }
    }


}
