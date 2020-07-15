import { defineComponent, ref } from "@vue/runtime-dom";
import Logo from "@/components/Logo/Logo.component.vue";
import List from "@/components/List/List.component.vue";
import CookieService from '@/services/CookieService/CookieService.service';

export default defineComponent({
  name: "Navigation",
  components: {
    Logo,
    List,
  },
  setup() {
    const showMenu = ref(false);
    const data = {
      classList: "navbar-start",
      items: [
        {
          type: "link",
          classItem: "navbar-item",
          content: "",
          links: [
            {
              href: "/",
              classLink: "navbar-link is-arrowless",
              content: "Dashboard",
            },
          ],
        },
        {
          type: "dropdown",
          classItem: "navbar-link",
          content: "Operator",
          links: [
            {
              href: "/operator-list",
              classLink: "navbar-link is-arrowless",
              content: "List",
            },
            {
              href: "/operator-account",
              classLink: "navbar-link is-arrowless",
              content: "Account",
            },
          ],
        },
        {
          type: "dropdown",
          classItem: "navbar-link",
          content: "Product",
          links: [
            {
              href: "/product-list",
              classLink: "navbar-link is-arrowless",
              content: "List",
            },
          ],
        },
        {
          type: "dropdown",
          classItem: "navbar-link",
          content: "Blog",
          links: [
            {
              href: "/post-list",
              classLink: "navbar-link is-arrowless",
              content: "Posts",
            },
            {
              href: "/author-list",
              classLink: "navbar-link is-arrowless",
              content: "Authors",
            },
            {
              href: "/category-list",
              classLink: "navbar-link is-arrowless",
              content: "Category",
            },
          ],
        },
      ],
    };

    function logout() {
      CookieService.deleteToken();
      this.$router.push('login');
    }

    return {
      showMenu,
      data,
      logout
    };
  },
});
