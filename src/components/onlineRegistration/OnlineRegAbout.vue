<template>
  <div class="Stud_main_container">
    <Header />
    <div class="Stud_body_container">
      <div id="about_carousel">
        <b-card
          overlay
          style=" box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);"
          :img-src="require('../../assets/images/AboutBanner.jpg') "
          img-alt="Card Image"
          text-variant="white"
            >
          </b-card>

              <!-- b-card for icons -->
            <div id="about_cards" >
                <b-card-group deck>

                  <b-card id="about_card p-3" style=" box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);" >
                    <img src="../../assets/images/vision_mission.png" img-alt="Image" id="medal"  />
                      <b-link class="Stud_about" to="/VisionMission">
                        Mission And Vision
                      </b-link>
                  </b-card>

                <b-card id="about_card p-3" style=" box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);" >
                  <img src="../../assets/images/achievement.png" img-alt="Image" id="medal" img-top />
                  <b-card-text>
                    <b-link class="Stud_about" to="/Achievements">
                      School Achievements
                    </b-link>
                  </b-card-text>
                </b-card>

                <b-card id="about_card p-3" style=" box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);" >
                  <img src="../../assets/images/event.png" img-alt="Image" id="medal" img-top />
                  <b-link class="Stud_about" to="/Events">
                    School Events
                  </b-link>
                </b-card>
              </b-card-group>
          </div>

        </div>
      </div>
      <Footer />
    </div>
</template>

<script>
    import Header from "./OnlineRegHeader.vue";
    import Footer from "./OnlineRegFooter.vue";
    export default {
      name: 'OnlineRegAbout',
      components:{
        Header,
        Footer
      },
        data() {
            return {
              // This data is for accordion(learn more)
              visible: false,
              slide: true,
              sliding: null,
            }
        },
        methods: {
          onSlideStart(slide) {
            this.sliding = true
          },
          onSlideEnd(slide) {
            this.sliding = false
            }
          },
        }
</script>
