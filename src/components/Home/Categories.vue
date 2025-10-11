<template>
    <div class="nav">
        <div v-for="category in categories" :key="category.id" @click="handleCategoryClick(category.attributes.slug)"
            :class="['nav__item', { '-clicked': clickedId === category.id }]">
            <img class="nav__image" :src="category.attributes.image.data.attributes.url" alt="burger">
            <div class="nav__itemContent">
                <div class="nav__title">{{ category.attributes.name }}</div>
                <div class="nav__subtitle">{{ category.attributes.description }}</div>
            </div>
            <div class="nav__action">
                Seçim için tıklayınız
                <PointerIcon class="nav__actionIcon" />
            </div>
        </div>
    </div>
</template>
<script>
import PointerIcon from '../../assets/icons/pointer-icon.vue'

export default {
    name: "Categories",
    data() {
        return {
            clickedId: null
        }
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
    methods: {
        handleCategoryClick(slug) {
            const clickedCategory = this.categories.find(cat => cat.attributes.slug === slug);
            this.clickedId = clickedCategory.id;
            setTimeout(() => {
                this.$router.push('/products/' + slug);
            }, 1000);
        }
    },
};
</script>
<style lang="scss" scoped>
.nav {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 14px;
    padding-bottom: 60px;
    animation: fadeIn 0.6s ease-out;

    &__item {
        text-decoration: none;
        position: relative;
        background: linear-gradient(145deg, #ffffff 0%, #fefefe 100%);
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.18),
            0 3px 8px rgba(0, 0, 0, 0.12),
            0 1px 3px rgba(0, 0, 0, 0.08);
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        min-height: 182px;
        padding: 16px;
        border-radius: 26px;
        margin-top: 74px;
        color: #000;
        transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        border: 2px solid rgba(0, 0, 0, 0.06);
        background-clip: padding-box;
        cursor: pointer;

        &::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 50%;
            background: radial-gradient(ellipse at top,
                    rgba(187, 124, 5, 0.04) 0%,
                    rgba(212, 150, 36, 0.02) 40%,
                    transparent 80%);
            opacity: 1;
            transition: all 0.5s ease;
            border-radius: 26px 26px 0 0;
        }

        &::after {
            content: '';
            position: absolute;
            inset: -2px;
            background: linear-gradient(135deg,
                    rgba(187, 124, 5, 0.15) 0%,
                    rgba(212, 150, 36, 0.25) 50%,
                    rgba(187, 124, 5, 0.15) 100%);
            border-radius: 26px;
            opacity: 0;
            transition: opacity 0.5s ease;
            z-index: -1;
        }

        &:hover,
        &.-clicked {
            transform: translateY(-12px) scale(1.02);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.25),
                0 10px 20px rgba(0, 0, 0, 0.18),
                0 5px 10px rgba(187, 124, 5, 0.2),
                0 2px 5px rgba(0, 0, 0, 0.12);
            border-color: rgba(187, 124, 5, 0.25);

            &::before {
                background: radial-gradient(ellipse at top,
                        rgba(187, 124, 5, 0.08) 0%,
                        rgba(212, 150, 36, 0.05) 40%,
                        transparent 80%);
            }

            &::after {
                opacity: 1;
            }

            .nav__image {
                transform: translate(-50%, -50%) scale(1.18) rotate(-5deg);
            }

            .nav__title {
                color: #bb7c05;
                transform: translateY(-3px);
                letter-spacing: 0.5px;
            }

            .nav__subtitle {
                color: #5a5a5a;
            }

            .nav__action {
                background: linear-gradient(135deg, #bb7c05 0%, #d49624 50%, #bb7c05 100%);
                background-size: 200% 200%;
                background-position: 100% 50%;
                color: white;
                transform: translateY(-5px) scale(1.05);
                box-shadow: 0 6px 16px rgba(187, 124, 5, 0.55),
                    0 3px 8px rgba(187, 124, 5, 0.4),
                    0 1px 4px rgba(0, 0, 0, 0.2);
            }

            .nav__actionIcon {
                background: white;
                fill: #bb7c05;
                transform: scale(1.2) translateX(5px) rotate(15deg);
                box-shadow: 0 3px 10px rgba(255, 255, 255, 0.95),
                    0 1px 5px rgba(187, 124, 5, 0.3);
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
        letter-spacing: 0.3px;
        color: #2c3e50;
        font-size: 18px;
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        text-align: center;
        margin-bottom: 5px;
        line-height: 1.3;
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
        background: linear-gradient(135deg, rgba(187, 124, 5, 0.12) 0%, rgba(212, 150, 36, 0.08) 100%);
        border-radius: 50px;
        font-weight: 700;
        color: #bb7c05;
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        box-shadow: 0 3px 10px rgba(187, 124, 5, 0.2),
            0 1px 4px rgba(0, 0, 0, 0.12),
            inset 0 1px 3px rgba(255, 255, 255, 0.8);
        letter-spacing: 0.4px;
        position: relative;
        overflow: hidden;
        border: 1px solid rgba(187, 124, 5, 0.15);

        &::before {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            width: 0;
            height: 0;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: translate(-50%, -50%);
            transition: width 0.6s ease, height 0.6s ease;
        }
    }

    &__actionIcon {
        width: 30px;
        height: 30px;
        background: linear-gradient(135deg, #bb7c05 0%, #d49624 100%);
        fill: white;
        border-radius: 50%;
        padding: 6px;
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        box-shadow: 0 3px 12px rgba(187, 124, 5, 0.5),
            0 1px 5px rgba(0, 0, 0, 0.2);
        flex-shrink: 0;
        position: relative;
        z-index: 1;
        border: 1px solid rgba(255, 255, 255, 0.2);
    }
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(20px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}


@media (max-width: 768px) {
    .nav {
        gap: 12px;
        padding-bottom: 50px;

        &__item {
            min-height: 168px;
            padding: 11px;
            border-radius: 18px;
            margin-top: 68px;
        }

        &__image {
            width: 125px;
        }

        &__itemContent {
            margin-top: 52px;
        }

        &__title {
            font-size: 15px;
        }

        &__subtitle {
            font-size: 11px;
        }

        &__action {
            margin-top: 16px;
            padding: 8px 10px;
            font-size: 11px;
        }

        &__actionIcon {
            width: 24px;
            height: 24px;
        }
    }
}

@media (max-width: 480px) {
    .nav {
        gap: 10px;
        padding-bottom: 45px;

        &__item {
            min-height: 160px;
            padding: 10px;
            border-radius: 16px;
            margin-top: 62px;
        }

        &__image {
            width: 115px;
        }

        &__itemContent {
            margin-top: 48px;
        }

        &__title {
            font-size: 14px;
            letter-spacing: 0.3px;
        }

        &__subtitle {
            font-size: 10px;
            margin-top: 4px;
        }

        &__action {
            margin-top: 14px;
            padding: 7px 9px;
            font-size: 10px;
        }

        &__actionIcon {
            width: 22px;
            height: 22px;
            padding: 4px;
        }
    }
}

@media (max-width: 380px) {
    .nav {
        gap: 8px;

        &__item {
            min-height: 150px;
            padding: 9px;
            margin-top: 58px;
        }

        &__image {
            width: 105px;
        }

        &__itemContent {
            margin-top: 44px;
        }

        &__title {
            font-size: 13px;
        }

        &__subtitle {
            font-size: 9px;
        }

        &__action {
            margin-top: 12px;
            padding: 6px 8px;
            font-size: 9px;
        }

        &__actionIcon {
            width: 20px;
            height: 20px;
        }
    }
}

// Desktop için grid layout
@media (min-width: 769px) {
    .nav {
        grid-template-columns: repeat(3, 1fr);
        gap: 14px;
        padding-bottom: 50px;

        &__item {
            min-height: 160px;
            padding: 14px;
            border-radius: 22px;
            margin-top: 60px;

            &:hover,
            &.-clicked {
                transform: translateY(-12px) scale(1.03);
                
                .nav__image {
                    transform: translate(-50%, -50%) scale(1.2) rotate(-7deg);
                }

                .nav__action {
                    transform: translateY(-5px) scale(1.06);
                }

                .nav__actionIcon {
                    transform: scale(1.25) translateX(5px) rotate(18deg);
                }
            }
        }

        &__image {
            width: 125px;
        }

        &__itemContent {
            margin-top: 50px;
        }

        &__title {
            font-size: 16px;
        }

        &__subtitle {
            font-size: 11px;
            margin-bottom: 14px;
        }

        &__action {
            padding: 10px 14px;
            font-size: 11px;
        }

        &__actionIcon {
            width: 28px;
            height: 28px;
        }
    }
}

// Çok büyük ekranlar için 4 sütunlu grid
@media (min-width: 1400px) {
    .nav {
        grid-template-columns: repeat(4, 1fr);
        gap: 16px;
        padding-bottom: 60px;
    }
}
</style>