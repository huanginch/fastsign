<template>
    <div class="progressbar d-flex justify-content-center border-bottom">
        <div class="steps d-flex align-items-center py-5">
            <div class="step-icon complete position-relative">1</div>
            <p class="d-none d-lg-block me-5">成功上傳檔案</p>
        </div>
        <div class="steps d-flex align-items-center">
            <div class="step-icon step2 current">2</div>
            <p class="d-none d-lg-block me-5">加入簽名檔</p>
        </div>
        <div class="steps d-flex align-items-center">
            <div class="step-icon step3">3</div>
            <p class="d-none d-lg-block me-5">確認檔案</p>
        </div>
        <div class="d-flex align-items-center">
            <div class="step-icon step4">4</div>
            <p class="d-none d-lg-block">下載檔案</p>
        </div>
    </div>
</template>

<style lang="scss" scoped>

.progressbar {
    width: 100%;
}
.step-icon {
    width: 40px;
    height: 40px;
    margin-right: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 2px solid #C5C7D0;
    border-radius: 180px;
}

.complete::after {
    content: '✔';
    position: absolute;
    width: 40px;
    height: 40px;
    border-radius: 180px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #0B7D77;
    color: white;
}

.current {
    width: 32px;
    height: 32px;
    color: white;
    background: #0B7D77;
    padding-right: relative;
}

.current::before {
    content: '';
    width: 40px;
    height: 40px;
    border : 1px solid #CEE5E4;
    background: transparent;
    position: absolute;
    border-radius: 180px;
}

.steps::after {
    content: '';
    width: 80px;
    height: 2px;
    background-color: #C5C7D0;
    margin-right: 16px;
    display: none;
    @media (min-width: 992px) {
        display: block;
    }
    
}
</style>