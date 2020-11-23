import { useCallback, useEffect, useState } from 'react'
import { translateText } from './util'

type Props = {
  language: string
  skip?: boolean
}

type Result = {
  loading: boolean
  data: string | Array<string>
}

type LazyTranslateProps = [
  (param: string | Array<string>, target?: string) => Promise<void> | null,
  Result & {
    called: boolean
  }
]

export const useLazyTranslate = (props: Props): LazyTranslateProps => {
  const { language, skip } = props
  const [loading, setLoading] = useState(true)
  const [called, setCalled] = useState(false)
  const [data, setData] = useState<string | string[]>([])

  useEffect(() => {
    if (skip) {
      setCalled(true)
      setLoading(false)
    }
  }, [])

  return [
    useCallback((text: string | Array<string>, target?: string) => {
      if (skip) {
        return null
      }
      return translateText(text, target || language)
        .then((res) => {
          setData(res)
        })
        .finally(() => {
          setCalled(true)
          setLoading(false)
        })
    }, []),
    {
      called,
      loading,
      data
    }
  ]
}

export const useTranslate = (
  text: string | Array<string>,
  props: Props
): Result => {
  const [translate, { loading, data }] = useLazyTranslate(props)
  useEffect(() => {
    let mounted = true
    if (mounted) {
      translate(text)
    }
    return () => {
      mounted = false
    }
  }, [])
  return {
    loading,
    data
  }
}

export { getLanguages, setConfig } from './util'
