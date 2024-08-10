import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']  // Corrected from `styleUrl` to `styleUrls`
})
export class SidenavComponent {

  collapsed: boolean = true;
  @Input() navData: any[] = [];
  @Input() logoText: string;
  @Input() logoIcon: string;
  screenWidth = 0;

  toggleCollapse(): void {
    this.collapsed = !this.collapsed;
  }

  closeSidenav(): void {
    this.collapsed = false;
  }

  
  logout(): void {
    localStorage.removeItem('userId'); 
    localStorage.removeItem('accessToken'); 
    window.location.reload();   
  }        
}
