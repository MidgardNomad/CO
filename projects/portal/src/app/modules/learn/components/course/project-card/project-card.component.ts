import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from 'DAL';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss'],
})
export class ProjectCardComponent implements OnInit {
  project: Project;
  @Input() finished: Date | null;
  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.project = (this.route.snapshot.data['courseProject'] as Project[])[0];
  }

  navToProject() {
    this.router.navigate(['project', this.project.id], {
      relativeTo: this.route,
    });
  }
}
