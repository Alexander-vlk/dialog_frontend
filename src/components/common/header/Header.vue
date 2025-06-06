<script setup lang="ts">
import ProfileHeader from "@/components/common/header/ProfileHeader.vue";
import NavMenu from "@/components/common/header/NavMenu.vue";
import Logo from "@/components/common/header/Logo.vue";

document.getElementById('menu-toggle')?.addEventListener('click', function() {
    document.getElementById('menu')?.classList.toggle('hidden');
});
</script>

<template>
<header class="bg-white shadow-md py-4 flex justify-center">
    <div id="header-container" class="mx-auto w-full flex justify-between items-center px-6">
        <Logo />
        <NavMenu />
        <ProfileHeader />
    </div>
</header>
</template>

<style scoped>
#header-container {
    max-width: 1200px;
}
</style>
