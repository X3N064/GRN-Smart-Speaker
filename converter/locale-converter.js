/**
 * @fileoverview Locale to action sdk data converter class.
 */

const fs = require('fs');
const path = require('path');

const util = require('./util.js');

class LocaleConverter {
  /**
   * @param {!Object} options - Constructor options.
   * @param {string} options.locale - Sheet locale.
   * @param {string} options.dataDir - Webhook data dir.
   * @param {string} options.sdkDir - Action SDK root dir.
   */
  constructor({ locale, dataDir, sdkDir }) {
    this.locale = locale;
    this.dataDir = dataDir;
    this.sdkDir = sdkDir;
  }

  /**
   * Parse locale data and convert to appropriate sdk resource files.
   */
  convert() {
    const filePath = path.join(__dirname, `./locales/${this.locale}.json`);
    if (!fs.existsSync(filePath)) {
      throw new Error(`${this.locale} data does not exists`);
    }
    const { actions, intents, types, strings, settings } = util.readJsonFile(filePath);
    this.updateActions(actions);
    this.updateIntents(intents);
    this.updateTypes(types);
    this.updateStrings(strings);
    this.updateSettings(settings);
  }

  /**
   * Update actions file in sdk.
   * @param {Object} actions - Actions data;
   */
  updateActions(actions) {
    const filePath = path.join(__dirname, this.sdkDir, `actions/${this.locale}/actions.yaml`);
    util.writeYamlFile(filePath, actions);
  }

  /**
   * Update intents files in sdk.
   * @param {Array<Object>} intents - Intents data.
   */
  updateIntents(intents) {
    for (const [intent, data] of Object.entries(intents)) {
      const filePath = path.join(
        __dirname,
        this.sdkDir,
        `custom/intents/${this.locale}/${intent}.yaml`
      );
      util.writeYamlFile(filePath, data);
    }
  }

  /**
   * Update types files in sdk
   * @param {Array<Object>} types - Types data.
   */
  updateTypes(types) {
    for (const [type, data] of Object.entries(types)) {
      const filePath = path.join(
        __dirname,
        this.sdkDir,
        `custom/types/${this.locale}/${type}.yaml`
      );
      util.writeYamlFile(filePath, data);
    }
  }

  /**
   * Update resource strings in sdk
   * @param {Object} strings - Resource strings data.
   */
  updateStrings(strings) {
    const filePath = path.join(
      __dirname,
      this.sdkDir,
      `resources/strings/${this.locale}/main.yaml`
    );
    util.writeYamlFile(filePath, strings);
  }

  /**
   * Update settings file in sdk
   * @param {Object} settings - Settings data.
   */
  updateSettings(settings) {
    const filePath = path.join(__dirname, this.sdkDir, `settings/${this.locale}/settings.yaml`);
    util.writeYamlFile(filePath, settings);
  }
}

module.exports = LocaleConverter;
