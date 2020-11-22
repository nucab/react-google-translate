const { Translate } = require('@google-cloud/translate').v2

const config = {
  PROJECT_ID: process.env.GCP_PROJECT_ID
}

const translate = new Translate({
  credentials: {
    private_key: process.env.GCP_PRIVATE_KEY,
    client_email: process.env.GCP_CLIENT_EMAIL
  },
  projectId: config.PROJECT_ID
})

export const getSupportedLanguages = async () => {
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
    // generate the array which combines the original array and the translated text from google translate
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
