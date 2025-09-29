import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User, Post, Comment, UserResponse, PostResponse, CommentResponse } from './models/models';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly baseUrl = 'https://dummyjson.com';

  constructor(private http: HttpClient) { }

  /**
   * Busca un usuario por username
   * Usa el endpoint: /users/filter?key=username&value=username
   */
  searchUserByUsername(username: string): Observable<User | null> {
    const url = `${this.baseUrl}/users/filter?key=username&value=${username}`;
    return this.http.get<UserResponse>(url).pipe(
      map(response => {
        const users = response.users;
        return users.length > 0 ? users[0] : null;
      })
    );
  }

  /**
   * Obtiene los posts de un usuario específico
   * Usa el endpoint: /posts/user/{userId}
   */
  getUserPosts(userId: number): Observable<Post[]> {
    const url = `${this.baseUrl}/posts/user/${userId}`;
    return this.http.get<PostResponse>(url).pipe(
      map(response => response.posts)
    );
  }

  /**
   * Obtiene los comentarios de un post específico
   * Usa el endpoint: /comments/post/{postId}
   */
  getPostComments(postId: number): Observable<Comment[]> {
    const url = `${this.baseUrl}/comments/post/${postId}`;
    return this.http.get<CommentResponse>(url).pipe(
      map(response => response.comments)
    );
  }

  /**
   * Obtiene un usuario por ID (método auxiliar)
   */
  getUserById(userId: number): Observable<User> {
    const url = `${this.baseUrl}/users/${userId}`;
    return this.http.get<User>(url);
  }

  /**
   * Obtiene un post por ID (método auxiliar)
   */
  getPostById(postId: number): Observable<Post> {
    const url = `${this.baseUrl}/posts/${postId}`;
    return this.http.get<Post>(url);
  }

  /**
   * Obtiene una lista de usuarios para autocompletado
   * Limita a los primeros 30 usuarios para sugerencias
   */
  getUsersForAutocomplete(): Observable<User[]> {
    const url = `${this.baseUrl}/users?limit=30`;
    return this.http.get<UserResponse>(url).pipe(
      map(response => response.users)
    );
  }
}
