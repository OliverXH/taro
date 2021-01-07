import { Joint } from './Joint.js';
import { LinearLimit } from '../../../physics/LinearLimit.js';
import { SpringDamper } from '../../../physics/SpringDamper.js';
import { Vector3 } from '../../../lib/three.js';
import { OIMO } from '../../../lib/oimo.js';

export class PrismaticJoint extends Joint {

	start( data ) {

		data.type = 'prismatic';
		super.start( data );

	}

	_addDerivedProperties( data ) {

		this._axis = data.axis !== undefined ? data.axis : new Vector3( 1, 0, 0 );
		this._linkedAxis =
					data.linkedAxis !== undefined ? data.linkedAxis : new Vector3( 1, 0, 0 );

		this.springDamper = data.springDamper !== undefined
			? data.springDamper
			: new SpringDamper();
		this.linearLimit = data.linearLimit !== undefined
			? data.linearLimit
			: new LinearLimit();

	}

	_setDerivedJoint( config ) {

		config.localAxis1 = this._axis;
		config.localAxis2 = this._linkedAxis;
		config.springDamper = this.springDamper;

		config.limitMotor = this.linearLimit;
		this._ref = new OIMO.PrismaticJoint( config );

	}

	toJSON() {

		const object = super.toJSON();

		object.axis = this._axis.toArray();
		object.linkedAxis = this._linkedAxis.toArray();

		object.springDamper = this.springDamper;
		object.linearLimit = this.linearLimit;

		return object;

	}

	fromJSON( object ) {

		object = super.fromJSON( object );

		object.axis = new Vector3().fromArray( object.axis );
		object.linkedAxis = new Vector3().fromArray( object.linkedAxis );

		object.springDamper = Object.create( SpringDamper, object.springDamper );
		object.linearLimit = Object.create( LinearLimit, object.linearLimit );

		return object;

	}

}