import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from './api.service';
import { User, Post, Comment } from './models/models';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserPostsComponent } from './user-posts/user-posts.component';
import { switchMap, of, catchError, debounceTime, distinctUntilChanged, filter, map, startWith } from 'rxjs';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [CommonModule, FormsModule, UserDetailComponent, UserPostsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Taller RxJS - Búsqueda de Perfil';

  // Datos del estado de la aplicación
  searchUsername = '';
  currentUser: User | null = null;
  userPosts: Post[] = [];
  postComments: { [postId: number]: Comment[] } = {};

  // Estados de carga y error
  isLoading = false;
  errorMessage = '';
  userNotFound = false;

  // Autocompletado
  searchSubject = new Subject<string>();
  suggestions: User[] = [];
  showSuggestions = false;
  allUsers: User[] = [];

  constructor(private apiService: ApiService) {
    this.initializeAutocomplete();
  }

  /**
   * Busca un usuario por username cuando se envía el formulario
   */
  onSearchUser() {
    if (!this.searchUsername.trim()) {
      this.errorMessage = 'Por favor ingresa un nombre de usuario';
      return;
    }

    this.resetState();
    this.isLoading = true;

    // Primero buscar el usuario
    this.apiService.searchUserByUsername(this.searchUsername.trim())
      .pipe(
        switchMap(user => {
          if (!user) {
            this.userNotFound = true;
            this.isLoading = false;
            return of(null);
          }

          this.currentUser = user;
          // Si encontramos usuario, buscar sus posts
          return this.apiService.getUserPosts(user.id);
        }),
        catchError(error => {
          this.errorMessage = 'Error al buscar el usuario. Intenta de nuevo.';
          this.isLoading = false;
          console.error('Error:', error);
          return of([]);
        })
      )
      .subscribe(posts => {
        if (posts) {
          this.userPosts = posts;
          // Para cada post, obtener sus comentarios
          this.loadCommentsForPosts(posts);
        }
        this.isLoading = false;
      });
  }

  /**
   * Carga los comentarios para todos los posts del usuario
   */
  private loadCommentsForPosts(posts: Post[]) {
    posts.forEach(post => {
      this.apiService.getPostComments(post.id)
        .pipe(
          catchError(error => {
            console.error(`Error loading comments for post ${post.id}:`, error);
            return of([]);
          })
        )
        .subscribe(comments => {
          this.postComments[post.id] = comments;
        });
    });
  }

  /**
   * Resetea el estado de la aplicación
   */
  private resetState() {
    this.currentUser = null;
    this.userPosts = [];
    this.postComments = {};
    this.errorMessage = '';
    this.userNotFound = false;
  }

  /**
   * Limpia la búsqueda y resetea todo
   */
  clearSearch() {
    this.searchUsername = '';
    this.resetState();
    this.hideSuggestions();
  }

  /**
   * Inicializa el sistema de autocompletado
   */
  private initializeAutocomplete() {
    // Cargar usuarios para autocompletado
    this.apiService.getUsersForAutocomplete()
      .pipe(
        catchError(error => {
          console.error('Error loading users for autocomplete:', error);
          return of([]);
        })
      )
      .subscribe(users => {
        this.allUsers = users;
      });

    // Configurar el observable de búsqueda con debounce
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      filter(term => term.length >= 2),
      map(term => this.filterUsers(term))
    ).subscribe(suggestions => {
      this.suggestions = suggestions;
      this.showSuggestions = suggestions.length > 0;
    });
  }

  /**
   * Filtra usuarios basado en el término de búsqueda
   */
  private filterUsers(term: string): User[] {
    const searchTerm = term.toLowerCase();
    return this.allUsers
      .filter(user =>
        user.username.toLowerCase().includes(searchTerm) ||
        user.firstName.toLowerCase().includes(searchTerm) ||
        user.lastName.toLowerCase().includes(searchTerm)
      )
      .slice(0, 5); // Limitar a 5 sugerencias
  }

  /**
   * Maneja el cambio en el input de búsqueda
   */
  onSearchInputChange() {
    if (this.searchUsername.length >= 2) {
      this.searchSubject.next(this.searchUsername);
    } else {
      this.hideSuggestions();
    }
  }

  /**
   * Selecciona una sugerencia del autocompletado
   */
  selectSuggestion(user: User) {
    this.searchUsername = user.username;
    this.hideSuggestions();
    this.onSearchUser();
  }

  /**
   * Oculta las sugerencias
   */
  hideSuggestions() {
    setTimeout(() => {
      this.showSuggestions = false;
    }, 200); // Delay para permitir clics en sugerencias
  }
}
