import { assert } from 'chai'

import { TPrivacyLevels } from '@/types/user'
import {
  getMapVisibilityLevels,
  getPrivacyLevelForLabel,
  getUpdatedMapVisibility,
} from '@/utils/privacy'

describe('getUpdatedMapVisibility', () => {
  const testsParams: [TPrivacyLevels, TPrivacyLevels, TPrivacyLevels][] = [
    // input map visibility, input workout visibility, excepted map visibility
    ['private', 'private', 'private'],
    ['private', 'followers_only', 'private'],
    ['private', 'followers_and_remote_only', 'private'],
    ['private', 'public', 'private'],
    ['followers_only', 'private', 'private'],
    ['followers_only', 'followers_only', 'followers_only'],
    ['followers_only', 'followers_and_remote_only', 'followers_only'],
    ['followers_only', 'public', 'followers_only'],
    ['followers_and_remote_only', 'private', 'private'],
    ['followers_and_remote_only', 'followers_only', 'followers_only'],
    [
      'followers_and_remote_only',
      'followers_and_remote_only',
      'followers_and_remote_only',
    ],
    ['followers_and_remote_only', 'public', 'followers_and_remote_only'],
    ['public', 'private', 'private'],
    ['public', 'followers_only', 'followers_only'],
    ['public', 'followers_and_remote_only', 'followers_and_remote_only'],
    ['public', 'public', 'public'],
  ]

  testsParams.map((testParams) => {
    it(`get map visibility (input value: '${testParams[0]}') when workout visibility is '${testParams[1]}'`, () => {
      assert.equal(
        getUpdatedMapVisibility(testParams[0], testParams[1]),
        testParams[2]
      )
    })
  })
})

describe('getPrivacyLevelForLabel', () => {
  const testsParams: [string, boolean, string][] = [
    ['private', true, 'private'],
    ['followers_only', true, 'local_followers_only'],
    ['followers_and_remote_only', true, 'followers_and_remote_only'],
    ['private', true, 'private'],
    ['private', false, 'private'],
    ['followers_only', false, 'followers_only'],
    ['followers_and_remote_only', false, 'followers_and_remote_only'],
    ['private', false, 'private'],
  ]

  testsParams.map((testParams) => {
    it(`get privacy level label for ${testParams[0]} and federation ${
      testParams[1] ? 'enabled' : ' disabled'
    }`, () => {
      assert.equal(
        getPrivacyLevelForLabel(testParams[0], testParams[1]),
        testParams[2]
      )
    })
  })
})

describe('getMapVisibilityLevels', () => {
  const testsParams: [TPrivacyLevels, TPrivacyLevels[]][] = [
    ['private', ['private']],
    ['followers_only', ['private', 'followers_only']],
    ['followers_and_remote_only', ['private', 'followers_only']],
    ['public', ['private', 'followers_only', 'public']],
  ]

  testsParams.map((testParams) => {
    it(`get visibility levels depending on workout visibility (input value: '${testParams[0]}')`, () => {
      assert.deepEqual(getMapVisibilityLevels(testParams[0]), testParams[1])
    })
  })
})