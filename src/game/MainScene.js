import Phaser from 'phaser';

export class MainScene extends Phaser.Scene {
  constructor() {
    super('MainScene');
  }

  create() {
    this.avatar = this.add.circle(320, 200, 24, 0x10b981);

    this.etiqueta = this.add.text(320, 160, 'Anna', {
      fontSize: '18px',
      fontFamily: 'sans-serif',
      color: '#ffffff'
    }).setOrigin(0.5);
  }

  update(time) {
    this.avatar.y = 200 + Math.sin(time * 0.004) * 8;

    this.etiqueta.setPosition(
      this.avatar.x,
      this.avatar.y - 38
    );
  }

  // Actualitzar el nom de l'avatar
  actualitzarNom(nouNom) {
    if (!this.etiqueta) return;

    this.etiqueta.setText(
      nouNom?.trim() || 'Anònim'
    );
  }
}