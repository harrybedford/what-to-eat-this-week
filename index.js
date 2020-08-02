const express = require('express')
const ingredients = require('./data')
const app = express()

const getMakeTheMostOf = (availableIngredients = []) => {
  const makeTheMostOf = []
  for (const ingredient of availableIngredients) {
    if (ingredient.months.length <= 3) {
      makeTheMostOf.push(ingredient.name)
    }
  }
  return makeTheMostOf
}

const getLastChanceFor = (availableIngredients = [], month) => {
  const lastChanceFor = []
  for (const ingredient of availableIngredients) {
    if (ingredient.months[ingredient.months.length - 1] === month) {
      lastChanceFor.push(ingredient.name)
    }
  }
  return lastChanceFor
}

const getNewInSeason = (availableIngredients = [], month) => {
  const newInSeason = []
  for (const ingredient of availableIngredients) {
    if (ingredient.months[0] === month) {
      newInSeason.push(ingredient.name)
    }
  }
  return newInSeason
}

const getYearRound = (availableIngredients = []) => {
  const yearRound = []
  for (const ingredient of availableIngredients) {
    if (ingredient.months.length === 12) {
      yearRound.push(ingredient.name)
    }
  }
  return yearRound
}

const getIngredient = (category) => (month = new Date().getMonth()) => {
  const availableIngredients = []
  const comingIntoSeason = []
  for (const ingredient of ingredients) {
    if (ingredient.category === category && ingredient.months.indexOf(month) >= 0) {
      availableIngredients.push(ingredient)
    } else if (ingredient.category === category && ingredient.shoulder.indexOf(month) >= 0) {
      comingIntoSeason.push(ingredient.name)
    }
  }
  return {
    inSeason: availableIngredients.map(ingredient => ingredient.name),
    makeTheMostOf: getMakeTheMostOf(availableIngredients),
    lastChanceFor: getLastChanceFor(availableIngredients, month),
    newInSeason: getNewInSeason(availableIngredients, month),
    comingIntoSeason,
    yearRound: getYearRound(availableIngredients),
  }
}

const getMeats = getIngredient('meat')
const getFish = getIngredient('fish')
const getFruits = getIngredient('fruit')
const getVegetables = getIngredient('vegetable')
const getHerbs = getIngredient('herb')
const getSpices = getIngredient('spice')


const getJsonResponse = (month) => ({
  meat: getMeats(month),
  fish: getFish(month),
  fruit: getFruits(month),
  vegetables: getVegetables(month),
  herbs: getHerbs(month),
  spices: getSpices(month),
})

app.get('/', (req, res) => {
  res.send(getJsonResponse())
})

app.get('/january', (req, res) => {
  res.send(getJsonResponse(0))
})
app.get('/february', (req, res) => {
  res.send(getJsonResponse(1))
})
app.get('/march', (req, res) => {
  res.send(getJsonResponse(2))
})
app.get('/april', (req, res) => {
  res.send(getJsonResponse(3))
})
app.get('/may', (req, res) => {
  res.send(getJsonResponse(4))
})
app.get('/june', (req, res) => {
  res.send(getJsonResponse(5))
})
app.get('/july', (req, res) => {
  res.send(getJsonResponse(6))
})
app.get('/august', (req, res) => {
  res.send(getJsonResponse(7))
})
app.get('/september', (req, res) => {
  res.send(getJsonResponse(8))
})
app.get('/october', (req, res) => {
  res.send(getJsonResponse(9))
})
app.get('/november', (req, res) => {
  res.send(getJsonResponse(10))
})
app.get('/december', (req, res) => {
  res.send(getJsonResponse(11))
})

app.listen(3000, () => console.log(`App running at port 3000`))
