import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { IUserFinal } from '../interface/common.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit {
  public data?: IUserFinal[];
  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
    this.usersService.getUsers().subscribe(response => {
      this.data = response;
    })
  }
}
