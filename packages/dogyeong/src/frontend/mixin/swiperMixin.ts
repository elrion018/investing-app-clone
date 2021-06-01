export default ({ fetchData }) => ({
  created() {
    this.fetchData();
  },

  methods: {
    fetchData,

    handleHeaderNavClick(id) {
      const { index } = this.navRoutes.find((route) => route.id === id);
      this.currentNavId = id;
      this.slideTo(index);
    },

    handleEndSlide({ activeIndex }) {
      const { id } = this.navRoutes.find((route) => route.index === activeIndex);
      this.currentNavId = id;
      this.fetchData();
    },

    slideTo(index) {
      this.$refs.swiper.slideTo(index);
      this.fetchData();
    },
  },
});