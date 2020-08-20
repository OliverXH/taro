import { Euler } from "../math/Euler.js";
import { Vector3 } from "../math/Vector3.js";

class Transform {
	init(data) {
		this._position = "position" in data ? data.position : new Vector3();
		this._rotation = "rotation" in data ? data.rotation : new Euler();
		this._scale = "scale" in data ? data.scale : new Vector3(1, 1, 1);
	}
	getPosition() {
		return this._position.clone();
	}
	setPosition(x, y, z) {
		this._position.set(x, y, z);
		if ("_physicsRef" in this.entity)
			this.entity._physicsRef.setPosition(this._position);
	}
	getRotation() {
		return this._rotation.clone();
	}
	setRotation(x, y, z) {
		this._rotation.set(x, y, z);
		if ("_physicsRef" in this.entity)
			this.entity._physicsRef.setRotationXyz(this._rotation);
	}
	getScale() {
		return this._scale.clone();
	}
	setScale(x, y, z) {
		this._scale.set(x, y, z);
		// collider
	}
}

export { Transform };