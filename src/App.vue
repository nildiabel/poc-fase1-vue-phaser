<script setup>
import { onUnmounted, ref } from 'vue';
import PhaserCanvas from './components/PhaserCanvas.vue';

const zonaActiva = ref(null); // null = passadís | { nom: '...' } = dins d'una sala
const segonsZona = ref(0);
const monitorProper = ref(null);
let intervalZona = null;

function actualitzarZona(zona) {
  zonaActiva.value = zona;

  if (zona && intervalZona === null) {
    intervalZona = setInterval(() => segonsZona.value++, 1000);
  } else if (!zona) {
    clearInterval(intervalZona);
    intervalZona = null;
    segonsZona.value = 0;
  }
}

onUnmounted(() => clearInterval(intervalZona));
</script>

<template>
  <main style="display: flex; gap: 20px; padding: 20px; font-family: sans-serif;">
    <PhaserCanvas
      @canvi-zona="actualitzarZona"
      @a-prop-monitor="monitorProper = $event"
    />

    <aside style="width: 280px; background: #1e293b; color: white; padding: 18px; border-radius: 12px;">
      <h3>Estat de Proximitat</h3>
      <div v-if="zonaActiva" style="background: #065f46; border: 2px solid #10b981; padding: 14px; border-radius: 8px;">
        <strong>Dins de: {{ zonaActiva.nom }}</strong>
        <p style="margin: 6px 0 0; font-size: 13px; color: #a7f3d0;">Àudio de sala actiu (llest per Fase 4)</p>
        <p style="margin: 6px 0 0; font-size: 13px; color: #a7f3d0;">Temps a la sala: {{ segonsZona }} s</p>
      </div>
      <div v-else style="background: #334155; padding: 14px; border-radius: 8px;">
        <strong>Passadís / Zona comuna</strong>
        <p style="margin: 6px 0 0; font-size: 13px; color: #cbd5e1;">Sense conversa activa</p>
      </div>
      <p v-if="monitorProper" style="margin-top: 16px;">A prop de: {{ monitorProper.titol }}</p>
      <p style="margin-top: 16px; font-size: 12px; color: #94a3b8;">Controls: WASD o Fletxes per moure en George.</p>
    </aside>
  </main>
</template>
