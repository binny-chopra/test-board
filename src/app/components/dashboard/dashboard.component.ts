import { Component, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { DashboardService } from '../../services/dashboard.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  public data: any;
  private destroy = new Subject<void>();

  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.dashboardService.getDashboardData().pipe(takeUntil(this.destroy)).subscribe((response) => {
      this.data = response;
      console.log(this.data)
    })
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }



}
