async function syncTable(model, syncMode) {
  try {
    await model.sync({ force: syncMode });
    console.log(`${model.name} table synced successfully!`);
  } catch (error) {
    console.error(`Error syncing ${model.name} table:`, error);
  }
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

module.exports = { syncTable, getRandomInt };
