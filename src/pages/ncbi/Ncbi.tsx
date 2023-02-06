import type { EInfo } from '../../api'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { message } from 'antd'
import { useStore } from 'jotai'
import { useState } from 'react'
import { useDeepCompareEffect } from 'ahooks'
import { callNcbiEutilsEinfo } from '../../api'
import { dbInfoAtom } from '../../stores/ncbi'

const sidebar: { key: string; path: string; label: string }[] = [
  {
    key: 'einfo',
    path: '/ncbi/einfo',
    label: 'EInfo',
  }, {
    key: 'esearch',
    path: '/ncbi/esearch',
    label: 'ESearch',
  },
]

function Ncbi() {
  const store = useStore()
  const [dbList, setDbList] = useState<string[]>([])
  if (!dbList.length) {
    callNcbiEutilsEinfo({ retmode: 'json' }).then((res) => {
      if (res.status !== 200)
        message.error(res.statusText)
      else
        setDbList(res.data.einforesult.dblist)
    })
  }
  useDeepCompareEffect(() => {
    if (!dbList.length)
      return
    store.set(dbInfoAtom, {})
    dbList.forEach((db) => {
      callNcbiEutilsEinfo({ db, retmode: 'json' }).then((res) => {
        if (res.status !== 200)
          message.error(`获取数据库【${db}】信息失败：${res.data.message}`)
        else
          store.set(dbInfoAtom, { ...store.get(dbInfoAtom), ...{ [db]: (res.data as EInfo).einforesult.dbinfo[0] } })
      })
    })
  }, [dbList])

  const location = useLocation()

  return (
    <div className="biosinger-ncbi mx-auto w-256 flex gap-8 py-28">
      <ul className="ncbi-sidebar sticky top-28 h-min w-32 list-none overflow-hidden rounded bg-[#ff9a9e] p-0 shadow">
        {sidebar.map((item) => {
          return <li className={ `h-8 transition-colors hover:bg-[#fad0c4] ${item.path === location.pathname ? 'bg-red-400' : ''}` } key={ item.key }><Link className="inline-block h-full w-full pl-4 leading-8 text-white no-underline" to={ item.path }>{item.label}</Link></li>
        })}
      </ul>
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  )
}

export default Ncbi
