<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-white border-bottom border-gray">
        <div class="container-fluid flex-shrink-0">
            <router-link class="navbar-brand" href="/fastsign/">
                <img src="../assets/images/logo.png" alt="logo">
            </router-link>
            <h2 class="flex-grow-1 text-center d-none d-lg-block text-dark-gray">快速省時的電子簽署工具</h2>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse flex-grow-0 justify-content-between text-center justify-content-lg-end " id="navbarSupportedContent">
                <button class="btn text-primary px-9 me-7" type="submit">登入</button>
                <button class="btn btn-primary px-9" type="submit">註冊</button>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
    data() {
        return {
            isVisitor: false,
        };
    },
    computed: {
        currentRouteName() {
            return this.$route.name;
        }
    }
}
</script>