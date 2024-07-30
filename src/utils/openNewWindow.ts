const openNewWindow = (url: string, title: string) => {
  const windowName = `Payment for ${title}`
  const windowFeatures = 'width=800,height=800,scrollbars=yes,resizable=yes'
  window.open(url, windowName, windowFeatures)
}


export default openNewWindow