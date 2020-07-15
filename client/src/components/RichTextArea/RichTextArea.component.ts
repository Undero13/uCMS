import { defineComponent, onMounted } from "@vue/runtime-dom";

declare let tinymce: any;

export default defineComponent({
  name: "RichTextArea",
  setup() {
    onMounted(() => {
      tinymce.init({
        selector: '#richTextArea',
        plugins: 'a11ychecker advcode casechange formatpainter linkchecker autolink lists checklist media mediaembed pageembed permanentpen powerpaste table advtable tinycomments tinymcespellchecker',
        toolbar: 'a11ycheck addcomment showcomments casechange checklist code formatpainter pageembed permanentpen table',
        toolbar_mode: 'floating',
        tinycomments_mode: 'embedded',
        tinycomments_author: 'Author name',
      });
    });
  }
});
