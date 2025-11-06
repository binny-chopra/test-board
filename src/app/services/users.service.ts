import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, map, Observable, shareReplay } from 'rxjs';
import { IPost, IUser, IUserFinal } from '../components/interface/common.interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private BASE_URL = 'https://jsonplaceholder.typicode.com'
  private cache?: Observable<IUserFinal[]>;
  constructor(private http: HttpClient) { }

  getUsers(): Observable<IUserFinal[]> {
    if (!this.cache) {
      const allUsers = this.http.get<IUser[]>(`${this.BASE_URL}/users`)
      const allPosts = this.http.get<IPost[]>(`${this.BASE_URL}/posts`)
      this.cache = forkJoin({ allUsers, allPosts }).pipe(map(({ allUsers, allPosts }) => {
        const userFinal: IUserFinal[] = allUsers.map(user => ({
          id: user.id,
          username: user.username,
          email: user.email,
          company: user.company.name,
          postCount: allPosts.filter(post => post.userId === user.id).length
        }));
        return userFinal
      }), shareReplay(1));
    } else {
      console.log('Using cached observable');
    }
    return this.cache;
  }
}
