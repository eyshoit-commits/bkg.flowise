export const initFlowiseWidget = (config) => {
  const iframe = document.createElement('iframe')
  iframe.src = `${config.baseUrl}/embed/${config.flowId}?hideBranding=true`
  iframe.style.width = '100%'
  iframe.style.height = config.height ?? '500px'
  iframe.style.border = '0'
  document.querySelector(config.mount ?? 'body')?.appendChild(iframe)
  return iframe
}
