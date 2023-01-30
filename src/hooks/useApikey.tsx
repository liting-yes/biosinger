import { useLocalStorageState } from 'ahooks'
import { Button, Input, Modal, Tooltip } from 'antd'
import { EyeInvisibleOutlined, EyeTwoTone, QuestionCircleOutlined } from '@ant-design/icons'
import { useState } from 'react'

const prefix = 'biosinger_apikey_'

export function useApikey(name: string) {
  const localStorageKey = prefix + name
  const [apikey, setApikey] = useLocalStorageState<string | undefined>(localStorageKey, {
    defaultValue: '',
  })
  const [open, setOpen] = useState(!apikey)

  interface Props {
    tooltip?: string
  }
  function ApikeyInputModal(props: Props) {
    const [apikeyMeno, setApikeyMeno] = useState(apikey)
    const onOk = () => {
      setApikey(apikeyMeno)
      setOpen(false)
    }

    const { tooltip } = props
    return (<Modal className="useApikey__inputModal" open={open} closable={false} destroyOnClose={true} keyboard={false}
      title={<span>请输入{localStorageKey}
     {tooltip
       ? (<Tooltip placement="right" color="gold" title={tooltip}>
          <QuestionCircleOutlined className="text-sm ml-1" />
        </Tooltip>)
       : null}
      </span>}
      footer={ <Button type="primary" disabled={!apikeyMeno} onClick={onOk}>确认</Button>}>
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
