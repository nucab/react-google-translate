import { useCallback, useEffect, useState } from 'react'
import { translateText, getSupportedLanguages } from './util'

type Props = {
  text: string | Array<string>
  language: string
}

type Result = {
  loading: boolean
  data: string | Array<string>
}

type LazyTranslateProps = [
  (param: string | Array<string>, target?: string) => Promise<void>,
  Result & {
    called: boolean
  }
]

export const useLazyTranslate = (
  props: Pick<Props, 'language'>
): LazyTranslateProps => {
  const { language } = props
  const [loading, setLoading] = useState(true)
  const [called, setCalled] = useState(false)
  const [data, setData] = useState<string | string[]>([])

  return [
    useCallback(
      (text: string | Array<string>, target?: string) =>
        translateText(text, target || language)
          .then((res) => {
            setData(res)
          })
          .finally(() => {
            setCalled(true)
            setLoading(false)
          }),
      []
    ),
    {
      called,
      loading,
      data
    }
  ]
}

export const useTranslate = (props: Props): Result => {
  const { text } = props
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

export const getLanguages = getSupportedLanguages
