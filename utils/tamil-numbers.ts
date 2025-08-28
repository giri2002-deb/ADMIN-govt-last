export function numberToTamilWords(num: number): string {
  if (num === 0) return "பூஜ்யம்"

  const ones = ["", "ஒன்று", "இரண்டு", "மூன்று", "நான்கு", "ஐந்து", "ஆறு", "ஏழு", "எட்டு", "ஒன்பது"]
  const tens = ["", "", "இருபது", "முப்பது", "நாற்பது", "ஐம்பது", "அறுபது", "எழுபது", "எண்பது", "தொண்ணூறு"]
  const teens = [
    "பத்து",
    "பதினொன்று",
    "பன்னிரண்டு",
    "பதின்மூன்று",
    "பதினான்கு",
    "பதினைந்து",
    "பதினாறு",
    "பதினேழு",
    "பதினெட்டு",
    "பத்தொன்பது",
  ]

  function convertHundreds(n: number): string {
    let result: string[] = []

    if (n >= 100) {
      const hundreds = Math.floor(n / 100)
      if (hundreds === 1) {
        result.push("நூறு")
      } else {
        result.push(ones[hundreds] + " நூறு")
      }
      n %= 100
    }

    if (n >= 20) {
      const tensDigit = Math.floor(n / 10)
      result.push(tens[tensDigit])
      n %= 10
    } else if (n >= 10) {
      result.push(teens[n - 10])
      n = 0
    }

    if (n > 0) {
      result.push(ones[n])
    }

    return result.join(" ").trim()
  }

  if (num < 1000) {
    return convertHundreds(num)
  }

  let result: string[] = []

  if (num >= 10000000) {
    const crores = Math.floor(num / 10000000)
    result.push(convertHundreds(crores) + " கோடி")
    num %= 10000000
  }

  if (num >= 100000) {
    const lakhs = Math.floor(num / 100000)
    result.push(convertHundreds(lakhs) + " இலட்சம்")
    num %= 100000
  }

  if (num >= 1000) {
    const thousands = Math.floor(num / 1000)
    result.push(convertHundreds(thousands) + " ஆயிரம்")
    num %= 1000
  }

  if (num > 0) {
    result.push(convertHundreds(num))
  }

  return result.join(" ").trim()
}

// Convert number with paise handling
export function numberToTamilCurrency(amount: number): string {
  const rupees = Math.floor(amount)
  const paise = Math.round((amount - rupees) * 100)

  let tamilWords = `ரூபாய் ${numberToTamilWords(rupees)}`

  if (paise > 0) {
    tamilWords += ` மற்றும் ${numberToTamilWords(paise)} பைசா`
  }

  return tamilWords + " மட்டும்"
}

// Helper
export function getAmountInTamilWords(amount: number): string {
  return numberToTamilCurrency(amount)
}
