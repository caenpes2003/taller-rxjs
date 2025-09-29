import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Post, Comment } from '../models/models';

@Component({
  selector: 'app-user-posts',
  imports: [CommonModule],
  templateUrl: './user-posts.component.html',
  styleUrl: './user-posts.component.scss'
})
export class UserPostsComponent {
  @Input() posts: Post[] = [];
  @Input() postComments: { [postId: number]: Comment[] } = {};

  /**
   * Obtiene los comentarios de un post específico
   */
  getCommentsForPost(postId: number): Comment[] {
    return this.postComments[postId] || [];
  }

  /**
   * Calcula el total de reacciones (likes + dislikes) de un post
   */
  getTotalReactions(post: Post): number {
    return post.reactions.likes + post.reactions.dislikes;
  }

  /**
   * Calcula el porcentaje de likes respecto al total de reacciones
   */
  getLikesPercentage(post: Post): number {
    const total = this.getTotalReactions(post);
    return total > 0 ? Math.round((post.reactions.likes / total) * 100) : 0;
  }

  /**
   * Formatea números grandes (ej: 1000 -> 1K)
   */
  formatNumber(num: number): string {
    if (num >= 1000000) {
      return Math.floor(num / 1000000) + 'M';
    }
    if (num >= 1000) {
      return Math.floor(num / 1000) + 'K';
    }
    return num.toString();
  }

  /**
   * Determina si un post tiene muchas reacciones (para destacarlo)
   */
  isPopularPost(post: Post): boolean {
    return this.getTotalReactions(post) > 100;
  }
}
