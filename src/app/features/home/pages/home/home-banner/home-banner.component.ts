import { CommonModule, isPlatformBrowser } from '@angular/common';
import type { OnDestroy, OnInit } from '@angular/core';
import { Component, inject, PLATFORM_ID } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

interface GridCell {
  subject: string;
  code: string;
  colorClass: string;
  state: 'stable' | 'out' | 'in';
}

@Component({
  selector: 'app-home-banner',
  templateUrl: './home-banner.component.html',
  styleUrls: ['./home-banner.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule
  ],
})
export class HomeBannerComponent implements OnInit, OnDestroy {
  days = ['SEG', 'TER', 'QUA', 'QUI', 'SEX'];
  periods = [1, 2, 3, 4, 5];
  grid: GridCell[] = [];
  private intervalId: ReturnType<typeof setInterval> | undefined;

  private subjectsPool = [
    { code: 'MAT', name: 'Matemática', color: 'bg-blue-100 text-blue-700 border-blue-200' },
    { code: 'PORT', name: 'Português', color: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
    { code: 'HIST', name: 'História', color: 'bg-amber-100 text-amber-700 border-amber-200' },
    { code: 'GEO', name: 'Geografia', color: 'bg-purple-100 text-purple-700 border-purple-200' },
    { code: 'CIÊN', name: 'Ciências', color: 'bg-rose-100 text-rose-700 border-rose-200' },
    { code: 'ING', name: 'Inglês', color: 'bg-cyan-100 text-cyan-700 border-cyan-200' },
    { code: 'FIS', name: 'Física', color: 'bg-indigo-100 text-indigo-700 border-indigo-200' },
    { code: '---', name: 'Vago', color: 'bg-slate-100 text-slate-400 border-slate-200 border-dashed' }
  ];

  isLogged = false;
  private platformId = inject(PLATFORM_ID);

  ngOnInit(): void {
    this.initGrid();
    if (isPlatformBrowser(this.platformId)) {
      this.startSimulation();
    }
  }

  ngOnDestroy(): void {
    if (this.intervalId !== undefined) {
      clearInterval(this.intervalId);
    }
  }

  private initGrid(): void {
    this.grid = Array(25).fill(null).map(() => this.getRandomSubject('stable'));
  }

  private getRandomSubject(initialState: 'stable' | 'in'): GridCell {
    const random = this.subjectsPool[Math.floor(Math.random() * this.subjectsPool.length)];
    return {
      subject: random.name,
      code: random.code,
      colorClass: random.color,
      state: initialState
    };
  }

  private startSimulation(): void {
    this.intervalId = setInterval(() => {
      this.optimizeStep();
    }, 1500);
  }

  private optimizeStep(): void {
    const numberOfChanges = Math.floor(Math.random() * 3) + 3;
    const indicesToUpdate = new Set<number>();

    while (indicesToUpdate.size < numberOfChanges) {
      indicesToUpdate.add(Math.floor(Math.random() * 25));
    }

    indicesToUpdate.forEach(index => {
      this.grid[index].state = 'out';
    });

    setTimeout(() => {
      indicesToUpdate.forEach(index => {
        this.grid[index] = this.getRandomSubject('in');
      });
    }, 300);

    setTimeout(() => {
      indicesToUpdate.forEach(index => {
        this.grid[index].state = 'stable';
      });
    }, 1000);
  }
}