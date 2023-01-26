# react-google-translate

> Useful hook for Google Translate API.

[![NPM](https://img.shields.io/npm/v/react-google-translate.svg)](https://www.npmjs.com/package/react-google-translate) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Demo

See [demo](https://react-google-translate.vercel.app/)

## Install

```bash
npm install --save react-google-translate @google-cloud/translate
```

## Environment variables

Generate your credentials and project id in Google Cloud Platform. Read through the [documentation](https://cloud.google.com/iam/docs/creating-managing-service-accounts) for setting a service account.

After you acquired your credentials and project id, add it to your environment variables.

```
GCP_PRIVATE_KEY=[private_key]
GCP_CLIENT_EMAIL=[client_email]
GCP_PROJECT_ID=[project_id]
```

## Setting up the config

In your index.js,

```tsx
import { setConfig } from 'react-google-translate'

setConfig({
  clientEmail: process.env.REACT_APP_GCP_CLIENT_EMAIL ?? '',
  privateKey: process.env.REACT_APP_GCP_PRIVATE_KEY ?? '',
  projectId: process.env.REACT_APP_GCP_PROJECT_ID ?? ''
})
```

## Usage

```tsx
import React, { useState, useEffect } from 'react'

import { useLazyTranslate } from 'react-google-translate'

const Example = () => {

  const [text] = useState('test');
  const [language] = useState('zh-CN');

  const [translate, { data, loading }] = useLazyTranslate({
    language
  })

  useEffect(() => {
    if (text) {
      translate(text, language);
    }
  }, [translate, text])

  render() {
    return (
      <div>{loading ? 'Loading...' : data}</div>
    )
  }
}
```

## Props

### `language`: string | string[]

Set the default language for the translation.

### `skip`: boolean

Skips the request if true.

## API

### `translate`: func

Calls the api to translate the given text and language.

### `loading`: boolean

Indicates that loading state.

### `data`: string | string[]

Translated text received from the hook.

### `called`: boolean

Indicates that hook has been triggered.

## License

MIT © [geminstall23](https://github.com/geminstall23)
