import { WebGLRenderer } from '../lib/three.js';

export class Renderer extends WebGLRenderer {

	constructor( parameters ) {

		super( parameters );

		this.cameras = [];
		this.setPixelRatio( window.devicePixelRatio );
		this._onResize();

		new ResizeObserver( () => this._onResize() ).observe( this.domElement );

	}

	_onResize() {

		const canvas = this.domElement;
		this.setSize( canvas.clientWidth, canvas.clientHeight, false );

		for ( let i = 0, len = this.cameras.length; i < len; i ++ ) {

			const camera = this.cameras[ i ];
			camera._updateRegion( canvas );

		}

	}

	render() {

		for ( let i = 0, len = this.cameras.length; i < len; i ++ ) {

			const camera = this.cameras[ i ];

			this.setViewport( camera._region );
			this.setScissor( camera._region );
			this.setScissorTest( true );

			this.render( this.scene, camera );

		}

	}

}
