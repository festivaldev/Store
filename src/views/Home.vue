<script lang="ts">

    import { Component, Vue } from "vue-property-decorator";

    import AgContainer from "@/components/AgContainer.vue";
    import AgNavigation from "@/components/AgNavigation.vue";
    import AgNavigationAnchor from "@/components/AgNavigationAnchor.vue";
    import AgProgress from "@/components/AgProgress.vue";

    @Component({
        components: {
            AgContainer,
            AgNavigation,
            AgNavigationAnchor,
            AgProgress
        },
    })
    export default class Home extends Vue {}

</script>

<template>

    <div class="page">

        <ag-navigation scrollTarget="#hero">
            <a href="https://aternos.games/discord" class="no-js discord" style="font-size: 26px"><i class="fab fa-discord"></i></a>
            <a href="#about">About</a>
            <a href="#how">How?</a>
            <a href="#participate">Participate</a>
            <a href="#roadmap">Roadmap</a>
            <a href="https://github.com/aternosgames" class="no-js github" style="font-size: 26px"><i class="fab fa-github"></i></a>
        </ag-navigation>

        <div class="gradient-background">
            <ag-container id="hero">
                <section class="hero-content">
                    <div>
                        <h1>Aternos Games</h1>
                        <h2>An <em>all open-source</em>, <em>international</em>, <em>community-driven</em> and <em>100% free</em> Minecraft 1.13 minigame network.</h2>
                    </div>
                </section>
            </ag-container>
        </div>

        <ag-navigation-anchor id="about" />
        <section class="promo">
            <ag-container>
                <article class="promo-article">
                    <h1>About</h1>
                    <p>We want to create a completely new Minecraft minigame experience. To achieve this, we are reconsidering all basic concepts of existing minigame networks. These are our main approaches:</p>
                    <div class="flex">
                        <div>
                            <h4><i class="fab fa-creative-commons-nc"></i>Free</h4>
                            <p>We want to treat every player the same. There is no possibility to pay for anything, no paid ranks, no paid cosmetics and no paid loot boxes.</p>
                        </div>
                        <div>
                            <h4><i class="fas fa-users"></i>Community-driven</h4>
                            <p>We want to give everyone the ability to participate in creating a healthy community. Everybody can help to moderate the network and collectively punish bad behaviour.</p>
                        </div>
                        <div>
                            <h4><i class="fab fa-osi"></i>Open-source</h4>
                            <p>We want to give every developer the opportunity to contribute. Every single line of code is open sourced under the MIT license so that it is available for everyone.</p>
                        </div>
                    </div>
                </article>
            </ag-container>
        </section>

        <ag-navigation-anchor id="how" />
        <section class="promo">
            <ag-container>
                <article class="promo-article">
                    <h1>How?</h1>
                    <p>Aternos is running entirely free Minecraft servers for more than 5 years funded by ads. It is now one of the biggest hosting providers in the world with more than 7 million registered users and more than 800,000 players every month. Aternos hosting power is able to run more than 5,000 Minecraft servers at the same time. This technical and financial power provides Aternos Games with the foundation it needs to start one of the biggest Minecraft minigame networks in the world. Later on, we want to cover the expenses through ads with the knowledge and experience that we’ve gained through running a successful ad-funded company for years.</p>
                </article>
            </ag-container>
        </section>

        <ag-navigation-anchor id="participate" />
        <section class="promo">
            <ag-container>
                <article class="promo-article">
                    <h1>Participate</h1>
                    <p>We need <strong>you</strong>. Creating a (cool) Minecraft minigame network is hard, but it is impossible without you, you talented beautiful person. But how can you help?</p>
                    <div class="flex">
                        <div>
                            <h4><i class="fas fa-code"></i>Develop</h4>
                            <p>Everything is open source, just head into our <a href="https://github.com/aternosgames">GitHub repositories</a> and start coding wherever you want. If you have questions or want to talk to other developers, join our Discord server.</p>
                        </div>
                        <div>
                            <h4><i class="fas fa-cubes"></i>Build</h4>
                            <p>Materialising your dreams block by block in Minecraft is your passion? Join our Discord server to meet like-minded players and get to know when anybody needs your talent to create amazing maps.</p>
                        </div>
                        <div>
                            <h4><i class="fas fa-pencil-alt"></i>Concept</h4>
                            <p>Do you have ideas? Do you want to write the concept for a minigame? Meet with other creative minds on our Discord server and start hatching your ideas to become living dreams.</p>
                        </div>
                        <div>
                            <h4><i class="far fa-life-ring"></i>Moderate</h4>
                            <p>Do you get on well with people and want to help to keep the community healthy? We are really glad and you are welcome on our Discord server to engage with others and start moderating when the network goes online. A special application is not necessary.</p>
                        </div>
                    </div>

                    <h2><a href="https://aternos.games/discord" style="color: inherit; text-decoration: none">Join our Discord server now!</a></h2>
                </article>
            </ag-container>
        </section>

        <ag-navigation-anchor id="roadmap" />
        <section class="promo">
            <ag-container>
                <article class="promo-article">
                    <h1>Roadmap</h1>
                    <ag-progress :steps="[
                        {
                            id: 0,
                            title: 'Project Preparation',
                            description: 'The first ideas came up at the end of July 2018. We came together with the first core team members and discussed these ideas.',
                            completed: true
                        },
                        {
                            id: 1,
                            title: 'Website Launch',
                            description: 'The first phase of the development was focused on the website as it serves as the first impression for each user. The website uses Vue.js and is from the ground up 100% mobile-first.',
                            completed: true
                        },
                        {
                            id: 2,
                            title: 'Server Software',
                            description: 'Simultaneously we are starting to work on the 1.13 server software. We will be using the full open-source cloud Impulse and we plan on working closely with the Glowstone project.',
                        },
                        {
                            id: 3,
                            title: 'Minigames',
                            description: 'When the core development is done, the first minigames will be created based on your concepts.'
                        },
                        {
                            id: 4,
                            title: 'Building',
                            description: 'During the minigame development builders can start working on the first maps.'
                        },
                        {
                            id: 5,
                            title: 'Beta',
                            description: 'When the first minigames are finished, it\'s time to open the gates and start the first public beta.'
                        },
                        {
                            id: 6,
                            title: 'Release',
                            description: 'We believe that we can achieve the best results when we\'re not working against the clock. Therefore we will not plan any release but instead release when we think it\'s ready to be released.'
                        },
                        {
                            id: 7,
                            title: 'Improvements',
                            description: 'After the initial release we will continue to work on the project and further improve your experience.'
                        }
                    ]" style="margin: 4em 0 0 0" />
                </article>
            </ag-container>
        </section>

        <div class="gradient-background">
            <ag-container class="footer">
                <p>&copy; 2018 Aternos Games &mdash; Powered by Aternos &ndash; <a href="https://aternos.org/imprint">Imprint</a> &ndash; <a href="https://aternos.org/privacy">Privacy Policy</a></p>
            </ag-container>
        </div>

    </div>

