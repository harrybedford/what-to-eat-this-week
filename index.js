const express = require('express')
const ingredients = require('./data')
const ingredient = require('./models')
const app = express()

const getIngredient = (category) => (month = new Date().getMonth()) => {
  const availableIngredients = []
  for (const ingredient of ingredients) {
    if (ingredient.category === category && ingredient.months.indexOf(month) >= 0) {
      availableIngredients.push(ingredient.name)
    }
  }
  if (availableIngredients.length) return availableIngredients
  return `Sorry there is no ${category} available this month`
}

const getMakeTheMostOf = (month = new Date().getMonth()) => {
  const makeTheMostOf = []
  for (const ingredient of ingredients) {
    if (ingredient.months.indexOf(month) >= 0) {
      if (ingredient.months.length <= 3) {
        makeTheMostOf.push(ingredient.name)
      }
    }
  }
  return makeTheMostOf
}

const getLastChanceFor = (month = new Date().getMonth()) => {
  const lastChanceFor = []
  for (const ingredient of ingredients) {
    if (ingredient.months[ingredient.months.length - 1] === month) {
      lastChanceFor.push(ingredient.name)
    }
  }
  return lastChanceFor
}

const getNewInSeason = (month = new Date().getMonth()) => {
  const newInSeason = []
  for (const ingredient of ingredients) {
    if (ingredient.months[0] === month) {
      newInSeason.push(ingredient.name)
    }
  }
  return newInSeason
}

const getComingIntoSeason = (month = new Date().getMonth()) => {
  const comingIntoSeason = []
  for (const ingredient of ingredients) {
    if (ingredient.shoulder.indexOf(month) >= 0) {
      comingIntoSeason.push(ingredient.name)
    }
  }
  return comingIntoSeason
}

const getMeats = getIngredient('meat')
const getFish = getIngredient('fish')
const getFruits = getIngredient('fruit')
const getVegetables = getIngredient('vegetable')
const getHerbs = getIngredient('herb')
const getSpices = getIngredient('spice')

const htmlResponse = `
  Meat: ${getMeats()}<br />
  Fish: ${getFish()}<br />
  Fruit: ${getFruits()}<br />
  Vegetables: ${getVegetables()}<br />
  Herbs: ${getHerbs()}<br />
  Spices: ${getSpices()}<br />
  Make the most of: ${getMakeTheMostOf()}<br />
  Last chance for: ${getLastChanceFor()}<br />
  New in season: ${getNewInSeason()}<br />
  Coming into season: ${getComingIntoSeason()}
`

const jsonResponse = {
  meat: getMeats(),
  fish: getFish(),
  fruit: getFruits(),
  vegetables: getVegetables(),
  herbs: getHerbs(),
  spices: getSpices(),
  makeTheMostOf: getMakeTheMostOf(),
  lastChanceFor: getLastChanceFor(),
  newInSeason: getNewInSeason(),
  comingIntoSeason: getComingIntoSeason(),
}

app.get('/', (req, res) => {
  res.send(jsonResponse)
})

app.listen(3000, () => console.log(`App running`))