import { shallowMount } from "@vue/test-utils";
import OperatorList from "./OperatorList.view.vue";

const originalWarn = console.warn.bind(console.warn);
beforeAll(() => (console.warn = (msg: string) => !msg.toString().includes(" ") && originalWarn(msg)));
afterAll(() => (console.warn = originalWarn));

test("it can be mount", () => {
  const operatorList = {
    caption: "Operator List",
    headers: ["ID", "e-mail"],
    rows: { id: "test", login: "test@test.pl" },
  };

  const pageCount = 2;
  const showModal = false;
  const loading = false;
  const msg = 'test';

  const wrapper = shallowMount(OperatorList, <{}>{
    data() {
      return { operatorList, pageCount, showModal, loading, msg };
    },
  });
  expect(wrapper).toBeInstanceOf(Object);
});