</template>

<style lang="scss" scoped>

    @import "../style/_breakpoints";
    @import "../style/_colors";

    section.hero-content {
        display: flex;
        flex-direction: column;
        justify-content: center;
        min-height: calc(100vh - 24px);

        @include for-desktop-up {
            min-height: calc(100vh - 48px);
        }

        h1 {
            color: $light;
            font-family: metropolis;
            font-size: 50px;
            font-weight: 800;
        }

        h2 {
            color: $light;
            font-size: 19px;
            font-weight: 500;
        }
    }

    .gradient-background {
        background-image: linear-gradient(165deg, $primary, $dark-primary);
    }

    section.promo {
        background-color: #f0f0f0;
        box-shadow: 0 0 10px 1px #0003;
        // min-height: 50vh;
        padding: 3em 0;
        position: relative;
        -webkit-box-shadow: 0 0 10px 1px #0003;
    }

    .flex {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;

        div {
            margin: 0 2em;
            margin-top: 3em;
            width: calc(100% - 4em);

            @include for-tablet-landscape-up {
                width: calc(50% - 4em);
            }

            @include for-desktop-up {
                flex-grow: 1;
                width: calc(100% / 4 - 4em);
            }
        }
    }

    h4 {
        font-weight: 600;
        margin-bottom: .75em;
    }

    // section.promo {
    //     margin: 15px 0;

    //     .ag-container {
    //         background-color: #FFF;
    //         border-radius: 10px;
    //     }
    // }

    article.promo-article {
        color: $dark;
        padding: 2em 0;

        h1 {
            color: $primary;
            font-family: metropolis;
            font-size: 32px;
            font-weight: 700;
            padding-bottom: 1.5em;
        }

        h2 {
            color: $primary;
            font-family: metropolis;
            font-size: 18px;
            font-weight: 600;
            margin-top: 4em;
            text-align: center;
        }

        .svg-inline--fa {
            font-size: 20px;
            margin: 0 .75em 0 0;
            vertical-align: text-bottom;
        }
    }

    .footer {
        color: $light;

        a {
            border-bottom: 1px solid;
            color: $light;
            text-decoration: none;
        }
    }

</style>
