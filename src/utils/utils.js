export const randInt = (min, max) => Math.floor(Math.random() * (max + 1 - min) + min)

export const formatWeight = (weight) => `${Math.ceil(weight * 10)}g`
