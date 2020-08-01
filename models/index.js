const ingredient = (
  name = '',
  category = '',
  subcategory = '',
  tags = [],
  bestMonths = [],
  shoulderMonths = [],
) => {
  return {
    name,
    category,
    subcategory,
    tags,
    bestMonths,
    shoulderMonths,
  }
}

module.exports = ingredient
