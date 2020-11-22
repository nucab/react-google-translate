import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import { useLazyTranslate, getLanguages } from 'react-google-translate'
import { Form, FormGroup, Label, Input, Col, Row, Jumbotron } from 'reactstrap'
import { debounce } from 'lodash'

const App = () => {
  const [language, setLanguage] = useState('zh')
  const [languageOptions, setLanguageOptions] = useState<any>()

  const [translate, { called, data, loading }] = useLazyTranslate({
    language
  })
  const [searchedText, setSearchedText] = useState('example')
  if (!called) {
    translate(searchedText)
  }
  const debouncedSearch = debounce((value: string) => {
    setSearchedText(value)
  }, 500)
  useEffect(() => {
    translate(searchedText, language)
  }, [searchedText, translate, language])
  useEffect(() => {
    getLanguages().then((res) => setLanguageOptions(res))
  }, [])
  return (
    <div>
      <div className='container mt-5'>
        <Jumbotron>
          <FormGroup>
            <Label>Select the language to translate from:</Label>
            <Select
              className='basic-single mb-2'
              classNamePrefix='select'
              defaultValue={{ label: 'Chinese', value: 'zh-CN' } as any}
              isSearchable
              name='color'
              options={languageOptions}
              onChange={(param: any) => {
                setLanguage(param.value)
              }}
            />
          </FormGroup>
          <Form>
            <Row>
              <Col>
                <FormGroup>
                  <Label>From</Label>
                  <Input
                    placeholder={searchedText || 'Enter a text'}
                    onChange={(e) => debouncedSearch(e.target.value)}
                  />
                </FormGroup>
              </Col>
              <Col>
                <Label>To</Label>
                <Input
                  readOnly
                  value={
                    loading ? 'Loading...' : data || 'Please provide a text'
                  }
                  onChange={(e) => debouncedSearch(e.target.value)}
                />
              </Col>
            </Row>
          </Form>
        </Jumbotron>
      </div>
    </div>
  )
}

export default App
