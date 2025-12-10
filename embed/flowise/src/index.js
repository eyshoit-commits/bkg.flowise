export function mountFlowiseChat(targetId) {
  const el = document.getElementById(targetId);
  if (!el) throw new Error('Target not found');
  const iframe = document.createElement('iframe');
  iframe.src = 'http://localhost:41800/chat';
  iframe.style.width = '100%';
  iframe.style.height = '600px';
  iframe.style.border = '1px solid #00f0ff';
  el.appendChild(iframe);
}
