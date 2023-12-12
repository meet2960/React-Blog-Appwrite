import React from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { Controller } from 'react-hook-form';
import { Form } from 'react-bootstrap';

export default function RTE({ name, control, label, defaultValue = '' }) {
  return (
    <React.Fragment>
      <div>
        {label && <Form.Label>{label}</Form.Label>}
        <Controller
          name={name || 'content'}
          control={control}
          render={({ field: { onChange } }) => (
            <Editor
              initialValue={defaultValue}
              init={{
                initialValue: defaultValue,
                branding: false,
                height: 500,
                menubar: true,
                plugins: [
                  'image',
                  'advlist',
                  'autolink',
                  'lists',
                  'link',
                  'image',
                  'charmap',
                  'preview',
                  'anchor',
                  'searchreplace',
                  'visualblocks',
                  'code',
                  'fullscreen',
                  'insertdatetime',
                  'media',
                  'table',
                  'code',
                  'help',
                  'wordcount',
                  'anchor'
                ],
                toolbar:
                  'undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help',
                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
              }}
              onEditorChange={onChange}
            />
          )}
        />
      </div>
    </React.Fragment>
  );
}
