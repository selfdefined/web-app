function renderNoFlag(data) {
  const noFlagLevels = ['tool', 'better-alternative'];
  if (
    !data.defined ||
    !data.flag ||
    (data.flag && !data.flag.text) ||
    (data.flag && noFlagLevels.includes(data.flag.level))
  ) {
    return true;
  }

  return false;
}

module.exports = function(definitionData) {
  if (renderNoFlag(definitionData)) return '';

  const modifier = new Map([
    ['warning', 'yellow'],
    ['avoid', 'red']
  ]).get(definitionData.flag.level);

  return `<span class="flag flag--${modifier}">${definitionData.flag.text}</span>`;
};
