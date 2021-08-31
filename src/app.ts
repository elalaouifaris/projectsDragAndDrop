import { ProjectState } from './StateStore/ProjectState.js';
import { ProjectInputs } from './components/ProjectInputs.js';
import { ProjectList } from './components/ProjectList.js';

const projectStateInstance = ProjectState.getInstance();
new ProjectInputs(projectStateInstance);
new ProjectList('active', projectStateInstance);
new ProjectList('finished', projectStateInstance);
