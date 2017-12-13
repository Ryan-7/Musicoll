import { AuthService } from './../services/auth.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService) { }


  signout() {
    this.authService.logout().subscribe((res) => {
      localStorage.clear();
      this.router.navigate(['/']);
      console.log("logged out")
    }, (err) => {
      console.log("could not log out")
    })

  }

  ngOnInit() {
  }

}
