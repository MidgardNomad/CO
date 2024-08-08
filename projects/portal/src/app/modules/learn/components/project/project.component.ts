import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Project } from 'DAL';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
})
export class ProjectComponent implements OnInit {
  project: Project;
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.project = this.route.snapshot.data['project'];
  }
}
