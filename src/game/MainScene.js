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

    this.estatText = this.add.text(320, 245, 'Disponible', {
      fontSize: '15px',
      fontFamily: 'sans-serif',
      color: '#d1fae5'
    }).setOrigin(0.5);
  }

  update(time) {
    this.avatar.y = 200 + Math.sin(time * 0.004) * 8;

    this.etiqueta.setPosition(
      this.avatar.x,
      this.avatar.y - 38
    );

    this.estatText.setPosition(
      this.avatar.x,
      this.avatar.y + 38
    );
  }

  // Actualitzar el nom de l'avatar
  actualitzarNom(nouNom) {
    if (!this.etiqueta) return;

    this.etiqueta.setText(
      nouNom?.trim() || 'Anònim'
    );
  }

  actualitzarColor(hexColor) {
    if (!this.avatar) return;

    const color = hexColor || '#10b981';
    this.avatar.setFillStyle(Phaser.Display.Color.HexStringToColor(color).color);
  }

  actualitzarEstat(nouEstat) {
    if (!this.estatText) return;

    const estat = nouEstat || 'Disponible';
    this.estatText.setText(estat);

    if (estat === 'Disponible') {
      this.estatText.setColor('#d1fae5');
      return;
    }

    if (estat === 'Ocupat') {
      this.estatText.setColor('#fef3c7');
      return;
    }

    this.estatText.setColor('#fecaca');
  }
}