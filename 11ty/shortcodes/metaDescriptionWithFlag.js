module.exports = function(preview, flag = {}) {
  const initialCap = function(text) {
    return `${text[0].toUpperCase()}${text.slice(1)}`;
  };

  if (flag && flag.level === 'avoid') {
    if (flag.text) {
      return `${initialCap(
        flag.level
      )}: ${flag.text.toLowerCase()}. ${initialCap(preview)}`;
    }
    return `${initialCap(flag.level)}: ${preview}`;
  }

  return initialCap(preview);
};
