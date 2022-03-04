'use strict';

/**
 * Project configuration settings
 */
const config = {
  // Webhook config
  FUNCTION_NAME: 'flashcards',
  FUNCTION_VERSION: 'v1',
  FUNCTION_MEMORY: '1GB',
  FUNCTION_REGION: 'us-central1',
  FUNCTION_TIMEOUT: 60, // seconds
  ENABLE_DEBUG: true,
  DEBUG_KEY: 'DedicatedDebugInfo',
  SSML_BREAK_TIME: 500, // milliseconds
  MAX_QUESTIONS_PER_GAME: 10,

  // Default values for Quiz settings in the data sheet
  TITLE_DEFAULT: 'The Flash Cards Game',
  QUESTIONS_PER_GAME_DEFAULT: 5,
  QUESTION_TITLE_DEFAULT: 'Question Title',
  ANSWER_TITLE_DEFAULT: 'Answer Title',
  AUDIO_DING_DEFAULT: ['https://actions.google.com/sounds/v1/cartoon/instrument_strum.ogg'],
  AUDIO_GAME_INTRO_DEFAULT: [],
  AUDIO_GAME_OUTRO_DEFAULT: [],
  AUDIO_CORRECT_DEFAULT: ['https://actions.google.com/sounds/v1/cartoon/wood_plank_flicks.ogg'],
  AUDIO_INCORRECT_DEFAULT: ['https://actions.google.com/sounds/v1/cartoon/clang_and_wobble.ogg'],
  AUDIO_ROUND_END_DEFAULT: [],
  AUDIO_CALCULATING_DEFAULT: ['https://actions.google.com/sounds/v1/cartoon/woodpecker.ogg'],
  RANDOMIZE_QUESTIONS_DEFAULT: true,
  GOOGLE_ANALYTICS_TRACKING_ID_DEFAULT: '',
  QUIT_PROMPT_DEFAULT: '',
  AUTO_ADD_ANSWER_SYNONYMS_DEFAULT: 'no',
};

module.exports = config;
