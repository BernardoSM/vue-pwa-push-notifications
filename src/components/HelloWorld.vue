<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-img
          :src="require('../assets/logo.svg')"
          class="my-3"
          contain
          height="200"
        />
      </v-col>

      <v-col class="mb-4 text-center">
        <h1 class="display-2 font-weight-bold mb-3">Wepipe App 2</h1>

        <p class="subheading font-weight-regular">
          For help and collaboration with other Vuetify developers,
          <br />please join our online
          <a href="https://community.vuetifyjs.com" target="_blank"
            >Discord Community</a
          >
        </p>
        <p id="register">0000</p>
        <v-btn
          v-if="showInstall"
          @click="hideInstallPromotion"
          class="primary text-center"
          id="install"
        >
          Install app
        </v-btn>
      </v-col>
      <v-dialog v-model="dialog" max-width="290">
        <v-card>
          <v-card-title class="text-h5"> Nova versão disponível! </v-card-title>
          <v-card-text> Clique em aceitar e instale agora :D </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="updateVersion">
              Aceitar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "HelloWorld",
  data: () => ({
    defferedPrompt: null,
    showInstall: false,
    dialog: false,
    registration: null,
  }),
  methods: {
    updateVersion() {
      this.dialog = false;
      if (this.registration || this.registration.waiting) {
        this.registration.waiting.postMessage({ type: "SKIP_WAITING" });
        window.location.reload();
      }
    },
    showNewVersionDialog(e) {
      this.registration = e.detail;
      this.dialog = true;
    },
    showInstallPromotion() {
      this.showInstall = true;
    },
    async hideInstallPromotion() {
      // Mostra prompt de instalação
      this.deferredPrompt.prompt();
      // Espera usuário responder ao prompt
      const { outcome } = await this.deferredPrompt.userChoice;
      // Opcionalmente, enviar evento analytics com resultado da escolha do usuário
      console.log(`User response to the install prompt: ${outcome}`);
      // Usamos o prompt e não podemos usar de novo; jogue fora
      this.deferredPrompt = null;
    },
  },
  created() {
    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault();
      this.deferredPrompt = e;
      this.showInstallPromotion();
      console.log(`'beforeinstallprompt' event was fired.`);
    });
    document.addEventListener(
      "serviceWorkerUpdateEvent",
      this.showNewVersionDialog,
      {
        once: true,
      }
    );
  },
  destroyed() {
    window.removeEventListener("beforeinstallprompt");
  },
};
</script>

<style lang="scss">
#register {
  word-break: break-all;
}
</style>
