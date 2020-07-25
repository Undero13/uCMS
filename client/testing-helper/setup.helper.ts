import { ComponentOptionsWithObjectProps } from "vue";

// eslint-disable-next-line no-param-reassign
const setupFix = (Component: ComponentOptionsWithObjectProps) => (Component.setup = jest.fn());
export default setupFix;
