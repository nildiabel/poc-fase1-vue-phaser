import Phaser from 'phaser';

export class MapScene extends Phaser.Scene {
    constructor() { super('MapScene'); }

    // 1. PRELOAD: Carrega de tiles_oficina i mapa_oficina
    preload() {
        this.load.image('tiles_oficina', '/assets/tiled.png');
        this.load.tilemapTiledJSON('mapa_oficina', '/assets/mapa.json');
    }

    // 2. CREATE: construtoïm el mapa i pintem les capes en ordre
    create() {
        const map = this.make.tilemap({ key: 'mapa_oficina' });
        
        // 1r arg: nom exacte del tileset DINS de Tiled | 2n arg: clau de this.load.image()
        const tileset = map.addTilesetImage('tileset_tiled', 'tiles_oficina');
        if (!tileset) { console.error('Error: revisa el nom tileset_tiled'); return; }

        // Creem les capes de rajoles amb el nom exacte que tenen a Tiled
        const capaTerra = map.createLayer('Terra', tileset, 0, 0);
        if (map.getLayer('Mobles')) map.createLayer('Mobles', tileset, 0, 0);
        const capaParets = map.createLayer('Parets', tileset, 0, 0);

        // Deixem activades les col·lisions de paret
        capaParets?.setCollisionByProperty({ collides: true });

        // [NOU] Llegim la capa d'objectes 'Objectes' definida a Tiled
        const capaObjectes = map.getObjectLayer('Objectes');
        
        const elementsDetectats = []; // Llista per enviar a Vue en acabar el bucle

        capaObjectes?.objects.forEach((obj) => {
            const props = this.obtenirPropietats(obj); // Converteix [{name,value}] -> {clau: valor}
            
            // Tiled dona (x, y) a dalt a l'esquerra; sumem la meitat per trobar el centre
            const cx = obj.x + (obj.width || 0) / 2;
            const cy = obj.y + (obj.height || 0) / 2;

            // Si és el punt d'aparició
            if (props.tipus === 'spawn') {
                this.avatar = this.add.circle(cx, cy, 14, 0x10b981).setStrokeStyle(2, 0xffffff);
            }

            // [NOU] Si és una sala de reunions, dibuixem un rectangle semitransparent i el nom
            if (props.tipus === 'zona') {
                this.add.rectangle(cx, cy, obj.width, obj.height, 0x10b981, 0.22).setStrokeStyle(2, 0x10b981);
                this.add.text(cx, cy, props.nomSala || 'Zona', { fontSize: '13px', color: '#a7f3d0' }).setOrigin(0.5);
                elementsDetectats.push({
                    tipus: 'Zona',
                    nom: props.nomSala || 'Sense nom',
                    aforament: props.aforament
                });
            }

            // [NOU] Si és un monitor, dibuixem una icona de pantalla i el seu títol
            if (props.tipus === 'monitor') {
                this.add.rectangle(cx, cy, 28, 20, 0xf59e0b).setStrokeStyle(2, 0xffffff);
                this.add.text(cx, cy - 18, props.titol || 'Monitor', { fontSize: '12px', color: '#fde68a' }).setOrigin(0.5);
                elementsDetectats.push({ tipus: 'Monitor', nom: props.titol || 'Pantalla' });
            }
        });

        // [NOU] Emetem un esdeveniment global del joc perquè PhaserCanvas.vue el rebi
        this.game.events.emit('mapa-carregat', elementsDetectats);
    }

    // Mètode auxiliar DINS de la classe MapScene per llegir Custom Properties de Tiled
    obtenirPropietats(obj) {
        const resultat = {};
        if (obj.properties) {
            obj.properties.forEach(p => {
                resultat[p.name] = p.value;
            });
        }
        return resultat;
    }
}