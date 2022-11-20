<template>
    <div class="container mt-12">
        <section class="bg-success border-dashed border-primary text-center pt-20 mb-10">
            <img src="../assets/images/Addfile.png" alt="file" class="mb-7">
            <p class="mb-3">將檔案拖曳至這裡，或</p>
            <button class="btn btn-primary btn-lg w-50 mb-5" @click="$refs.file.click()">選擇檔案</button>
            <input ref="file" type="file" class="d-none" accept=".pdf,.png,.jpg,.jpeg" v-on:change="handleFileUpload()"/>
            <h5 class="text-primary fw-bold mb-25">檔案大小10Mb以內，檔案格式為PDF、IMG</h5>
        </section>
        <section class="text-center mb-10 mb-lg-11">
            <h2 class="mb-5 mb-lg-8">輕鬆幾步驟，完成您的簽署</h2>
            <div class="d-flex flex-wrap justify-content-center justify-content-lg-between align-items-center">
                <div>
                    <div class="steps step1 border border-2 border-primary text-primary rounded-circle mx-auto mb-3 position-relative"></div>
                    <h4>上傳檔案</h4>
                    <p>選擇PDF檔或是IMG檔</p>
                    <img src="../assets/images/File-upload.png" alt="step1">
                </div>
                <div>
                    <div class="steps step2 border border-2 border-primary text-primary rounded-circle mx-auto mb-3 position-relative"></div>
                    <h4>加入簽名檔</h4>
                    <p>手寫、輸入或是上傳簽名檔</p>
                    <img src="../assets/images/Signing.png" alt="step2">
                </div>
                <div>
                    <div class="steps step3 border border-2 border-primary text-primary rounded-circle mx-auto mb-3 position-relative"></div>
                    <h4>下載與傳送</h4>
                    <p>完成簽署可立即傳送檔案給對方</p>
                    <img src="../assets/images/Sending.png" alt="step3">
                </div>
            </div>
        </section>
    </div>
</template>

<script>
    export default {
        name: "Home",
        methods: {
            handleFileUpload: function () {
                let file = this.$refs.file.files[0];
                if (file === undefined) return;

                const fileReader = new FileReader();
                fileReader.readAsArrayBuffer(file);

                fileReader.addEventListener("load", () => {

                    // 獲取readAsArrayBuffer產生的結果，並用來渲染PDF
                    const typedarray = new Uint8Array(fileReader.result);
                    // console.log(typedarray)
                    localStorage.setItem("pdfFile", typedarray);
                    this.$router.push('/fastsign/Sign');
                });
            },
        },
        
    }
</script>

<style scoped>
.border-dashed {
        border: 2px dashed;
    }

    .steps {
        width: 40px;
        height: 40px;
    }

    .step1::after {
        content: "1";
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    .step2::after {
        content: "2";
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    .step3::after {
        content: "3";
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
</style>