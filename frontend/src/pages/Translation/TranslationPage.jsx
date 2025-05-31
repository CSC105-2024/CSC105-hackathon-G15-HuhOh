import DashboardNavBar from '@/components/DashboardNavBar'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { toast } from 'sonner'
import { ArrowRightLeft, CopyIcon } from 'lucide-react'
import api from '@/services/api'

const TranslationPage = () => {
  const [inputText, setInputText] = useState('')
  const [outputText, setOutputText] = useState('')
  const [isGenZToEnglish, setIsGenZToEnglish] = useState(true)

  const handleDirectionToggle = () => {
    setIsGenZToEnglish(!isGenZToEnglish)

    setInputText('')
    setOutputText('')
  }

  const handleCopy = (text, label) => {
    if (!text) {
      toast.warning(`Nothing to copy from ${label}`)
      return
    }
    navigator.clipboard
      .writeText(text)
      .then(() => {
        toast.success(`${label} copied to clipboard!`)
      })
      .catch((err) => {
        toast.error('Failed to copy text')
        console.error('Failed to copy text: ', err)
      })
  }

  const inputLabel = isGenZToEnglish ? 'Gen Z Mode' : 'Readable English Mode'
  const outputLabel = isGenZToEnglish ? 'Readable English Mode' : 'Gen Z Mode'
  const inputPlaceholder = isGenZToEnglish
    ? 'Type your slang here...'
    : 'Type your English text here...'
  const outputPlaceholder = isGenZToEnglish
    ? 'Translation will appear here...'
    : 'Slang translation will appear here...'

  const translateText = async (text) => {
    if (!inputText.trim()) {
      toast.warning('Please enter some text to translate')
      return
    }
    try {
      if (isGenZToEnglish) {
        const res = await api.post(`/translations/ZtoEN`, text)
        console.log(res.data)
      } else {
        const res = await api.post(`/translations/ENtoZ`, text)
        console.log(res.data)
      }
    } catch (error) {
      console.error('Translation error:', error)
      throw error
    }
  }

  const handleTranslate = async () => {
    try {
      const translation = await translateText(inputText)
      setOutputText(translation)
      toast.success('Translation completed!')
    } catch (e) {
      toast.error('Translation failed. Please try again.')
      console.error('Translation error:', e)
    }
  }

  return (
    <>
      <DashboardNavBar />
      <div className="flex items-center justify-around gap-4">
        <div className="flex flex-col w-full max-w-lg">
          <div className="flex justify-between items-center mb-2">
            <Label htmlFor="input">{inputLabel}</Label>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleCopy(inputText, inputLabel)}
            >
              <CopyIcon className="h-4 w-4" />
            </Button>
          </div>
          <Textarea
            placeholder={inputPlaceholder}
            id="input"
            className="focus:ring-purple-200 min-h-[200px] mb-4"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          <div className="flex justify-end">
            <Button className="w-20" onClick={() => handleTranslate(inputText)}>
              Translate
            </Button>
          </div>
        </div>

        <Button
          variant="outline"
          className="hover:bg-white transition-all duration-200 hover:scale-105"
          onClick={handleDirectionToggle}
          title={`Switch to ${isGenZToEnglish ? 'English → Gen Z' : 'Gen Z → English'} mode`}
        >
          <ArrowRightLeft />
        </Button>

        <div className="flex flex-col w-full max-w-lg">
          <div className="flex justify-between items-center mb-2">
            <Label htmlFor="output">{outputLabel}</Label>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleCopy(outputText, outputLabel)}
            >
              <CopyIcon className="h-4 w-4" />
            </Button>
          </div>
          <Textarea
            placeholder={outputPlaceholder}
            id="output"
            className="focus:ring-purple-200 min-h-[200px] mb-4"
            value={outputText}
            onChange={(e) => setOutputText(e.target.value)}
            readOnly
          />
          <div className="flex justify-end">
            <Button className="w-20" onClick={() => handleTranslate(inputText)}>
              Share
            </Button>
          </div>
        </div>
      </div>

      <div className="text-center mt-4">
        <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
          Current mode:{' '}
          {isGenZToEnglish ? 'Gen Z → English' : 'English → Gen Z'}
        </span>
      </div>
    </>
  )
}

export default TranslationPage
