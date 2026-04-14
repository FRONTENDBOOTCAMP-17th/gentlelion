const templateCache = {};

export async function loadTemplate(path) {
  if (!templateCache[path]) {
    const response = await fetch(path);
    if (!response.ok) throw new Error(`템플릿 로드 실패: ${path}`);
    templateCache[path] = await response.text();
  }

  const parser = new DOMParser();
  const doc = parser.parseFromString(templateCache[path], "text/html");
  return doc.body.firstElementChild.cloneNode(true);
}
