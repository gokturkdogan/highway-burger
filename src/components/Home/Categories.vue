<template>
    <div class="nav">
        <!-- Uzay Arka Planı -->
        <div class="nav__space">
            <!-- Yıldızlar -->
            <div class="nav__stars">
                <div v-for="n in 50" :key="'star-' + n" class="nav__star" :style="getStarStyle(n)"></div>
            </div>
            
            <!-- Roket -->
            <div class="nav__rocket">🚀</div>
            
            <!-- Gezegenler -->
            <div class="nav__planet nav__planet--1">🪐</div>
            <div class="nav__planet nav__planet--2">🌙</div>
        </div>

        <!-- Uzaylı Figürü -->
        <div class="nav__alien" :class="{ '-activated': alienActivated }">
            <!-- Baş -->
            <div class="nav__alienHead">👽</div>
            
            <!-- Gövde -->
            <div class="nav__alienTorso"></div>
            
            <!-- Kollar -->
            <div class="nav__alienArm nav__alienArm--left">
                <div class="nav__alienHand">🖐️</div>
            </div>
            <div class="nav__alienArm nav__alienArm--right">
                <div class="nav__alienHand">🤚</div>
            </div>
            
            <!-- Bacaklar -->
            <div class="nav__alienLeg nav__alienLeg--left"></div>
            <div class="nav__alienLeg nav__alienLeg--right"></div>
            
            <!-- Ayaklar -->
            <div class="nav__alienFoot nav__alienFoot--left">👟</div>
            <div class="nav__alienFoot nav__alienFoot--right">👟</div>
            
            <!-- Ters Üçgen Hologram Işığı (Eller Açılınca Çıkıyor) -->
            <transition name="hologram-fade">
                <div v-if="showHologram" class="nav__hologramLight">
                    <!-- Sol El Işığı -->
                    <div class="nav__hologramPyramid nav__hologramPyramid--left"></div>
                    <!-- Sağ El Işığı -->
                    <div class="nav__hologramPyramid nav__hologramPyramid--right"></div>
                    <!-- Birleşme Noktası -->
                    <div class="nav__hologramMerge"></div>
                </div>
            </transition>
        </div>

        <!-- Sol Arrow Button -->
        <button class="nav__arrow nav__arrow--left" @click="previousCategory">
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                <polyline points="15,18 9,12 15,6"></polyline>
            </svg>
        </button>

        <!-- 3D Hologram Carousel (Hologram Belirdikten Sonra) -->
        <transition name="carousel-appear">
            <div v-show="showCarousel" class="nav__hologram">
                <div class="nav__carousel">
                    <div class="nav__carouselInner" :style="{ transform: `translateZ(-300px) rotateY(${carouselRotation}deg)` }">
                        <div 
                            v-for="(category, index) in categories" 
                            :key="category.id"
                            class="nav__carouselItem"
                            :class="{ '-active': index === currentIndex, '-clicked': clickedId === category.id }"
                            :style="getCarouselItemStyle(index)"
                            @click="selectCategory(index)"
                        >
                            <!-- 3D Prizma -->
                            <div class="nav__prism">
                                <!-- Ön Yüz -->
                                <div class="nav__prismFace nav__prismFace--front">
                                    <img class="nav__image" :src="category.attributes.image.data.attributes.url" :alt="category.attributes.name">
            <div class="nav__itemContent">
                <div class="nav__title">{{ category.attributes.name }}</div>
                <div class="nav__subtitle">{{ category.attributes.description }}</div>
            </div>
            <div class="nav__action">
                Seçim için tıklayınız
                                        <span class="nav__actionIcon">🌟</span>
            </div>
                                </div>
                                <!-- Arka ve Yan Yüzler -->
                                <div class="nav__prismFace nav__prismFace--back"></div>
                                <div class="nav__prismFace nav__prismFace--left"></div>
                                <div class="nav__prismFace nav__prismFace--right"></div>
                                <div class="nav__prismFace nav__prismFace--top"></div>
                                <div class="nav__prismFace nav__prismFace--bottom"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </transition>

        <!-- Sağ Arrow Button -->
        <button class="nav__arrow nav__arrow--right" @click="nextCategory">
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                <polyline points="9,18 15,12 9,6"></polyline>
            </svg>
        </button>

        <!-- Kategori İndikatörü -->
        <div class="nav__indicators">
            <div 
                v-for="(category, index) in categories" 
                :key="'indicator-' + category.id"
                class="nav__indicator"
                :class="{ '-active': index === currentIndex }"
                @click="goToCategory(index)"
            ></div>
        </div>
    </div>
</template>
<script>
import PointerIcon from '../../assets/icons/pointer-icon.vue'

