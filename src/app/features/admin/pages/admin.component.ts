import { Component } from '@angular/core';
import { MatAnchor,MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';


@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrl: './admin.component.scss',
    standalone: true,
    imports: [MatButton, RouterLink, MatIcon, MatAnchor]
})
export class AdminComponent {
}
