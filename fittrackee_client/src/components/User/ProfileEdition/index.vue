<template>
  <div id="user-profile-edition" class="center-card">
    <Card>
      <template #title>
        {{ $t(`user.PROFILE.${tab}_EDITION`) }}
      </template>
      <template #content>
        <UserProfileTabs :tabs="tabs" :selectedTab="tab" :edition="true" />
        <router-view :user="user"></router-view>
      </template>
    </Card>
  </div>
</template>

<script setup lang="ts">
  import { toRefs } from 'vue'

  import UserProfileTabs from '@/components/User/UserProfileTabs.vue'
  import type { IUserProfile } from '@/types/user'

  interface Props {
    user: IUserProfile
    tab: string
  }
  const props = defineProps<Props>()

  const { user, tab } = toRefs(props)
  const tabs = [
    'PROFILE',
    'ACCOUNT',
    'PICTURE',
    'PREFERENCES',
    'SPORTS',
    'EQUIPMENTS',
    'PRIVACY-POLICY',
  ]
</script>
