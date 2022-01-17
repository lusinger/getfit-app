import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'getfit-user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.sass']
})
export class UserPanelComponent implements OnInit {

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    console.log('hello');
    this.auth.loadUser().subscribe({
      next: (response) => {
        console.log(response);
      },
    });
  }
}