export default {
    name: "Categories",
    data() {
        return {
            clickedId: null,
            currentIndex: 0,
            carouselRotation: 0,
            alienActivated: false,
            showHologram: false,
            showCarousel: false
        }
    },
    mounted() {
        // Uzaylı animasyon sırası
        setTimeout(() => {
            this.alienActivated = true; // Eller açılır
        }, 1000);
        
        setTimeout(() => {
            this.showHologram = true; // Hologram ışık çıkar
        }, 1800);
        
        setTimeout(() => {
            this.showCarousel = true; // Carousel belirmeye başlar
        }, 2400);
    },
    components: {
        PointerIcon
    },
    props: {
        categories: {
            type: Array,
            required: true
        }
    },
    computed: {
        angleStep() {
            return 360 / this.categories.length;
        }
    },
    methods: {
        nextCategory() {
            this.currentIndex = (this.currentIndex + 1) % this.categories.length;
            this.carouselRotation -= this.angleStep;
        },
        previousCategory() {
            this.currentIndex = this.currentIndex === 0 ? this.categories.length - 1 : this.currentIndex - 1;
            this.carouselRotation += this.angleStep;
        },
        goToCategory(index) {
            const diff = index - this.currentIndex;
            this.currentIndex = index;
            this.carouselRotation -= diff * this.angleStep;
        },
        selectCategory(index) {
            if (index === this.currentIndex) {
                const category = this.categories[index];
                this.clickedId = category.id;
            setTimeout(() => {
                    this.$router.push('/products/' + category.attributes.slug);
                }, 600);
            } else {
                this.goToCategory(index);
            }
        },
        getCarouselItemStyle(index) {
            const angle = this.angleStep * index;
            return {
                transform: `rotateY(${angle}deg) translateZ(300px)`
            };
        },
        getStarStyle(n) {
            const size = Math.random() * 3 + 1;
            const duration = Math.random() * 3 + 2;
            const delay = Math.random() * 2;
            return {
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${size}px`,
                height: `${size}px`,
                animationDuration: `${duration}s`,
                animationDelay: `${delay}s`
            };
        }
    },
};
</script>
<style lang="scss" scoped>
.nav {
    position: relative;
    background: linear-gradient(180deg, #0a0e27 0%, #1a1f3a 50%, #2a2f4a 100%);
    padding: 60px 20px 80px;
    border-radius: 30px;
    box-shadow: 0 20px 60px rgba(10, 14, 39, 0.8), 
                inset 0 0 100px rgba(138, 43, 226, 0.1);
    min-height: 600px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid rgba(138, 43, 226, 0.3);
    overflow: hidden;

    // Uzay Arka Planı
    &__space {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        pointer-events: none;
        z-index: 0;
    }

    // Yıldızlar
    &__stars {
        position: absolute;
        width: 100%;
        height: 100%;
    }

    &__star {
        position: absolute;
        background: white;
        border-radius: 50%;
        animation: twinkle 3s ease-in-out infinite, float 5s ease-in-out infinite;
        box-shadow: 0 0 10px rgba(255, 255, 255, 0.8),
                    0 0 20px rgba(255, 255, 255, 0.5),
                    0 0 30px rgba(138, 43, 226, 0.3);
    }

    // Roket
    &__rocket {
        position: absolute;
        font-size: 40px;
        bottom: 10%;
        left: -50px;
        animation: rocketFly 20s linear infinite;
        filter: drop-shadow(0 0 20px rgba(255, 200, 50, 0.8));
        transform: rotate(-45deg);
        z-index: 1;
    }

    // Gezegenler
    &__planet {
        overflow: hidden;
        position: absolute;
        font-size: 60px;
        animation: planetFloat 15s ease-in-out infinite;
        filter: drop-shadow(0 0 30px rgba(138, 43, 226, 0.6));
        z-index: 1;

        &--1 {
            top: 5%;
            right: 10%;
            animation-duration: 20s;
        }

        &--2 {
            bottom: 10%;
            left: 5%;
            animation-duration: 18s;
        }
    }

    // Uzaylı Tam Figür
    &__alien {
        position: absolute;
        bottom: 30px;
        left: 50%;
        transform: translateX(-50%);
        z-index: 2;
        pointer-events: none;
        animation: alienFloat 4s ease-in-out infinite;

        // Eller başlangıçta kapalı
        &:not(.-activated) {
            .nav__alienArm--left {
                transform: rotate(-15deg);
            }

            .nav__alienArm--right {
                transform: rotate(15deg);
            }
        }

        // Eller açılınca
        &.-activated {
            .nav__alienArm--left {
                animation: armOpenLeft 0.8s ease-out forwards;
            }

            .nav__alienArm--right {
                animation: armOpenRight 0.8s ease-out forwards;
            }
        }
    }

    &__alienHead {
        font-size: 80px;
        display: block;
        text-align: center;
        filter: drop-shadow(0 10px 40px rgba(0, 255, 100, 0.8));
        animation: headBob 3s ease-in-out infinite;
        position: relative;
        z-index: 10;
    }

    &__alienTorso {
        width: 60px;
        height: 80px;
        background: linear-gradient(180deg, 
            rgba(0, 255, 100, 0.6) 0%,
            rgba(0, 200, 80, 0.5) 50%,
            rgba(0, 150, 60, 0.4) 100%);
        margin: -10px auto 0;
        border-radius: 30px;
        box-shadow: 0 10px 40px rgba(0, 255, 100, 0.6),
                    inset 0 0 30px rgba(255, 255, 255, 0.3);
        border: 2px solid rgba(0, 255, 100, 0.4);
        position: relative;
        z-index: 9;
    }

    &__alienArm {
        position: absolute;
        width: 70px;
        height: 8px;
        background: linear-gradient(90deg, 
            rgba(0, 255, 100, 0.6),
            rgba(0, 200, 80, 0.5));
        top: 90px;
        border-radius: 10px;
        transform-origin: left center;
        z-index: 8;

        &--left {
            left: -10px;
            transform: rotate(-45deg);
            animation: armWaveLeft 3s ease-in-out infinite;
        }

        &--right {
            right: -10px;
            left: auto;
            transform-origin: right center;
            transform: rotate(45deg);
            animation: armWaveRight 3s ease-in-out infinite;
        }
    }

    &__alienHand {
        position: absolute;
        font-size: 40px;
        filter: drop-shadow(0 5px 20px rgba(0, 255, 100, 0.7));
        animation: handPulse 2s ease-in-out infinite;

        .nav__alienArm--left & {
            right: -25px;
            top: -15px;
        }

        .nav__alienArm--right & {
            left: -25px;
            top: -15px;
            transform: scaleX(-1);
        }
    }

    &__alienLeg {
        position: absolute;
        width: 10px;
        height: 60px;
        background: linear-gradient(180deg,
            rgba(0, 255, 100, 0.5),
            rgba(0, 200, 80, 0.4));
        bottom: -90px;
        left: 50%;
        border-radius: 10px;
        z-index: 8;

        &--left {
            transform: translateX(-20px);
            animation: legWalk 2s ease-in-out infinite;
        }

        &--right {
            transform: translateX(10px);
            animation: legWalk 2s ease-in-out infinite 1s;
        }
    }

    &__alienFoot {
        position: absolute;
        font-size: 25px;
        bottom: -120px;
        filter: drop-shadow(0 5px 15px rgba(0, 255, 100, 0.5));
        z-index: 8;

        &--left {
            left: 50%;
            transform: translateX(-35px);
            animation: footStep 2s ease-in-out infinite;
        }

        &--right {
            left: 50%;
            transform: translateX(15px);
            animation: footStep 2s ease-in-out infinite 1s;
        }
    }

    // Ters Üçgen Hologram Işığı
    &__hologramLight {
        position: absolute;
        top: 60px;
        left: 50%;
        transform: translateX(-50%);
        width: 600px;
        height: 400px;
        pointer-events: none;
        z-index: 11;
    }

    &__hologramPyramid {
        position: absolute;
        width: 0;
        height: 0;
        border-style: solid;
        animation: pyramidGlow 3s ease-in-out infinite;

        &--left {
            top: 0;
            left: 50%;
            transform: translateX(-250px);
            border-width: 0 100px 350px 100px;
            border-color: transparent transparent rgba(0, 255, 200, 0.3) transparent;
            filter: blur(8px) drop-shadow(0 0 30px rgba(0, 255, 200, 0.8));
        }

        &--right {
            top: 0;
            right: 50%;
            transform: translateX(250px);
            border-width: 0 100px 350px 100px;
            border-color: transparent transparent rgba(138, 43, 226, 0.3) transparent;
            filter: blur(8px) drop-shadow(0 0 30px rgba(138, 43, 226, 0.8));
            animation-delay: 0.4s;
        }
    }

    &__hologramMerge {
        position: absolute;
        top: 150px;
        left: 50%;
        transform: translateX(-50%);
        width: 400px;
        height: 300px;
        background: radial-gradient(ellipse at center,
            rgba(0, 255, 200, 0.4) 0%,
            rgba(138, 43, 226, 0.3) 30%,
            rgba(199, 125, 255, 0.2) 50%,
            transparent 70%);
        border-radius: 50%;
        animation: hologramGlow 2s ease-in-out infinite;
        filter: blur(15px);
    }

    // Hologram Container (Uzaylının Ellerinden Çıkan)
    &__hologram {
        position: relative;
        z-index: 12;
        filter: drop-shadow(0 0 50px rgba(0, 255, 200, 0.7));
        
        &::before {
            content: '';
            position: absolute;
            inset: -30px;
            background: radial-gradient(circle at center,
                rgba(0, 255, 200, 0.2) 0%,
                rgba(138, 43, 226, 0.15) 30%,
                transparent 60%);
            border-radius: 50%;
            animation: hologramGlow 3s ease-in-out infinite;
            pointer-events: none;
        }
    }

    // 3D Carousel Container
    &__carousel {
        width: 100%;
        height: 500px;
        position: relative;
        perspective: 1200px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    &__carouselInner {
        width: 100%;
        height: 100%;
        position: relative;
        transform-style: preserve-3d;
        transition: transform 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    }

    &__carouselItem {
        position: absolute;
        width: 280px;
        left: 50%;
        top: 50%;
        margin-left: -140px;
        margin-top: -150px;
        transition: all 0.8s ease;
        transform-style: preserve-3d;
        cursor: pointer;

        &.-active {
            .nav__prism {
                transform: scale(1.3);
                filter: drop-shadow(0 20px 60px rgba(138, 43, 226, 0.8));
            }

            .nav__action {
                opacity: 1;
                transform: translateY(0);
            }
        }

        &:not(.-active) {
            .nav__prism {
                transform: scale(0.7);
                opacity: 0.5;
            }

            .nav__action {
                opacity: 0;
                transform: translateY(20px);
            }
        }
    }

    // Arrow Buttons
    &__arrow {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        z-index: 100;
        background: rgba(138, 43, 226, 0.3);
        border: 2px solid rgba(138, 43, 226, 0.5);
        border-radius: 50%;
        width: 60px;
        height: 60px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.3s ease;
        backdrop-filter: blur(10px);
        box-shadow: 0 10px 40px rgba(138, 43, 226, 0.5),
                    inset 0 0 30px rgba(255, 255, 255, 0.1);

        svg {
            stroke: white;
            filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.8));
        }

        &:hover {
            background: rgba(138, 43, 226, 0.6);
            border-color: rgba(199, 125, 255, 0.8);
            transform: translateY(-50%) scale(1.1);
            box-shadow: 0 15px 50px rgba(138, 43, 226, 0.8);
        }

        &:active {
            transform: translateY(-50%) scale(1.05);
        }

        &--left {
            left: 20px;
        }

        &--right {
            right: 20px;
        }
    }

    // İndikatörler
    &__indicators {
        position: absolute;
        bottom: 30px;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        gap: 12px;
        z-index: 100;
    }

    &__indicator {
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        cursor: pointer;
        transition: all 0.3s ease;
        border: 2px solid rgba(138, 43, 226, 0.5);

        &.-active {
            background: linear-gradient(135deg, #C77DFF 0%, #9D4EDD 100%);
            width: 40px;
            border-radius: 6px;
            box-shadow: 0 0 20px rgba(199, 125, 255, 0.8);
        }

        &:hover:not(.-active) {
            background: rgba(199, 125, 255, 0.6);
            transform: scale(1.2);
        }
    }

    // 3D Prizma
    &__prism {
        width: 280px;
        height: 300px;
        position: relative;
        transform-style: preserve-3d;
        transition: all 0.8s ease;
        animation: prismFloat 4s ease-in-out infinite;
    }

    &__prismFace {
        position: absolute;
        width: 280px;
        height: 300px;
        border: 2px solid rgba(138, 43, 226, 0.3);
        display: flex;
        flex-direction: column;
        align-items: stretch;
        justify-content: space-between;
        padding: 25px 20px 20px;
        backface-visibility: hidden;
        overflow: visible;
        box-sizing: border-box;

        &--front {
            background: linear-gradient(145deg,
                rgba(25, 20, 50, 0.75) 0%,
                rgba(35, 25, 60, 0.7) 50%,
                rgba(30, 20, 55, 0.75) 100%);
            transform: translateZ(50px);
            box-shadow: 0 15px 50px rgba(138, 43, 226, 0.6),
                        0 5px 20px rgba(199, 125, 255, 0.5),
                        inset 0 0 80px rgba(138, 43, 226, 0.2),
                        0 0 50px rgba(0, 255, 200, 0.4);
            border-radius: 26px;
            border: 2px solid rgba(138, 43, 226, 0.5);
            backdrop-filter: blur(10px);
        }

        &--back {
            background: linear-gradient(145deg, rgba(90, 24, 154, 0.6) 0%, rgba(60, 9, 108, 0.7) 100%);
            transform: translateZ(-50px) rotateY(180deg);
            border-radius: 26px;
            box-shadow: inset 0 0 30px rgba(138, 43, 226, 0.5);
            backdrop-filter: blur(8px);
        }

        &--left {
            background: linear-gradient(145deg, rgba(157, 78, 221, 0.5) 0%, rgba(123, 44, 191, 0.6) 100%);
            width: 100px;
            transform: translateX(-140px) rotateY(-90deg);
            box-shadow: inset 0 0 20px rgba(157, 78, 221, 0.4);
            backdrop-filter: blur(8px);
        }

        &--right {
            background: linear-gradient(145deg, rgba(199, 125, 255, 0.5) 0%, rgba(157, 78, 221, 0.6) 100%);
            width: 100px;
            transform: translateX(140px) rotateY(90deg);
            box-shadow: inset 0 0 20px rgba(199, 125, 255, 0.4);
            backdrop-filter: blur(8px);
        }

        &--top {
            height: 100px;
            background: linear-gradient(145deg, rgba(224, 170, 255, 0.4) 0%, rgba(199, 125, 255, 0.5) 100%);
            transform: translateY(-150px) rotateX(90deg);
            box-shadow: inset 0 0 20px rgba(224, 170, 255, 0.4);
            backdrop-filter: blur(8px);
        }

        &--bottom {
            height: 100px;
            background: linear-gradient(145deg, rgba(60, 9, 108, 0.7) 0%, rgba(30, 5, 60, 0.8) 100%);
            transform: translateY(150px) rotateX(-90deg);
            box-shadow: inset 0 0 20px rgba(90, 24, 154, 0.4);
            backdrop-filter: blur(8px);
        }
    }

    // İçerik Stilleri (Hologram)
    &__image {
        width: 100%;
        height: 130px;
        object-fit: contain;
        margin-bottom: 18px;
        filter: drop-shadow(0 0 25px rgba(138, 43, 226, 0.7))
                drop-shadow(0 0 10px rgba(255, 255, 255, 0.3));
        transition: all 0.5s ease;
        animation: hologramFlicker 3s ease-in-out infinite;
    }

    &__itemContent {
        text-align: center;
        padding: 0 18px;
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    &__title {
        font-weight: 800;
        letter-spacing: 0.8px;
        color: #ffffff !important;
        font-size: 19px !important;
        margin-bottom: 10px;
        line-height: 1.3;
        text-shadow: 0 0 25px rgba(138, 43, 226, 1),
                     0 3px 12px rgba(0, 0, 0, 0.7),
                     0 0 10px rgba(255, 255, 255, 0.5);
    }

    &__subtitle {
        color: rgba(255, 255, 255, 0.95) !important;
        font-size: 13px !important;
        line-height: 1.5;
        margin-bottom: 15px;
        text-shadow: 0 2px 8px rgba(0, 0, 0, 0.7),
                     0 0 15px rgba(138, 43, 226, 0.5);
        font-weight: 500;
    }

    &__action {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 8px;
        font-size: 16px;
        padding: 12px 18px;
        background: linear-gradient(135deg, rgba(138, 43, 226, 0.5) 0%, rgba(199, 125, 255, 0.4) 100%);
        border-radius: 50px;
        font-weight: 700;
        color: #ffffff !important;
        transition: all 0.4s ease;
        box-shadow: 0 5px 20px rgba(138, 43, 226, 0.6),
                    inset 0 2px 8px rgba(255, 255, 255, 0.4);
        border: 2px solid rgba(138, 43, 226, 0.7);
        width: calc(100% - 30px);
        margin: 0 auto;
        backdrop-filter: blur(8px);
        text-shadow: 0 2px 5px rgba(0, 0, 0, 0.5);
    }

    &__actionIcon {
        font-size: 20px;
        filter: drop-shadow(0 0 15px rgba(255, 200, 50, 0.8))
                drop-shadow(0 0 5px rgba(255, 255, 255, 0.5));
        animation: iconSpin 3s linear infinite;
    }

    &__oldItem {
        text-decoration: none;
        position: relative;
        background: linear-gradient(145deg, 
            rgba(255, 255, 255, 0.95) 0%, 
            rgba(230, 230, 250, 0.9) 50%,
            rgba(255, 255, 255, 0.95) 100%);
        box-shadow: 0 8px 40px rgba(138, 43, 226, 0.4),
            0 4px 20px rgba(75, 0, 130, 0.3),
            inset 0 0 60px rgba(255, 255, 255, 0.5);
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        min-height: 182px;
        padding: 16px;
        border-radius: 26px;
        margin-top: 74px;
        color: #000;
        transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        border: 3px solid rgba(138, 43, 226, 0.3);
        background-clip: padding-box;
        cursor: pointer;
        animation: rollIn 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55) backwards;
        z-index: 1;

        &::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 50%;
            background: radial-gradient(ellipse at top,
                    rgba(138, 43, 226, 0.15) 0%,
                    rgba(75, 0, 130, 0.1) 40%,
                    transparent 80%);
            opacity: 1;
            transition: all 0.5s ease;
            border-radius: 26px 26px 0 0;
        }

        &::after {
            content: '';
            position: absolute;
            inset: -3px;
            background: linear-gradient(135deg,
                    rgba(138, 43, 226, 0.6) 0%,
                    rgba(75, 0, 130, 0.8) 50%,
                    rgba(138, 43, 226, 0.6) 100%);
            border-radius: 26px;
            opacity: 0;
            transition: opacity 0.5s ease;
            z-index: -1;
            animation: borderGlow 2s ease-in-out infinite;
        }

        &:hover,
        &.-clicked {
            transform: translateY(-18px) scale(1.05) rotate(360deg);
            box-shadow: 0 25px 60px rgba(138, 43, 226, 0.6),
                0 15px 40px rgba(75, 0, 130, 0.5),
                0 5px 20px rgba(138, 43, 226, 0.4),
                inset 0 0 80px rgba(255, 255, 255, 0.3);
            border-color: rgba(138, 43, 226, 0.8);

            &::before {
                background: radial-gradient(ellipse at top,
                        rgba(138, 43, 226, 0.25) 0%,
                        rgba(75, 0, 130, 0.15) 40%,
                        transparent 80%);
            }

            &::after {
                opacity: 1;
            }

            .nav__glow {
                opacity: 1;
            }

            .nav__image {
                transform: translate(-50%, -50%) scale(1.3) rotate(360deg);
                filter: drop-shadow(0 0 30px rgba(138, 43, 226, 0.8));
            }

            .nav__title {
                color: #7B2CBF;
                transform: translateY(-5px) scale(1.05);
                letter-spacing: 0.8px;
                text-shadow: 0 0 20px rgba(138, 43, 226, 0.6);
            }

            .nav__subtitle {
                color: #5a5a9a;
            }

            .nav__action {
                background: linear-gradient(135deg, #7B2CBF 0%, #9D4EDD 50%, #C77DFF 100%);
                background-size: 200% 200%;
                background-position: 100% 50%;
                color: white;
                transform: translateY(-8px) scale(1.08);
                box-shadow: 0 8px 30px rgba(138, 43, 226, 0.7),
                    0 4px 15px rgba(157, 78, 221, 0.5),
                    inset 0 0 20px rgba(255, 255, 255, 0.3);
                animation: actionPulse 1s ease-in-out infinite;
            }

            .nav__actionIcon {
                transform: scale(1.3) translateX(10px) rotate(45deg);
                filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.8));
            }
        }

        &:active {
            transform: translateY(-6px) scale(1.01);
            box-shadow: 0 12px 25px rgba(0, 0, 0, 0.22),
                0 6px 12px rgba(0, 0, 0, 0.15),
                0 2px 6px rgba(0, 0, 0, 0.1);
        }
    }

    &__image {
        width: 140px;
        position: absolute;
        top: 0;
        left: 50%;
        transform: translate(-50%, -50%);
        transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    }

    &__itemContent {
        margin-top: 55px;
        position: relative;
        z-index: 1;
    }

    &__title {
        font-weight: 800;
        letter-spacing: 0.5px;
        color: #1a1a3a;
        font-size: 18px;
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        text-align: center;
        margin-bottom: 5px;
        line-height: 1.3;
        text-shadow: 0 2px 10px rgba(138, 43, 226, 0.2);
    }

    &__subtitle {
        color: #7a7a7a;
        font-size: 12px;
        margin-top: 4px;
        line-height: 1.5;
        text-align: center;
        font-weight: 500;
        margin-bottom: 16px;
        transition: all 0.3s ease;
    }

    &__action {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 12.5px;
        padding: 12px 16px;
        background: linear-gradient(135deg, rgba(123, 44, 191, 0.15) 0%, rgba(157, 78, 221, 0.1) 100%);
        border-radius: 50px;
        font-weight: 700;
        color: #7B2CBF;
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        box-shadow: 0 4px 15px rgba(138, 43, 226, 0.3),
            0 2px 8px rgba(75, 0, 130, 0.2),
            inset 0 1px 5px rgba(255, 255, 255, 0.6);
        letter-spacing: 0.5px;
        position: relative;
        border: 2px solid rgba(138, 43, 226, 0.25);

        &::before {
            content: '✨';
            position: absolute;
            top: 50%;
            left: -20px;
            font-size: 16px;
            transform: translateY(-50%);
            animation: sparkle 2s linear infinite;
        }
    }

    &__actionIcon {
        font-size: 24px;
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        flex-shrink: 0;
        filter: drop-shadow(0 0 10px rgba(255, 200, 50, 0.6));
    }
}

// 3D Prizma ve Uzay Animasyonları
@keyframes prismFloat {
    0%, 100% {
        transform: translateY(0) rotateX(0deg) rotateZ(0deg);
    }
    33% {
        transform: translateY(-10px) rotateX(5deg) rotateZ(2deg);
    }
    66% {
        transform: translateY(5px) rotateX(-3deg) rotateZ(-2deg);
    }
}

@keyframes rollIn {
    0% {
        opacity: 0;
        transform: translateY(100px) rotate(-720deg) scale(0.3);
    }
    50% {
        transform: translateY(-20px) rotate(-360deg) scale(1.1);
    }
    100% {
        opacity: 1;
        transform: translateY(0) rotate(0deg) scale(1);
    }
}

@keyframes glowPulse {
    0%, 100% {
        opacity: 0.3;
    }
    50% {
        opacity: 0.8;
    }
}

@keyframes twinkle {
    0%, 100% {
        opacity: 0.3;
        transform: scale(1);
    }
    50% {
        opacity: 1;
        transform: scale(1.5);
    }
}

@keyframes float {
    0%, 100% {
        transform: translateY(0px);
    }
    50% {
        transform: translateY(-10px);
    }
}

@keyframes rocketFly {
    0% {
        left: -50px;
        bottom: 10%;
    }
    50% {
        left: 50%;
        bottom: 80%;
    }
    100% {
        left: 120%;
        bottom: 10%;
    }
}

@keyframes planetFloat {
    0%, 100% {
        transform: translateY(0) rotate(0deg);
    }
    33% {
        transform: translateY(-20px) rotate(120deg);
    }
    66% {
        transform: translateY(10px) rotate(240deg);
    }
}

@keyframes alienFloat {
    0%, 100% {
        transform: translateX(-50%) translateY(0);
    }
    50% {
        transform: translateX(-50%) translateY(-10px);
    }
}

@keyframes headBob {
    0%, 100% {
        transform: rotate(-5deg);
    }
    50% {
        transform: rotate(5deg);
    }
}

@keyframes armOpenLeft {
    0% {
        transform: rotate(-15deg);
    }
    100% {
        transform: rotate(-45deg);
    }
}

@keyframes armOpenRight {
    0% {
        transform: rotate(15deg);
    }
    100% {
        transform: rotate(45deg);
    }
}

@keyframes armWaveLeft {
    0%, 100% {
        transform: rotate(-45deg);
    }
    50% {
        transform: rotate(-55deg);
    }
}

@keyframes armWaveRight {
    0%, 100% {
        transform: rotate(45deg);
    }
    50% {
        transform: rotate(55deg);
    }
}

@keyframes pyramidGlow {
    0%, 100% {
        opacity: 0.5;
        filter: blur(8px);
    }
    50% {
        opacity: 1;
        filter: blur(10px);
    }
}

@keyframes handPulse {
    0%, 100% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.1);
    }
}

@keyframes legWalk {
    0%, 100% {
        transform: translateX(-20px) rotate(0deg);
    }
    50% {
        transform: translateX(-20px) rotate(10deg);
    }
}

@keyframes footStep {
    0%, 100% {
        transform: translateX(-35px) translateY(0) rotate(-10deg);
    }
    50% {
        transform: translateX(-35px) translateY(-5px) rotate(0deg);
    }
}

@keyframes hologramGlow {
    0%, 100% {
        opacity: 0.5;
        transform: scale(1);
    }
    50% {
        opacity: 1;
        transform: scale(1.1);
    }
}

@keyframes beamPulse {
    0%, 100% {
        opacity: 0.4;
        filter: blur(1px);
    }
    50% {
        opacity: 1;
        filter: blur(0px);
    }
}

@keyframes hologramFlicker {
    0%, 100% {
        opacity: 1;
        filter: drop-shadow(0 0 20px rgba(138, 43, 226, 0.6));
    }
    50% {
        opacity: 0.9;
        filter: drop-shadow(0 0 30px rgba(0, 255, 200, 0.8));
    }
}

@keyframes iconSpin {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}

// Vue Transitions
.hologram-fade-enter-active,
.hologram-fade-leave-active {
    transition: opacity 1.2s ease-out, transform 1.2s ease-out;
}

.hologram-fade-enter-from {
    opacity: 0;
    transform: scale(0.5) translateY(50px);
}

.hologram-fade-enter-to {
    opacity: 1;
    transform: scale(1) translateY(0);
}

.carousel-appear-enter-active {
    transition: opacity 1.5s ease-out 0.5s, transform 1.5s cubic-bezier(0.68, -0.55, 0.265, 1.55) 0.5s;
}

.carousel-appear-enter-from {
    opacity: 0;
    transform: scale(0.3) rotateY(180deg);
}

.carousel-appear-enter-to {
    opacity: 1;
    transform: scale(1) rotateY(0deg);
}


@media (max-width: 768px) {
    .nav {
        padding: 50px 15px 70px;
        min-height: 500px;

        &__alienHead {
            font-size: 60px;
        }

        &__alienTorso {
            width: 45px;
            height: 60px;
        }

        &__alienArm {
            width: 55px;
            height: 6px;
            top: 70px;

            &--left {
                left: -8px;
            }

            &--right {
                right: -8px;
            }
        }

        &__alienHand {
            font-size: 30px;
        }

        &__alienLeg {
            width: 8px;
            height: 50px;
            bottom: -70px;

            &--left {
                transform: translateX(-15px);
            }

            &--right {
                transform: translateX(8px);
            }
        }

        &__alienFoot {
            font-size: 20px;
            bottom: -95px;

            &--left {
                transform: translateX(-28px);
            }

            &--right {
                transform: translateX(12px);
            }
        }

        &__hologramLight {
            width: 400px;
            height: 320px;
            top: 50px;
        }

        &__hologramPyramid {
            &--left {
                transform: translateX(-170px);
                border-width: 0 70px 280px 70px;
            }

            &--right {
                transform: translateX(170px);
                border-width: 0 70px 280px 70px;
            }
        }

        &__hologramMerge {
            width: 300px;
            height: 240px;
            top: 120px;
        }

        &__rocket {
            font-size: 30px;
        }

        &__planet {
            font-size: 45px;
        }

        &__carousel {
            height: 400px;
        }

        &__carouselItem {
            width: 220px;
            margin-left: -110px;
        }

        &__prism {
            width: 220px;
            height: 260px;
        }

        &__prismFace {
            width: 220px;
            height: 260px;
            padding: 20px 15px 15px;

            &--left, &--right {
                width: 80px;
                transform: translateX(-110px) rotateY(-90deg);
            }

            &--right {
                transform: translateX(110px) rotateY(90deg);
            }

            &--top {
                height: 80px;
                transform: translateY(-130px) rotateX(90deg);
            }

            &--bottom {
                height: 80px;
                transform: translateY(130px) rotateX(-90deg);
            }
        }

        &__image {
            width: 100%;
            height: 110px;
        }

        &__title {
            font-size: 17px;
            letter-spacing: 0.6px;
        }

        &__subtitle {
            font-size: 12px;
            font-weight: 500;
        }

        &__action {
            padding: 10px 14px;
            font-size: 12px;
        }

        &__actionIcon {
            font-size: 18px;
        }

        &__arrow {
            width: 50px;
            height: 50px;

            svg {
            width: 24px;
            height: 24px;
        }

            &--left {
                left: 10px;
            }

            &--right {
                right: 10px;
            }
        }

        &__indicators {
            bottom: 25px;
            gap: 8px;
        }

        &__indicator {
            width: 10px;
            height: 10px;

            &.-active {
                width: 30px;
            }
        }
    }
}

@media (max-width: 480px) {
    .nav {
        padding: 40px 10px 60px;
        min-height: 450px;

        &__alienHead {
            font-size: 55px;
        }

        &__alienTorso {
            width: 40px;
            height: 55px;
        }

        &__alienArm {
            width: 50px;
            height: 6px;
            top: 65px;

            &--left {
                left: -7px;
            }

            &--right {
                right: -7px;
            }
        }

        &__alienHand {
            font-size: 28px;
        }

        &__alienLeg {
            width: 7px;
            height: 45px;
            bottom: -65px;

            &--left {
                transform: translateX(-14px);
            }

            &--right {
                transform: translateX(7px);
            }
        }

        &__alienFoot {
            font-size: 18px;
            bottom: -88px;

            &--left {
                transform: translateX(-25px);
            }

            &--right {
                transform: translateX(10px);
            }
        }

        &__hologramLight {
            width: 380px;
            height: 300px;
            top: 45px;
        }

        &__hologramPyramid {
            &--left {
                transform: translateX(-160px);
                border-width: 0 65px 260px 65px;
            }

            &--right {
                transform: translateX(160px);
                border-width: 0 65px 260px 65px;
            }
        }

        &__hologramMerge {
            width: 280px;
            height: 220px;
            top: 110px;
        }

        &__rocket {
            font-size: 25px;
        }

        &__planet {
            font-size: 40px;
        }

        &__carousel {
            height: 360px;
        }

        &__carouselItem {
            width: 200px;
            margin-left: -100px;
        }

        &__prism {
            width: 200px;
            height: 240px;
        }

        &__prismFace {
            width: 200px;
            height: 240px;

            &--left, &--right {
                width: 70px;
                transform: translateX(-100px) rotateY(-90deg);
            }

            &--right {
                transform: translateX(100px) rotateY(90deg);
            }

            &--top {
                height: 70px;
                transform: translateY(-120px) rotateX(90deg);
            }

            &--bottom {
                height: 70px;
                transform: translateY(120px) rotateX(-90deg);
            }
        }

        &__image {
            width: 100%;
            height: 90px;
        }

        &__title {
            font-size: 13px;
        }

        &__subtitle {
            font-size: 9px;
        }

        &__action {
            padding: 7px 11px;
            font-size: 9px;
        }

        &__actionIcon {
            font-size: 13px;
        }

        &__arrow {
            width: 45px;
            height: 45px;

            svg {
                width: 20px;
                height: 20px;
            }

            &--left {
                left: 5px;
            }

            &--right {
                right: 5px;
            }
        }

        &__indicators {
            bottom: 20px;
            gap: 6px;
        }

        &__indicator {
            width: 8px;
            height: 8px;

            &.-active {
                width: 25px;
            }
        }
    }
}

@media (max-width: 380px) {
    .nav {
        padding: 35px 8px 55px;
        min-height: 420px;

        &__alienHead {
            font-size: 50px;
        }

        &__alienTorso {
            width: 35px;
            height: 50px;
        }

        &__alienArm {
            width: 45px;
            height: 5px;
            top: 60px;

            &--left {
                left: -6px;
            }

            &--right {
                right: -6px;
            }
        }

        &__alienHand {
            font-size: 24px;
        }

        &__alienLeg {
            width: 6px;
            height: 40px;
            bottom: -60px;

            &--left {
                transform: translateX(-12px);
            }

            &--right {
                transform: translateX(6px);
            }
        }

        &__alienFoot {
            font-size: 16px;
            bottom: -78px;

            &--left {
                transform: translateX(-22px);
            }

            &--right {
                transform: translateX(8px);
            }
        }

        &__hologramLight {
            width: 350px;
            height: 280px;
            top: 40px;
        }

        &__hologramPyramid {
            &--left {
                transform: translateX(-145px);
                border-width: 0 60px 240px 60px;
            }

            &--right {
                transform: translateX(145px);
                border-width: 0 60px 240px 60px;
            }
        }

        &__hologramMerge {
            width: 260px;
            height: 200px;
            top: 100px;
        }

        &__rocket {
            font-size: 22px;
        }

        &__planet {
            font-size: 35px;
        }

        &__carousel {
            height: 340px;
        }

        &__carouselItem {
            width: 180px;
            margin-left: -90px;
        }

        &__prism {
            width: 180px;
            height: 220px;
        }

        &__prismFace {
            width: 180px;
            height: 220px;

            &--left, &--right {
                width: 60px;
                transform: translateX(-90px) rotateY(-90deg);
            }

            &--right {
                transform: translateX(90px) rotateY(90deg);
            }

            &--top {
                height: 60px;
                transform: translateY(-110px) rotateX(90deg);
            }

            &--bottom {
                height: 60px;
                transform: translateY(110px) rotateX(-90deg);
            }
        }

        &__image {
            width: 100%;
            height: 90px;
        }

        &__title {
            font-size: 15px;
            letter-spacing: 0.5px;
        }

        &__subtitle {
            font-size: 10px;
            font-weight: 500;
        }

        &__action {
            padding: 8px 12px;
            font-size: 10px;
        }

        &__actionIcon {
            font-size: 16px;
        }

        &__arrow {
            width: 40px;
            height: 40px;

            svg {
                width: 18px;
                height: 18px;
            }

            &--left {
                left: 3px;
            }

            &--right {
                right: 3px;
            }
        }

        &__indicators {
            bottom: 15px;
            gap: 5px;
        }

        &__indicator {
            width: 7px;
            height: 7px;

            &.-active {
            width: 22px;
            }
        }
    }
}

// Desktop için
@media (min-width: 769px) {
    .nav {
        padding: 70px 30px 120px;
        min-height: 650px;

        &__alienHead {
            font-size: 100px;
        }

        &__alienTorso {
            width: 80px;
            height: 110px;
        }

        &__alienArm {
            width: 90px;
            height: 10px;
            top: 120px;

            &--left {
                left: -15px;
            }

            &--right {
                right: -15px;
            }
        }

        &__alienHand {
            font-size: 50px;

            .nav__alienArm--left & {
                right: -30px;
                top: -20px;
            }

            .nav__alienArm--right & {
                left: -30px;
                top: -20px;
            }
        }

        &__alienLeg {
            width: 12px;
            height: 75px;
            bottom: -115px;

            &--left {
                transform: translateX(-25px);
            }

            &--right {
                transform: translateX(13px);
            }
        }

        &__alienFoot {
            font-size: 30px;
            bottom: -150px;

            &--left {
                transform: translateX(-42px);
            }

            &--right {
                transform: translateX(18px);
            }
        }

        &__hologramLight {
            width: 700px;
            height: 450px;
            top: 70px;
        }

        &__hologramPyramid {
            &--left {
                transform: translateX(-280px);
                border-width: 0 110px 400px 110px;
            }

            &--right {
                transform: translateX(280px);
                border-width: 0 110px 400px 110px;
            }
        }

        &__hologramMerge {
            width: 500px;
            height: 350px;
            top: 180px;
        }

        &__rocket {
            font-size: 50px;
        }

        &__planet {
            font-size: 75px;
        }

        &__carousel {
            height: 450px;
        }

        &__carouselItem {
            width: 260px;
            margin-left: -130px;
        }

        &__prism {
            width: 260px;
            height: 290px;
        }

        &__prismFace {
            width: 260px;
            height: 290px;
            padding: 22px 18px 18px;

            &--left, &--right {
                width: 90px;
                transform: translateX(-130px) rotateY(-90deg);
            }

            &--right {
                transform: translateX(130px) rotateY(90deg);
            }

            &--top {
                height: 90px;
                transform: translateY(-145px) rotateX(90deg);
            }

            &--bottom {
                height: 90px;
                transform: translateY(145px) rotateX(-90deg);
            }
        }

        &__image {
            width: 100%;
            height: 140px;
        }

        &__title {
            font-size: 20px;
            letter-spacing: 0.8px;
        }

        &__subtitle {
            font-size: 14px;
            font-weight: 500;
        }

        &__action {
            padding: 13px 18px;
            font-size: 14px;
        }

        &__actionIcon {
            font-size: 22px;
        }

        &__arrow {
            width: 65px;
            height: 65px;

            &--left {
                left: 25px;
            }

            &--right {
                right: 25px;
            }
        }

        &__indicators {
            bottom: 35px;
        }
    }
}
</style>