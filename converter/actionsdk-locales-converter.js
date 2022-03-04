/**
 * @fileoverview Parse root level sdk folder and update json files for locales folder.
 */

const fs = require('fs');
const path = require('path');

const util = require('./util.js');

const SDK_PATH = path.join(__dirname, '../sdk');
const LOCALES_PATH = path.join(__dirname, './locales');

const SUPPORTED_LOCALES = [
  'de',
  // 'en', // en is the default locale, should be already included in starter code
  'en-AU',
  'en-CA',
  'en-GB',
  'en-IN',
  'en-US',
  'es',
  'es-419',
  'es-ES',
  'fr',
  'fr-CA',
  'fr-FR',
  'hi',
  'id',
  'it',
  'ja',
  'ko',
  'pt-BR',
  'ru',
  'th',
];

const SUPPORTED_INTENTS = [
  'DontKnow',
  'Help',
  'Hint',
  'No',
  'Quit',
  'Repeat',
  'Restart',
  'Skip',
  'Start',
  'TryAgain',
  'Yes',
];

const SUPPORTED_TYPES = ['answer'];

function parseLocaleData(locale) {
  return {
    actions: util.readYamlFile(`${SDK_PATH}/actions/${locale}/actions.yaml`),
    intents: Object.assign(
      {},
      ...SUPPORTED_INTENTS.map((intent) => {
        return {
          [intent]: util.readYamlFile(`${SDK_PATH}/custom/intents/${locale}/${intent}.yaml`),
        };
      })
    ),
    types: Object.assign(
      {},
      ...SUPPORTED_TYPES.map((type) => {
        return {
          [type]: util.readYamlFile(`${SDK_PATH}/custom/types/${locale}/${type}.yaml`),
        };
      })
    ),
    strings: util.readYamlFile(`${SDK_PATH}/resources/strings/${locale}/main.yaml`),
    settings: util.readYamlFile(`${SDK_PATH}/settings/${locale}/settings.yaml`),
  };
}

if (require.main === module) {
  for (const locale of SUPPORTED_LOCALES) {
    if (!fs.existsSync(`${SDK_PATH}/settings/${locale}/settings.yaml`)) continue;
    const data = parseLocaleData(locale);
    util.writeJsonFile(`${LOCALES_PATH}/${locale}.json`, data);
  }
}

module.exports = {
  parseLocaleData,
};
