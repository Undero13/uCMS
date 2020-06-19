export interface FormField {
  name: string;
  type:
    | "text"
    | "email"
    | "number"
    | "hidden"
    | "password"
    | "tel"
    | "checkbox"
    | "radio"
    | "textarea"
    | "select";
  label: string;
  placeholder?: string;
  class?: string;
  validators?: Function[];
}

export interface CustomTarger extends EventTarget {
  value: string;
  name: string;
}

export interface BlurEvent extends Event {
  target: CustomTarger;
}
