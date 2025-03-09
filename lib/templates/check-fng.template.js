export function checkFnGTemplate(data) {
  return `*${data.name}*
  ${data.data.map((item) => `_Classify: ${item.value_classification} - value: ${item.value}_`).join('\n\n')}`;
}
