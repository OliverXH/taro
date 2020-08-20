import { Collider } from "./Collider.js";

class CapsuleCollider extends Collider {
	init(data) {
		data.type = "capsule";
		super.init(data);
	}
}

export { CapsuleCollider };