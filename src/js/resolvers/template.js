/**
 * Find which template is the choosen between a set of templates.
 *
 * @export
 * @param {Object[]} templates contains type and builder properties
 * @param {String} type the choosen property
 * @returns {Function} the builder property from the choosen template
 */
export default function resolveTemplate(templates, type) {
  return templates.reduce((previousTemplate, currentTemplate) => {
    if (currentTemplate.type === type) {
      return currentTemplate.builder;
    }
    return previousTemplate;
  }, templates[0].builder);
}
