<script setup lang="ts">
import NavMenu from "@/components/common/header/header-menu/HeaderMenu.vue";
import Logo from "@/components/common/header/header-logo/Logo.vue";
import HeaderCenter from "@/components/common/header/header-center/HeaderCenter.vue";

document.getElementById('menu-toggle')?.addEventListener('click', function() {
    document.getElementById('menu')?.classList.toggle('hidden');
});
</script>

<template>
    <header class="bg-white shadow-md py-4 flex justify-center">
        <div class="mx-auto w-full flex justify-between items-center px-6">
            <Logo />
            <div class="w-2xl hidden md:flex items-center gap-x-5">
                <HeaderCenter />
            </div>
            <NavMenu />
        </div>
    </header>
</template>

<style scoped>

</style>
