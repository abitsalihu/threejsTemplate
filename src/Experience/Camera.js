import Experience from "./Experience";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export default class Camera {
  constructor() {
    this.experience = new Experience();

    this.debug = this.experience.debug;

    this.canvas = this.experience.canvas;
    this.scene = this.experience.scene;
    this.size = this.experience.size;
    this.fov = {
      x: this.size.width > 678 ? 45 : 75,
    };

    this.setInstance();
    // this.setOrthographic();
    this.setControls();

    if (this.debug.active) {
      // this.debugActive();
    }

    this.updateCameraFrustum(this.instance, this.size.aspect);

    //? activate this when you want to find the position of the camera when you want to animate it
    document.addEventListener("click", () => {
      console.log(
        this.instance.position.x,
        this.instance.position.y,
        this.instance.position.z
      );

      // console.log(
      //   this.instance.rotation.x,
      //   this.instance.rotation.y,
      //   this.instance.rotation.z
      // );
    });
  }

  setInstance() {
    this.instanceGroup = new THREE.Group();
    this.scene.add(this.instanceGroup);
    this.instance = new THREE.PerspectiveCamera(
      this.fov.x,
      this.size.width / this.size.height,
      0.01,
      1000
    );

    this.cameraFar = 11;

    this.instance = new THREE.OrthographicCamera(
      -this.cameraFar * this.size.aspect,
      this.cameraFar * this.size.aspect,
      this.cameraFar,
      -this.cameraFar,
      0.1,
      100
    );
    // -7.248939090851262 13.99950309849782 -11.083858577302912
    // -1.5, -4.03, -0.00
    // this.instanceGroup.add(this.instance);

    // this.instance.position.set(0, 5, 7);
    this.instance.position.set(-8.6043, 10.6945, 3.2411);

    this.instance.rotation.set(-0.74, -0.5511, -0.44);

    // this.instance.position.set(1.45, 7.99, -7.99);
    // 0.40848348008969954 2this.cameraFar05625301091577 -6.773230756341332
    // 0.010910651467553371 0.9522850968479317 2.6695133200605206
  }

  setControls() {
    this.controls = new OrbitControls(this.instance, this.canvas);
    this.controls.enableDamping = true;

    // this.controls.target.set(0, 0, -8);

    //? controls limitations

    // this.controls.minDistance = 1;
    // this.controls.maxDistance = 3;

    this.controls.minPolarAngle = -Math.PI * 0.1; // radians
    this.controls.maxPolarAngle = Math.PI / 2; // radians

    // this.controls.minAzimuthAngle = -0.1;
    // this.controls.maxAzimuthAngle = Math.PI * 0.55;

    //? set control target -- what to orbit around
    // this.controls.target.set(-0.893815, 1.26713, -1.19338);
  }

  updateCameraFrustum(camera, aspect) {
    // base zoom for desktop
    let zoom = 11;

    if (window.innerWidth < 1200) zoom = 13;
    if (window.innerWidth < 992) zoom = 14;
    if (window.innerWidth < 768) zoom = 15;
    if (window.innerWidth < 576) zoom = 28;

    camera.left = -zoom * aspect;
    camera.right = zoom * aspect;
    camera.top = zoom;
    camera.bottom = -zoom;
    camera.updateProjectionMatrix();
  }

  resize() {
    this.aspect = this.size.width / this.size.height;

    // this.instance.left = -7 * this.aspect;
    // this.instance.right = 7 * this.aspect;
    // this.instance.top = 7;
    // this.instance.bottom = -7;
    // this.orthographicCamera.aspect = this.size.width / this.size.height;
    // this.instance.updateProjectionMatrix();

    this.updateCameraFrustum(this.instance, this.size.aspect);
    // this.orthographicCamera.updateProjectionMatrix();
  }

  debugActive() {
    this.cameraDebug = this.debug.gui.addFolder("camera");

    this.cameraDebug
      .add(this.instance.position, "x")
      .min(-50)
      .max(50)
      .step(0.001)
      .name("cameraX");
    this.cameraDebug
      .add(this.instance.position, "y")
      .min(-50)
      .max(50)
      .step(0.001)
      .name("cameraY");
    this.cameraDebug
      .add(this.instance.position, "z")
      .min(-50)
      .max(50)
      .step(0.001)
      .name("cameraZ");
    this.cameraDebug
      .add(this.fov, "x")
      .min(0)
      .max(100)
      .step(0.001)
      .name("cameraFOV")
      .onFinishChange(() => {
        this.instance.fov = this.fov.x;
        this.instance.aspect = this.size.width / this.size.height;
        this.instance.updateProjectionMatrix();
      });
  }

  update() {
    // console.log(this.controls);
    this.controls.update();
  }
}
