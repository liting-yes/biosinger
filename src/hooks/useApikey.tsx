import { useLocalStorageState } from 'ahooks'
import { Button, Input, Modal } from 'antd'
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons'
import { useState } from 'react'

const prefix = 'biosinger_apikey_'

export function useApikey(name: string) {
  const localStorageKey = prefix + name
  const [apikey, setApikey] = useLocalStorageState<string | undefined>(localStorageKey, {
    defaultValue: '',
  })
  const [open, setOpen] = useState(!apikey)

  function ApikeyInputModal() {
    const [apikeyMeno, setApikeyMeno] = useState(apikey)
    const onOk = () => {
      setApikey(apikeyMeno)
      setOpen(false)
    }

    return (<Modal className="useApikey__inputModal" open={open} closable={false} destroyOnClose={true} keyboard={false} title={`请输入${localStorageKey}`} footer={ <Button type="primary" disabled={!apikeyMeno} onClick={onOk}>确认</Button>}>
      <Input.Password
        value={apikeyMeno}
        placeholder="在此输入对应的 api key"
        iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
        onChange={e => setApikeyMeno(e.target.value)}
        onPressEnter={apikeyMeno ? onOk : undefined }
      />
    </Modal>)
  }

  function ApikeyDisplay() {
    return <div className="useApikey__display flex flex-row gap-4">
      <Input.Password value={apikey}></Input.Password>
      <Button type="primary" onClick={() => setOpen(true)}>编辑</Button>
    </div>
  }

  return { apikey, setApikey, ApikeyInputModal, ApikeyDisplay, open, setOpen }
}
