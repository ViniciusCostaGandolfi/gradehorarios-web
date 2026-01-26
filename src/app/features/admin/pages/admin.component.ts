import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatButton, MatAnchor } from '@angular/material/button';


@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrl: './admin.component.scss',
    standalone: true,
    imports: [MatButton, RouterLink, MatIcon, MatAnchor]
})
export class AdminComponent {
}
