import { Component } from './base/Component.js';
import { autobind } from '../decorators/autobind.js';
import {
  ValidatableString,
  ValidatableNumber,
  validate,
} from '../utils/validation.js';
import { ProjectState } from '../StateStore/ProjectState.js';

type ValidatedInput = {
  isValid: boolean;
  type: 'string' | 'number';
  value: string | number;
};

export class ProjectInputs extends Component<HTMLDivElement, HTMLFormElement> {
  constructor(private projectStateInstance: ProjectState) {
    super('app', 'project-input', true, 'user-input');
    this.configure();
  }

  configure() {
    this.element.addEventListener('submit', this.submitHandler);
  }

  render() {}

  @autobind
  private submitHandler(event: Event): void {
    event.preventDefault();
    console.log('SUBMIT');
    const projectData = this.gatherUserInputs();
    if (projectData) {
      const [title, description, people] = projectData;
      this.projectStateInstance.addProject(title, description, people);
      console.log(title, description, people);
    }
  }

  private gatherUserInputs(): [string, string, number] | void {
    const titleData = this.gatherSingleInput('title', {
      type: 'string',
      required: true,
      maxLength: 20,
    });
    const descriptionData = this.gatherSingleInput('description', {
      type: 'string',
      required: true,
      minLength: 5,
    });
    const peopleData = this.gatherSingleInput('people', {
      type: 'number',
      required: true,
      min: 1,
      max: 5,
    });

    if (titleData.isValid && descriptionData.isValid && peopleData.isValid) {
      return [titleData.value, descriptionData.value, peopleData.value];
    } else {
      alert('Invalid input, please try again!');
      return;
    }
  }

  private gatherSingleInput(
    inputId: string,
    validationConfig: ValidatableString
  ): {
    isValid: boolean;
    type: 'string';
    value: string;
  };
  private gatherSingleInput(
    inputId: string,
    validationConfig: ValidatableNumber
  ): {
    isValid: boolean;
    type: 'number';
    value: number;
  };
  private gatherSingleInput(
    inputId: string,
    validationConfig: ValidatableString | ValidatableNumber
  ): ValidatedInput {
    const inputElement = document.getElementById(inputId) as HTMLInputElement;

    const inputValue = inputElement.value;
    const isValid = validate(inputValue, validationConfig);

    inputElement.value = '';
    return { isValid: isValid, type: validationConfig.type, value: inputValue };
  }
}
