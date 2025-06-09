<script setup lang="ts">
import NavMenu from "@/components/common/header/NavMenu.vue";
import Logo from "@/components/common/header/Logo.vue";
import SearchField from "@/components/common/header/SearchField.vue";

document.getElementById('menu-toggle')?.addEventListener('click', function() {
    document.getElementById('menu')?.classList.toggle('hidden');
});
</script>

<template>
<header class="bg-white shadow-md py-4 flex justify-center">
    <div class="mx-auto w-full flex justify-between items-center px-6">
        <Logo />
        <SearchField />
        <NavMenu />
    </div>
</header>
</template>

<style scoped>

</style>
