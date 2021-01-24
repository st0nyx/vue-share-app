import Vue from "vue";
import Vuetify from "vuetify/lib/framework";
import colors from "vuetify/es5/util/colors";

Vue.use(Vuetify);

const vuetify = new Vuetify({
  theme: {
    themes: {
      light: {
        primary: colors.teal.lighten1,
        secondary: colors.teal.lighten2,
        accent: colors.red.lighten1,
        error: colors.red.accent4,
        warning: colors.amber.base,
        info: colors.blue.accent3,
        success: colors.green.darken4
      }
    }
  }
});

export default vuetify;
