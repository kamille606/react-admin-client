import React, {forwardRef, useEffect, useImperativeHandle, useState} from 'react'
import {Form, Input, Tree} from 'antd'

import {menuItems} from '../../config/menuConfig'

const AuthForm = (props, ref) => {

  const {roleName, menus} = props.role
  const [checkedKeys, setCheckedKeys] = useState([])

  useImperativeHandle(ref, () => ({
    getMenus: () => checkedKeys
  }))
  useEffect(() => {
    setCheckedKeys(menus.split(','))
  }, [menus])

  const getTreeNode = (menuItems) => {
    return menuItems.reduce((pre, item) => {
      pre.push({
        key: item.key,
        title: item.label,
        children: item.children ? getTreeNode(item.children) : null
      })
      return pre
    }, [])
  }
  const onCheck = (checkedKeys) => {
    setCheckedKeys(checkedKeys)
  }

  return (
    <>
      <Form.Item
        label="角色名称">
        <Input value={roleName} disabled/>
      </Form.Item>

      <Tree
        checkable
        defaultExpandAll={true}
        checkedKeys={checkedKeys}
        onCheck={onCheck}
        treeData={getTreeNode(menuItems)}
      />
    </>
  )
}

export default forwardRef(AuthForm)