import { Editor } from '@tinymce/tinymce-react';

export default function TextEditor() {
  return (
    <Editor
      id='storyContent'
      apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
      init={{
          selector: 'textarea',
          skin_url: '/skins/ui/CUSTOM',
          plugins: 'wordcount table', 
          placeholder: 'Einu sinni var...',
          skin: 'content',
          // content_css: 'content',  
          height: 500,
          menubar: false,
          toolbar: 'undo redo bold italic underline indent outdent styleselect',
      }}
    />
  )
}
