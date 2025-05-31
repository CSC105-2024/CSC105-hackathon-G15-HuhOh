import DashboardNavBar from '@/components/DashboardNavBar'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { toast } from 'sonner'
import { ArrowRightLeft, Copy, Loader2 } from 'lucide-react'
import api from '@/services/api'
import SlangCard from '@/components/SlangCard'
import { useDataContext } from '@/hooks/useDataContext'

const TranslationPage = () => {
  const [inputText, setInputText] = useState('')
  const [outputText, setOutputText] = useState('')
  const [isGenZToEnglish, setIsGenZToEnglish] = useState(true)
  const [isTranslating, setIsTranslating] = useState(false)
  const { trendSlangs } = useDataContext()

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
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-around gap-4 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col w-full lg:max-w-lg">
          <div className="flex justify-between items-center mb-4">
            <Label
              htmlFor="input"
              className="font-bold text-2xl sm:text-3xl lg:text-4xl"
            >
              {inputLabel}
            </Label>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleCopy(inputText, inputLabel)}
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
          <Textarea
            placeholder={inputPlaceholder}
            id="input"
            className="focus:ring-purple-200 min-h-[150px] sm:min-h-[180px] lg:min-h-[200px] mb-4"
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

        <div className="flex justify-center lg:block">
          <Button
            variant="outline"
            className="hover:bg-white transition-all duration-200 hover:scale-105"
            onClick={handleDirectionToggle}
            title={`Switch to ${isGenZToEnglish ? 'English → Gen Z' : 'Gen Z → English'} mode`}
          >
            <ArrowRightLeft />
          </Button>
        </div>

        <div className="flex flex-col w-full lg:max-w-lg">
          <div className="flex justify-between items-center mb-4">
            <Label
              htmlFor="input"
              className="font-bold text-2xl sm:text-3xl lg:text-4xl"
            >
              {outputLabel}
            </Label>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleCopy(outputText, outputLabel)}
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
          <Textarea
            placeholder={outputPlaceholder}
            id="output"
            className="focus:ring-purple-200 min-h-[150px] sm:min-h-[180px] lg:min-h-[200px] mb-4"
            value={outputText}
            onChange={(e) => setOutputText(e.target.value)}
            readOnly
          />
          <div className="flex gap-2 sm:gap-4 lg:justify-between">
            <Button className="flex-1 lg:w-20">Copy</Button>
            <Button className="flex-1 lg:w-20">Share</Button>
          </div>
        </div>
      </div>

      <div className="text-center m-4">
        <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
          Current mode:{' '}
          {isGenZToEnglish ? 'Gen Z → English' : 'English → Gen Z'}
        </span>
      </div>

      <div className="flex flex-col space-y-8 justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center">
          Slang Words of the day
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full max-w-6xl gap-4 sm:gap-6 lg:gap-8">
          {trendSlangs.map((slang) => (
            <SlangCard
              key={slang.id}
              term={slang.term}
              meaning={slang.meaning}
              example={slang.example}
            />
          ))}
        </div>
      </div>
    </>
  )
}

export default TranslationPage
