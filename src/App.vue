<script setup>
import { ref } from 'vue';
// Importem el component pont que conté el <canvas> de Phaser
import PhaserCanvas from './components/PhaserCanvas.vue';

// Variable reactiva que guarda el nom escrit a la caixa de text
const nom = ref('Anna');
const colorAvatar = ref('#10b981');
const estatAvatar = ref('Disponible');
// Booleà per muntar/desmuntar el joc i verificar onMounted / onUnmounted
const mostrarJoc = ref(true);
const jocPausat = ref(false);
</script>

<template>
  <main class="contenidor-app">
    <!-- Tota la interfície d'usuari (inputs, botons) es fa en HTML/CSS dins de Vue -->
    <div class="controls">
      <input v-model="nom" placeholder="Escriu el teu nom d'usuari..." />
      <button @click="mostrarJoc = !mostrarJoc">
        {{ mostrarJoc ? 'Amaga el llenç' : 'Mostra el llenç' }}
      </button>
      <button @click="jocPausat = !jocPausat">
        {{ jocPausat ? 'Reprèn el joc' : 'Pausa el joc' }}
      </button>
    </div>

    <div class="controls controls--extras">
      <label>
        Color de l'avatar:
        <input type="color" v-model="colorAvatar" />
      </label>

      <label>
        Estat:
        <select v-model="estatAvatar">
          <option value="Disponible">Disponible</option>
          <option value="Ocupat">Ocupat</option>
          <option value="Absent">Absent</option>
        </select>
      </label>
    </div>

    <!-- Passem les dades cap a PhaserCanvas i controlem el cicle amb v-if -->
    <PhaserCanvas
      v-if="mostrarJoc"
      :nomUsuari="nom"
      :colorAvatar="colorAvatar"
      :estatAvatar="estatAvatar"
      :pausat="jocPausat"
    />
  </main>
</template>
