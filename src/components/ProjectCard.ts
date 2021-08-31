import { Project } from '../StateStore/ProjectState.js';
import { Component } from './base/Component.js';
import { Draggable } from '../interfaces/DragDrop.js';
import { autobind } from '../decorators/autobind.js';

export class ProjectCard
  extends Component<HTMLUListElement, HTMLLIElement>
  implements Draggable
{
  project: Project;

  constructor(projectListId: string, project: Project) {
    super(projectListId, 'single-project', false);
    this.project = project;

    this.configure();
    this.render();
  }

  configure() {
    this.element.addEventListener('dragstart', this.dragStartHandler);
    this.element.addEventListener('dragend', this.dragEndHandler);
  }

  render() {
    this.element.querySelector('h2')!.textContent = this.project.title;
    this.element.querySelector('h3')!.textContent =
      this.project.nbOfPeople.toString();
    this.element.querySelector('p')!.textContent = this.project.description;
  }

  @autobind
  dragStartHandler(event: DragEvent) {
    event.dataTransfer!.setData('text/plain', this.project.id);
    event.dataTransfer!.effectAllowed = 'move';
  }

  dragEndHandler(_event: DragEvent) {}
}
