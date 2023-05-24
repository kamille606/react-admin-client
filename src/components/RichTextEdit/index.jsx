import React, {forwardRef, useEffect, useImperativeHandle} from 'react'
import {convertToRaw, EditorState} from 'draft-js'
import ContentState from 'draft-js/lib/ContentState'
import {Editor} from 'react-draft-wysiwyg'
import draftToHtml from 'draftjs-to-html'
import htmlToDraft from 'html-to-draftjs'

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

const RichTextEdit = (props, ref) => {

  const [editorState, setEditorState] = React.useState(EditorState.createEmpty())

  useImperativeHandle(ref, () => ({
    getRichText
  }))

  useEffect(() => {
    const richText = props.richText
    if (richText) {
      setRichText(props.richText)
    }
  }, [props.richText])

  const getRichText = () => {
    const currentContent = editorState.getCurrentContent()
    return draftToHtml(convertToRaw(currentContent))
  }
  const setRichText = (html) => {
    const contentBlock = htmlToDraft(html)
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks)
      const editorState = EditorState.createWithContent(contentState)
      setEditorState(editorState)
    }
  }
  const onEditorStateChange = (editorState) => {
    setEditorState(editorState)
  }

  return (
    <div>
      <Editor
        editorState={editorState}
        editorStyle={{
          border: '1px solid slategrey',
          paddingLeft: '10px',
          lineHeight: '10px',
          minHeight: '200px'
        }}
        onEditorStateChange={onEditorStateChange}
      />
      <textarea
        disabled
        style={{width: '100%', height: '100px'}}
        value={getRichText()}
      />
    </div>
  )
}

export default forwardRef(RichTextEdit)