export abstract class Component<T extends HTMLElement, U extends HTMLElement> {
  hostElement: T;
  element: U;

  constructor(
    public hostId: string,
    public templateId: string,
    public insertAtStart: boolean,
    public newElementId?: string
  ) {
    this.hostElement = document.getElementById(this.hostId) as T;
    const templateElement = document.getElementById(
      this.templateId
    ) as HTMLTemplateElement;
    const elementFragment = document.importNode(templateElement.content, true);
    this.element = elementFragment.firstElementChild as U;

    if (newElementId) {
      this.element.id = newElementId;
    }

    this.attach();
  }

  private attach() {
    this.hostElement.insertAdjacentElement(
      this.insertAtStart ? 'afterbegin' : 'beforeend',
      this.element
    );
  }

  abstract configure(): void;
  abstract render(): void;
}
