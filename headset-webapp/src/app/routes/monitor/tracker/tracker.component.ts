import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { STColumn, STComponent }                   from '@delon/abc';
import { SFSchema }                                from '@delon/form';
import { TrackerService }                          from "@core/tracker/tracker.service";

@Component({
    selector   : 'app-monitor-tracker',
    templateUrl: './tracker.component.html',
})
export class MonitorTrackerComponent implements OnInit, OnDestroy
{

    activities: any[] = [];
    searchSchema: SFSchema = {
        properties: {
            no: {
                type : 'string',
                title: '编号',
            },
        },
    };
    @ViewChild('st', { static: false }) st: STComponent;
    columns: STColumn[] = [
        { title: '账号', index: 'userLogin' },
        { title: 'ip地址', index: 'ipAddress' },
        { title: '当前页', index: 'page' },
        { title: '时间', index: 'time', type: 'date' },
    ];

    constructor( private trackerService: TrackerService )
    {
    }

    showActivity( activity: any )
    {
        let existingActivity = false;
        for (let index = 0; index < this.activities.length; index++)
        {
            if ( this.activities[index].sessionId === activity.sessionId )
            {
                existingActivity = true;
                if ( activity.page === 'logout' )
                {
                    this.activities.splice(index, 1);
                }
                else
                {
                    this.activities[index] = activity;
                }
            }
        }
        if ( !existingActivity && activity.page !== 'logout' )
        {
            this.activities.push(activity);
        }
        console.log(this.activities);
        this.st.reload();
    }

    ngOnInit()
    {
        this.trackerService.subscribe();
        this.trackerService.receive().subscribe(activity =>
        {
            console.log(activity);
            this.showActivity(activity);
        });
    }

    ngOnDestroy()
    {
        this.trackerService.unsubscribe();
    }
}
