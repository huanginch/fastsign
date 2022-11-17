<script setup>
import Progressbar from '../components/Progressbar.vue'
</script>

<template>
    <Progressbar/>
    <div class="container">
        <div class="row">
            <div class="col-9 d-flex justify-content-center">
                <canvas id="canvas" ref="canvasPDF"></canvas>
            </div>
            <div class="col-3">
                <aside class="mt-7">
                    <div class="offcanvas-header flex-column align-items-start">
                        <h5 class="offcanvas-title mb-3 text-start" id="offcanvasExampleLabel">基本資料</h5>
                        <form action="" class="mb-12">
                            <input type="text" placeholder="請輸入您的姓名" class="rounded-1 border-gray mb-3">
                            <input type="text" placeholder="請輸入您的電子信箱" class="rounded-1 border-gray">
                        </form>
                    </div>
                    <div class="offcanvas-body d-flex flex-column">
                        <div class="sign mb-12">
                            <h5 class="mb-3">我的簽名</h5>
                            <div class="border border-success d-flex align-items-center text-success mb-3 bg-white">
                                <span class="material-symbols-outlined">
                                    drag_indicator
                                </span>
                                <img ref="mySign" class="mySign w-50 mx-auto" @dragend="addSign">
                            </div>
                            <button class="addSign btn btn-lg border d-flex align-items-center justify-content-center fw-bold" data-bs-toggle="modal"
                                data-bs-target="#staticBackdrop">
                                <span class="material-symbols-outlined">
                                    add
                                </span>
                                創建簽名檔
                            </button>
                        </div>
                        <div class="invite d-flex justify-content-between">
                            <h5 class="mb-3">邀請簽署人</h5>
                            <button class="btn border">
                                <span class="material-symbols-outlined">
                                    person_add
                                </span>
                            </button>
                        </div>
                        <button class="btn btn-lg btn-primary mt-auto mb-7" @click="downloadFile">下載</button>
                    </div>
                </aside>
            </div>
        </div>
    </div>

    <div class="modal fade" id="staticBackdrop" data-bs-keyboard="false" tabindex="-1"
        aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header border-0">
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <ul class="nav nav-tabs" id="myTab" role="tablist">
                    <li class="nav-item" role="presentation">
                        <button class="nav-link active" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button"
                            role="tab" aria-controls="profile" aria-selected="false">手寫</button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button class="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact" type="button"
                            role="tab" aria-controls="contact" aria-selected="false">上傳</button>
                    </li>
                </ul>
                
                <div class="tab-content" id="myTabContent">
                    <div class="tab-pane fade show active px-5" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                        <div class="text-end mt-5 mb-3">
                            <button class="btn text-primary" @click="undo">回上一步</button>
                            <button class="btn text-primary clearSign" @click="reset">清除</button>
                        </div>
                        <canvas id="canvas" ref="signCanvas" class="signCanvas border border-ui-gray mb-5" @mousedown="startPosition" @mouseup="finishedPosition" @mouseleave="finishedPosition" @mousemove="draw"></canvas>
                        <div class="footer text-center">
                            <p class="mb-3">我了解這是一個具法律效力的本人簽名</p>
                            <button class="btn btn-primary mb-7" @click="saveImage(); reset()" data-bs-dismiss="modal">儲存</button>
                        </div>
                    </div>
                    <div class="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">...</div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    input {
        width: 100%;
    }
    .offcanvas-body {
        width: 95%;
        height: 80vh;
    }
    .addSign {
        width: 100%;
    }

    .nav-tabs .nav-link {
        border: 0px;
        color: black;
    }

    .nav-tabs .nav-link:hover {
        color: #0B7D77;
    }
    .nav-tabs .nav-link.active {
        border-bottom: 2px solid #0B7D77;
        color: #0B7D77;
    }

    .signCanvas {
        width: 480px;
        height: 160px;
    }
</style>

<script>
import * as pdfjsLib from 'pdfjs-dist';
pdfjsLib.GlobalWorkerOptions.workerSrc = './node_modules/pdfjs-dist/build/pdf.worker.js';
import { fabric } from "fabric";
import { jsPDF } from "jspdf";

