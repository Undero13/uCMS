import { shallowMount } from "@vue/test-utils";
import setupFix from "@/../testing-helper/setup.helper";
import OperatorList from "./OperatorList.view.vue";

test("it can be mount", () => {
  const operatorList = {
    caption: "Operator List",
    headers: ["ID", "e-mail"],
    rows: { id: "test", login: "test@test.pl" },
  };

  const pageCount = 2;
  const showModal = false;
  const loading = false;
  const msg = "test";
  const component = setupFix(OperatorList);

  const wrapper = shallowMount(component, <{}>{
    data() {
      return { operatorList, pageCount, showModal, loading, msg };
    },
  });

  expect(wrapper).toBeInstanceOf(Object);
});
