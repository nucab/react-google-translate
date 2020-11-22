const { Translate } = require('@google-cloud/translate').v2

const config = {
  PROJECT_ID: process.env.GCP_PROJECT_ID || '117306028325096704487'
}

const translate = new Translate({
  credentials: {
    private_key:
      process.env.GCP_PRIVATE_KEY ||
      '-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC/zzTIKzJu9GRL\nQiOVWT5EEzjeOGqnq8BZe5iaCdbwRLjYrJflEci6+HRu9lAE/N2RVKPyfEYLziJG\nsI4rVEbeKdbf2JZtmUon6V3N8olUJW8Uboh23S6kBWZFAN9Yly7e3pXE1g8/LZ1N\n7MTH/iuhH4slZ0PTARSbHv+sfzixCEHDwCU1OZSaYyofwUN+c70aN9QWwuv0pDvu\nvjD5p0R5SPC1KItpzW7WRG5N6EBPXIq7rJntJEVYOpcCpQBhQ49TfgXBvICktM50\nhxTbG+5joRKB2clc+9IQ6MLnPVNhYkLT+gaylATFODY4H89DsHdn3x5CNl8oUrmx\nPZGu1SJHAgMBAAECggEACkBE01SFdoBhdEWNofXYRmble0Z2Khwbb0IwiyE18FNh\nQMXrSoGVJY8t/INLDmkveyk+xBRUb88UmMUDgJH9DIEBDBlcOMagZoT/Xd3SJjOu\n2jTNpZ2FrdTg7rEpk/W6SIyKYiGzfVkEL/pNkZXQ8DncIEAtYh4aHCit2aLIxIcL\n91zahzXwryzbu2l9b3uTAqlkiBcz1F/9uXLy7Ta/hL8nMHBbmmWA8MaWRv4Ma2+f\n2cmh9XHYUtcH2wPmufj0Je3VrhoPPNolVhXnDtcm1yc5XCipL748g1rDHQOCGSlu\nG+eOwFnLCSwii6me69LoluAGxYF8Ehfa+0fXcP3AaQKBgQD/CUUL87lNI/7qarp6\npWOOGS4wPWmT+S/4HiIwRwFRKn42pOU4WY8/DVJQiggFdsUAq/9z/5dqh1nJoslq\nNIEsGhPz+LjyQq2AYcrWkGm2dMvLeKsxh5CH49KZsY0hPh8yujd38qBXLyZJLkXj\nSGL0EOu3Sqtj4s2IepQQnZf3UwKBgQDAiMTQNdyjs3qnS7iGZTMNRrxOK0cDHZmd\nTyjHMm60ycjvzlY+UvEDEwlD+RPVWrRKjpTLn9BGxIyA62Ma9Ic1ckNR6/xmrWu1\nQjW1I0kdYRE42laWonxEtUPAOIrEDn2DwrXdfXlGDawsaetW4x9jQtSd5DAdD8fR\n7Wgqjs8OvQKBgQDH5tMpGCORdHp18awzP/m1wsTyaOCdbL+NwsjXgIBmx2DgogVN\nUt219VIk8Nxys/KcoTR9DsT3ahoVszQevALXt6UWIUmOEnd+Xqin39AMhKXM2cuN\n6g1+hjNn5sSRXukDUPTzXskRLVLcH5oGGZH+bljkdXG7vGWP6UyvbWdVIwKBgHcN\nGwXUCFaBCHqh67vOn7652n5LbGGU0APhismBecr4avM9lz56cuT/xF7viUAIEit3\n9rHiZBseNfMRmfp08ZYuzUm+rhefbFZsVmFnLDKqbsfE2n3SgxzJKNeXHtcUTrBG\nmcYXbAHROoFMDWVwk1wBWw82pjmSJHC+aAbIv2fRAoGBAOKSPQHzlSeKkOhBMtuk\ni0i2nSF4VG7dPQZX8PRagMKGX7M3bSnMQEuP/eoa9r1w59M9bL6EG7axJ9HoNy3m\ngWgRohenAKoWvepp/Rcj76ZMF9YSj3RIUeg3ski7176y1bXKSYad9+nHJ9J60pWk\n+h/N4QEe4TPQNsmGrGJ/bxjh\n-----END PRIVATE KEY-----\n',
    client_email:
      process.env.GCP_CLIENT_EMAIL ||
      'translate-text@one-wallet-295915.iam.gserviceaccount.com'
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
