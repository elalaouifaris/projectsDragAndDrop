import { Component } from './base/Component.js';
import {
  Project,
  ProjectState,
  ProjectStatus,
} from '../StateStore/ProjectState.js';
import { autobind } from '../decorators/autobind.js';
import { ProjectCard } from './ProjectCard.js';
import { DragTarget } from '../interfaces/DragDrop.js';

export class ProjectList
  extends Component<HTMLDivElement, HTMLElement>
  implements DragTarget
{
  heading: HTMLHeadingElement;
  projectList: HTMLUListElement;
  assignedProjects: Project[] = [];

  constructor(
    private type: 'active' | 'finished',
    private projecStateInstance: ProjectState
  ) {
    super('app', 'project-list', false, `${type}-projects`);
    this.heading = this.element.querySelector('h2') as HTMLHeadingElement;
    this.projectList = this.element.querySelector('ul') as HTMLUListElement;
    this.configure();

    this.heading.textContent = `${this.type.toUpperCase()} PROJECTS`;
    this.render();
  }

  configure() {
    this.element.addEventListener('dragover', this.dragOverHandler);
    this.element.addEventListener('dragleave', this.dragLeaveHandler);
    this.element.addEventListener('drop', this.dropHandler);

    this.projectList.id = `${this.type}-projects-list`;
    this.projecStateInstance.registerListner((projects: Project[]) => {
      this.assignedProjects = this.filterProjects(projects);
      this.render();
    });
  }

  render() {
    this.projectList.innerHTML = '';
    for (const project of this.assignedProjects) {
      new ProjectCard(this.projectList.id, project);
    }
  }

  private filterProjects(projects: Project[]): Project[] {
    return projects.filter((project) => {
      if (this.type === 'active') {
        return project.status === ProjectStatus.Active;
      } else {
        return project.status === ProjectStatus.Completed;
      }
    });
  }

  @autobind
  dragOverHandler(event: DragEvent): void {
    if (event.dataTransfer && event.dataTransfer.types[0] === 'text/plain') {
      event.preventDefault();
      this.projectList.classList.add('droppable');
    }
  }

  @autobind
  dropHandler(event: DragEvent): void {
    event.preventDefault();
    const projectid = event.dataTransfer!.getData('text/plain');
    const newStatus =
      this.type === 'active' ? ProjectStatus.Active : ProjectStatus.Completed;
    this.projecStateInstance.updateProjectStatus(projectid, newStatus);
    this.dragLeaveHandler(event);
  }

  @autobind
  dragLeaveHandler(event: DragEvent): void {
    this.projectList.classList.remove('droppable');
  }
}
