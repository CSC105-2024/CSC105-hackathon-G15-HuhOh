import DashboardNavBar from '@/components/DashboardNavBar'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { toast } from 'sonner'
import { ArrowRightLeft, CopyIcon, Loader2 } from 'lucide-react'
import api from '@/services/api'

const TranslationPage = () => {
  const [inputText, setInputText] = useState('')
  const [outputText, setOutputText] = useState('')
  const [isGenZToEnglish, setIsGenZToEnglish] = useState(true)
  const [isTranslating, setIsTranslating] = useState(false)

  const word = 'Cap'

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

  const translateText = async () => {
    if (!inputText.trim()) {
      toast.warning('Please enter some text to translate')
      return
    }
    setIsTranslating(true)

    const formData = new FormData()
    formData.append('input', inputText)

    try {
      const endpoint = isGenZToEnglish
        ? '/translations/ZtoEN'
        : '/translations/ENtoZ'

      const translationPromise = api
        .post(endpoint, formData)
        .then((response) => {
          return response.data.translated
        })

      toast.promise(translationPromise, {
        loading: 'Translating...',
        success: (translatedText) => {
          setOutputText(translatedText)
          setIsTranslating(false)
          return 'Translation completed!'
        },
        error: (error) => {
          console.error('Translation error:', error)
          setIsTranslating(false)
          return 'Translation failed. Please try again.'
        },
      })
    } catch (error) {
      console.error('Translation error:', error)
      throw error
    }
  }

  const handleTranslate = async () => {
    try {
      await translateText()
    } catch (e) {
      console.error('Translation error:', e)
    }
  }
  // TODO: add share btn with shadcn
  // const handleShare = async () => {
  //   try {
  //   } catch (e) {
  //     toast.error('Share failed. Please try again.')
  //     console.error('Share error:', e)
  //   }
  // }

  return (
    <>
      <DashboardNavBar />
      <div className="flex items-center justify-around gap-4">
        <div className="flex flex-col w-full max-w-lg">
          <div className="flex justify-between items-center mb-4">
            <Label htmlFor="input" className="font-bold text-4xl">
              {inputLabel}
            </Label>
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
            <Button disabled={isTranslating} onClick={handleTranslate}>
              {isTranslating && <Loader2 className="w-4 h-4 animate-spin" />}
              {isTranslating ? 'Translating...' : 'Translate'}
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
          <div className="flex justify-between items-center mb-4">
            <Label htmlFor="input" className="font-bold text-4xl">
              {outputLabel}
            </Label>
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
          <div className="flex justify-between">
            <Button className="w-20">Copy</Button>
            <Button className="w-20">Share</Button>
          </div>
        </div>
      </div>

      <div className="text-center m-4">
        <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
          Current mode:{' '}
          {isGenZToEnglish ? 'Gen Z → English' : 'English → Gen Z'}
        </span>
      </div>

      <div className="flex flex-col space-y-6 justify-center items-center">
        <h2 className="text-4xl">Slang Word of the day is</h2>
        <div className="p-6 rounded-3xl bg-gray-100">
          <p className="text-6xl font-extrabold">{word}</p>
        </div>
      </div>
    </>
  )
}

export default TranslationPage
