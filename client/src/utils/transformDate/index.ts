const transformDate = (date: string): string => {
  const dateObj = new Date(date)
  return dateObj.toLocaleDateString('pt-BR')
}

export default transformDate