export default {
    data() {
        return {
            pdf: null,
            canvasArray: [],
            canvasStep: -1,
            ctxPDF: null,
            canvasPDF: null,
            Base64Prefix: "data:application/pdf;base64,",
            ctxSign: null,
            isPainting: false,
        };
    },
    methods: {

        getPDF() {
            this.pdf = localStorage.getItem("pdfFile").split(',');
            this.pdf = new Uint8Array(this.pdf);
            return this.pdf;
        },

        async renderPDF(data) {
            // let ctx = this.ctxPDF;
            const pdfDoc = await pdfjsLib.getDocument(data).promise;
            const pdfPage = await pdfDoc.getPage(1);

            // set the canvas size
            const viewport = pdfPage.getViewport({ scale: 1 });
            const canvas = document.createElement("canvas");
            const context = canvas.getContext("2d");
            canvas.width = viewport.width;
            canvas.height = viewport.height;
            const renderContext ={
                canvasContext: context,
                viewport: viewport,
            };
            const renderTask = pdfPage.render(renderContext);

            return renderTask.promise.then(() => canvas);
        },

        async pdfToImage(pdfData) {

            // 設定 PDF 轉為圖片時的比例
            const scale = 1 / window.devicePixelRatio;

            // 回傳圖片
            return new fabric.Image(pdfData, {
                id: "renderPDF",
                scaleX: scale,
                scaleY: scale,
            });
        },

        addSign(e) {
            let mySign = e.target;
            let ctx = this.canvasPDF;

            if (!mySign.src) return;

            fabric.Image.fromURL(mySign.src, function (image) {

                // 設定簽名出現的位置及大小，後續可調整
                image.top = 400;
                image.scaleX = 0.5;
                image.scaleY = 0.5;
                ctx.add(image);
            });
        },

        async setPDFCanvas() {
            const canvas = new fabric.Canvas("canvas");
            this.ctxPDF = canvas.getContext("2d");

            const pdfData = await this.renderPDF(this.getPDF());
            const pdfImage = await this.pdfToImage(pdfData);

            canvas.setWidth(pdfImage.width / window.devicePixelRatio);
            canvas.setHeight(pdfImage.height / window.devicePixelRatio);

            canvas.setBackgroundImage(pdfImage, canvas.renderAll.bind(canvas));

            this.canvasPDF = canvas;
            console.log(this.canvasPDF);
        },

        setCanvas() {
            let canvas = this.$refs['signCanvas'];
            let ctxSign = canvas.getContext('2d')
            ctxSign.lineWidth = 4;
            ctxSign.lineCap = "round";
            this.ctxSign = ctxSign
            // let state = this.ctxSign.getImageData(0, 0, canvas.width, canvas.height);
            // window.history.pushState(state, null);
        },

        getPaintPosition(e) {
            const canvasSize = this.ctxSign.canvas.getBoundingClientRect();

            if (e.type === "mousemove") {
                return {
                    x: e.clientX - canvasSize.left - 40,
                    y: e.clientY - canvasSize.top,
                };
            } else {
                return {
                    x: e.touches[0].clientX - canvasSize.left - 40,
                    y: e.touches[0].clientY - canvasSize.top,
                };
            }
        }, 

        startPosition(e) {
            e.preventDefault();
            this.isPainting = true;
        },

        finishedPosition() {
            this.isPainting = false;
            this.ctxSign.beginPath();
            // this.canvasPush();
        },

        canvasPush() {
            
        },

        draw(e) {
            // 滑鼠移動過程中，若非繪圖狀態，則跳出
            if (!this.isPainting) return;

            // 取得滑鼠 / 手指在畫布上的 x, y 軸位置位置
            const paintPosition = this.getPaintPosition(e);

            // 移動滑鼠位置並產生圖案
            this.ctxSign.lineTo(paintPosition.x, paintPosition.y);
            this.ctxSign.stroke();
        },

        undo(e) {
            this.ctxSign.clearRect(0, 0, this.ctxSign.canvas.width, this.ctxSign.canvas.height);

            this.draw(e);
        },

        reset() {
            this.ctxSign.clearRect(0, 0, this.ctxSign.canvas.width, this.ctxSign.canvas.height);
        },

        saveImage() {
            const newImg = this.ctxSign.canvas.toDataURL("image/png");
            let mySign = this.$refs['mySign'];
            mySign.src = newImg;
            localStorage.setItem('img', newImg);
        },

        downloadFile() {
            const pdf = new jsPDF();

            const image = this.canvasPDF.toDataURL("image/png");

            // 設定背景在 PDF 中的位置及大小
            const width = pdf.internal.pageSize.width;
            const height = pdf.internal.pageSize.height;
            pdf.addImage(image, "png", 0, 0, width, height);

            // 將檔案取名並下載
            pdf.save("signed.pdf");
        },

    },
    mounted() {
        // canvas for sign
        this.setCanvas();

        // canvas for pdf
        this.setPDFCanvas();

        // // render pdf
        // let pdf = this.getPDF();
        // this.renderPDF(pdf);
    }
}
</script>