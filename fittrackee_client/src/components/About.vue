<template>
  <div class="about-text">
    <div>
      <p class="error-message" v-html="$t('about.FITTRACKEE_DESCRIPTION')" />
      <p>
        <i class="fa fa-book fa-padding" aria-hidden="true"></i>
        <a
          class="documentation-link"
          :href="documentationLink"
          target="_blank"
          rel="noopener noreferrer"
        >
          {{ capitalize($t('common.DOCUMENTATION')) }}
        </a>
      </p>
      <p>
        <i class="fa fa-github fa-padding" aria-hidden="true"></i>
        <a
          href="https://github.com/SamR1/FitTrackee"
          target="_blank"
          rel="noopener noreferrer"
        >
          {{ $t('about.SOURCE_CODE') }}
        </a>
      </p>
      <p>
        <i class="fa fa-balance-scale fa-padding" aria-hidden="true"></i>
        <i18n-t keypath="about.FITTRACKEE_LICENSE">
          <a
            href="https://choosealicense.com/licenses/agpl-3.0/"
            target="_blank"
            rel="noopener noreferrer"
            >AGPLv3</a
          >
        </i18n-t>
      </p>
      <div v-if="appConfig.admin_contact">
        <i class="fa fa-envelope-o fa-padding" aria-hidden="true"></i>
        <a :href="`mailto:${appConfig.admin_contact}`">
          {{ $t('about.CONTACT_ADMIN') }}
        </a>
      </div>
      <div v-if="weather_provider && weather_provider.name">
        {{ $t('about.WEATHER_DATA_FROM') }}
        <a :href="weather_provider.url" target="_blank" rel="nofollow noopener">
          {{ weather_provider.name }}
        </a>
      </div>
      <template v-if="appConfig.about">
        <p class="about-instance">{{ $t('about.ABOUT_THIS_INSTANCE') }}</p>
        <div v-html="convertToMarkdown(appConfig.about)" />
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { computed, capitalize } from 'vue'
  import type { ComputedRef } from 'vue'

  import { ROOT_STORE } from '@/store/constants'
  import type { TAppConfig } from '@/types/application'
  import { useStore } from '@/use/useStore'
  import { convertToMarkdown } from '@/utils/inputs'

  const store = useStore()
  const appConfig: ComputedRef<TAppConfig> = computed(
    () => store.getters[ROOT_STORE.GETTERS.APP_CONFIG]
  )
  const weather_provider: ComputedRef<Record<string, string>> = computed(() =>
    get_weather_provider()
  )
  const language: ComputedRef<string> = computed(
    () => store.getters[ROOT_STORE.GETTERS.LANGUAGE]
  )
  const documentationLink: ComputedRef<string> = computed(() =>
    get_documentation_link()
  )

  function get_weather_provider() {
    const weather_provider: Record<string, string> = {}
    if (appConfig.value.weather_provider === 'visualcrossing') {
      weather_provider['name'] = 'Visual Crossing'
      weather_provider['url'] = 'https://www.visualcrossing.com'
    }
    return weather_provider
  }

  function get_documentation_link() {
    let link = 'https://samr1.github.io/FitTrackee/'
    if (language.value === 'fr') {
      link += 'fr/'
    }
    return link
  }
</script>

<style lang="scss" scoped>
  @import '~@/scss/base.scss';

  .about-text {
    margin-top: 200px;
    margin-right: 100px;
    padding-bottom: 40px;
    @media screen and (max-width: $small-limit) {
      margin-top: 0;
      margin-right: 0;
      padding-bottom: 0;
    }
    .fa-padding {
      padding-right: $default-padding;
    }
    .about-instance {
      font-weight: bold;
      margin-top: $default-margin * 3;
    }
  }
</style>
