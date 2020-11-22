const { Translate } = require('@google-cloud/translate').v2

type Config = {
  privateKey: string
  clientEmail: string
  projectId: string
}

let translate: any

export const setConfig = async ({
  clientEmail,
  privateKey,
  projectId
}: Config) => {
  translate = new Translate({
    credentials: {
      private_key: privateKey,
      client_email: clientEmail
    },
    projectId: projectId
  })
}

export const getLanguages = async () => {
  try {
    const [list]: [
      Array<{
        code: string
        name: string
      }>
    ] = await translate.getLanguages()
    const options = list.map((item) => ({
      label: item.name,
      value: item.code
    }))
    return options
  } catch (error) {
    console.error('Error at detectLanguage --> ', `${error}`)
    return 0
  }
}

export const detectLanguage = async (text: string) => {
  try {
    const response = await translate.detect(text)
    return response[0].language
  } catch (error) {
    console.error('Error at detectLanguage --> ', `${error}`)
    return 0
  }
}

export const translateText = async (
  text: string | Array<string>,
  targetLanguage: string
) => {
  try {
    const [response] = await translate.translate(text, targetLanguage)
    let result: string | Array<string> = response
    // generate the array which combines the original array and the translated text
    if (Array.isArray(response)) {
      result = response.map((val: string, index) =>
        val !== '' ? val : text[index]
      )
    }
    return result
  } catch (error) {
    console.error('1 => Error at translatedText --> ', `${error}`)
    return ''
  }
}
