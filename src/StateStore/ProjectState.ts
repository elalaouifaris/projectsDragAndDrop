export enum ProjectStatus {
  Active,
  Completed,
}

type Listner<T> = (items: T[]) => void;

export class Project {
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public nbOfPeople: number,
    public status: ProjectStatus
  ) {}
}

export class ProjectState {
  private projects: Project[] = [];
  private static instance: ProjectState;
  private listners: Listner<Project>[] = [];

  private constructor() {}

  static getInstance(): ProjectState {
    if (this.instance) {
      return this.instance;
    } else {
      this.instance = new ProjectState();
      return this.instance;
    }
  }

  addProject(title: string, description: string, nbOfPeople: number): void {
    const id: string = `${Date.now()}__${title}`;
    const newProject = new Project(
      id,
      title,
      description,
      nbOfPeople,
      ProjectStatus.Active
    );

    this.projects.push(newProject);
    this.updateListners();
    console.log('Project Added Successfully!!');
  }

  updateProjectStatus(projectId: string, newStatus: ProjectStatus) {
    const project = this.projects.find((project) => project.id === projectId);
    if (project && project.status !== newStatus) {
      project.status = newStatus;
      this.updateListners();
    }
  }

  registerListner(listnerFunction: Listner<Project>): void {
    this.listners.push(listnerFunction);
  }

  updateListners() {
    for (const fn of this.listners) {
      fn(this.projects.slice());
    }
  }
}
