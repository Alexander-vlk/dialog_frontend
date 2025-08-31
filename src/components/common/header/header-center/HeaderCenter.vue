<script setup lang="ts">
import SearchField from "@/components/common/header/search-block/SearchField.vue";
import UserAuth from "@/components/common/user-auth/UserAuth.vue";
</script>

<template>
    <div>
        <SearchField />
    </div>
    <div class="hidden m-5 xl:block">
        <UserAuth :showUserMiniProfile="false" />
    </div>
</template>

<style scoped>

</style>
