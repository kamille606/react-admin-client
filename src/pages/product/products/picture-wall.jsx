import {forwardRef, useImperativeHandle, useState} from 'react'
import {message, Modal, Upload} from 'antd'
import {PlusOutlined} from '@ant-design/icons'

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })

const PictureWall = (props, ref) => {

  const [previewOpen, setPreviewOpen] = useState(false)
  const [previewImage, setPreviewImage] = useState('')
  const [previewTitle, setPreviewTitle] = useState('')
  const [fileList, setFileList] = useState([])

  useImperativeHandle(ref, () => ({
    getImageFiles: getImageFiles
  }))

  const getImageFiles = () => {
    return fileList.map(file => file.name)
  }
  const handleCancel = () => setPreviewOpen(false)
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj)
    }
    setPreviewImage(file.url || file.preview)
    setPreviewOpen(true)
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1))
  }
  const handleChange = ({file, fileList, event}) => {
    if (file.status === 'done') {
      const {response} = file
      if (response.success) {
        message.success('上传图片成功').then()
        const {url, name} = response.data
        file.url = url
        file.name = name
      } else {
        message.error(response.message).then()
        file.status = 'error'
      }
    }
    fileList[fileList.length - 1] = file
    setFileList(fileList)
  }

  const uploadButton = (
    <div>
      <PlusOutlined/>
      <div
        style={{
          marginTop: 8
        }}
      >
        Upload
      </div>
    </div>
  )

  return (
    <>
      <Upload
        action="/api/data/upload/picture"
        listType="picture-card"
        accept="image/*"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
      >
        {fileList.length >= 8 ? null : uploadButton}
      </Upload>
      <Modal
        open={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}>
        <img
          alt="example"
          style={{
            width: '100%'
          }}
          src={previewImage}
        />
      </Modal>
    </>
  )
}

export default forwardRef(PictureWall)