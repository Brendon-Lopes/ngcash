const transformCurrency = (value: string) => {
  const transformed = Number(value).toFixed(2)
  const transformDecimal = transformed.replace('.', ',')
  const transformThousand = transformDecimal.replace(
    /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g,
    '.'
  )
  return `R$ ${transformThousand}`
}

export default transformCurrency
