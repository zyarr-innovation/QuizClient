import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuizService } from '../shared/quiz.service';

export interface PeriodicElement {
    name: string;
    score: number;
    timing: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
    { name: 'Hydrogen', score: 1.0079, timing: 1 },
    { name: 'Helium', score: 4.0026, timing: 2 },
    { name: 'Lithium', score: 6.941, timing: 3 },
    { name: 'Beryllium', score: 9.0122, timing: 4 },
    { name: 'Boron', score: 10.811, timing: 5 },
    { name: 'Carbon', score: 12.0107, timing: 6 },
    { name: 'Nitrogen', score: 14.0067, timing: 7 },
    { name: 'Oxygen', score: 15.9994, timing: 8 },
    { name: 'Fluorine', score: 18.9984, timing: 9 },
    { name: 'Neon', score: 20.1797, timing: 10 }
];

/**
 * @title Basic use of `<table mat-table>`
 */
@Component({
    selector: 'app-dashboard',
    styleUrls: ['./dashboard.component.css'],
    templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {

    displayedColumns: string[] = ['name', 'score', 'timing'];
    participantList = ELEMENT_DATA;

    constructor(private router: Router,
        private quizService: QuizService
    ) { }

    ngOnInit(): void {
        this.quizService.getParticipantList().subscribe(
            (data: any) => {
                this.participantList = data;
            }
        );
    }
}