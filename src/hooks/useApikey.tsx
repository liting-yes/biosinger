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

  const [open, setOpen] = useState(false)

  function ApikeyInputModal() {
    return (<Modal open={open} closable={false} destroyOnClose={true} keyboard={false} title={`请输入${localStorageKey}`} footer={ <Button type="primary" disabled={!apikey} onClick={() => setOpen(false)}>确认</Button>}>
      <Input.Password
        value={apikey}
        placeholder="在此输入对应的 api key"
        iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
        onChange={e => setApikey(e.target.value)}
      />
    </Modal>)
  }

  return { apikey, setApikey, ApikeyInputModal, open, setOpen }
}
