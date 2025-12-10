export function mountFlowiseChat(containerId, flowId, apiHost) {
  const container = document.getElementById(containerId);
  if (!container) throw new Error(`Container ${containerId} not found`);
  const iframe = document.createElement('iframe');
  iframe.src = `${apiHost}/embed/${flowId}`;
  iframe.style.border = '0';
  iframe.style.width = '100%';
  iframe.style.height = '100%';
  container.appendChild(iframe);
}
