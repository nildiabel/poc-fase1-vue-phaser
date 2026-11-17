<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue';
import Phaser from 'phaser';
import { MainScene } from '../game/MainScene';

// Rep les dades d'App.vue per sincronitzar-les amb l'escena.
const props = defineProps(['nomUsuari', 'colorAvatar', 'estatAvatar', 'pausat']);
const contenidor = ref(null);
let game = null;

const sincronitzarEscena = () => {
  const escena = game?.scene.getScene('MainScene');
  if (!escena?.sys.isActive()) return;

  escena.actualitzarNom(props.nomUsuari);
  escena.actualitzarColor(props.colorAvatar);
  escena.actualitzarEstat(props.estatAvatar);

  if (props.pausat) {
    escena.scene.pause();
  } else {
    escena.scene.resume();
  }
};

onMounted(() => {
  game = new Phaser.Game({
    type: Phaser.AUTO,
    width: 640,
    height: 400,
    backgroundColor: '#1e293b',
    parent: contenidor.value,
    scene: [MainScene]
  });

  // Sincronitza els valors inicials quan Phaser ja està preparat.
  game.events.once('ready', sincronitzarEscena);
});

onUnmounted(() => game?.destroy(true));

// Al mateix nivell que onMounted per observar els canvis de props.
watch(() => [props.nomUsuari, props.colorAvatar, props.estatAvatar, props.pausat], sincronitzarEscena);
</script>

<template>
  <div ref="contenidor"></div>
</template>

