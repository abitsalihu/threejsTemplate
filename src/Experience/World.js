import * as THREE from "three";
import Experience from "./Experience";
import { GroundedSkybox } from "three/addons/objects/GroundedSkybox.js";
import gsap from "gsap";

export default class World {
  constructor() {
    this.experience = new Experience();

    this.debug = this.experience.debug;
    this.size = this.experience.size;
    this.time = this.experience.time;

    this.scene = this.experience.scene;
    this.sizes = this.experience.size;
    this.resources = this.experience.resources;
    this.camera = this.experience.camera.instance;
    this.controls = this.experience.camera.controls;

    //? html
    this.buttonsCon = document.querySelector(".buttons-con");

    //? bloom

    this.bloomModels = [];

    //? elements
    this.allTables = [];

    //? environemnt
    this.params = {
      height: 1.5,
      radius: 10,
      enabled: true,
    };

    this.debugSettings = {
      objectActive: true,
      myProperty: () => {
        if (this.scene.background) {
          this.scene.background = false;
        } else {
          this.scene.background = this.environmentTexture;
        }
      },

      stopObjectRotation: () => {
        if (this.debugSettings.objectActive) {
          this.debugSettings.objectActive = false;
        } else {
          this.debugSettings.objectActive = true;
        }

        console.log(this.objectActive);
      },
    };

    //? RAYCASTER
    this.rayCaster = new THREE.Raycaster();
    this.pointer = new THREE.Vector2();

    this.intersectObjects = [];
    this.currentIntersects = null;
    this.clicked = false;

    document.addEventListener("click", (e) => {
      this.clicked = true;
    });

    window.addEventListener("mousemove", (event) => {
      this.pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
      this.pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
    });

    this.setUpScene();

    this.buttonsCon.addEventListener("click", (e) => {
      if (e.target.classList.contains("button")) {
        this.allTables.forEach((e) => {
          e.visible = false;
        });

        for (const child of this.buttonsCon.children) {
          child.classList.remove("active");
        }
      }
      if (e.target.classList.contains("table_1")) {
        this.allTables.forEach((e) => {
          if (e.name === "table_1") {
            e.visible = true;
          }
        });
        e.target.classList.add("active");
      }

      if (e.target.classList.contains("table_2")) {
        this.allTables.forEach((e) => {
          if (e.name === "table_2") {
            e.visible = true;
          }
        });
        e.target.classList.add("active");
      }

      if (e.target.classList.contains("table_3")) {
        this.allTables.forEach((e) => {
          if (e.name === "table_3") {
            e.visible = true;
          }
        });
        e.target.classList.add("active");
      }

      if (e.target.classList.contains("table_4")) {
        this.allTables.forEach((e) => {
          if (e.name === "table_4") {
            e.visible = true;
          }
        });
        e.target.classList.add("active");
      }

      if (e.target.classList.contains("table_5")) {
        this.allTables.forEach((e) => {
          if (e.name === "table_5") {
            e.visible = true;
          }
        });
        e.target.classList.add("active");
      }
    });
  }

  setUpScene() {
    this.resources.on("resourcesReady", () => {
      this.environmentTexture = this.resources.items.environmentTexture;

      this.environmentTexture.SRGBColorSpace = THREE.SRGBColorSpace;

      this.scene.environment = this.environmentTexture;

      //? fog
      // this.scene.fog = new THREE.Fog(0x000000, 10, 30);

      this.tableTest = this.resources.items.tableTest;

      this.tableTest.scene.traverse((e) => {
        // if (e.name === "camera_target-2") {
        //   console.log(e);
        //   this.controls.target.set(e.position.x, e.position.y, e.position.z);
        // }

        if (e.name === "camera_starts") {
          this.controls.target.set(e.position.x, e.position.y, e.position.z);
        }

        if (e.type === "Mesh") {
          // e.castShadow = true;
          // e.receiveShadow = true;
        }

        if (e.name.startsWith("Mesh")) {
          e.material = new THREE.MeshStandardMaterial({
            color: 0xfdfdfd,
            metalness: 0,
            roughness: 1,
          });
        }

        if (e.name.startsWith("click_apartment-1")) {
          e.material = new THREE.MeshBasicMaterial({
            color: 0x00ff00,
            transparent: true,
            opacity: 0,
          });
          this.apartmentOne = e;
          this.intersectObjects.push(e);
        }

        if (e.name.startsWith("click_apartment-2")) {
          e.material = new THREE.MeshBasicMaterial({
            color: 0xff0000,
            transparent: true,
            opacity: 0,
          });
          this.apartmentTwo = e;
          this.intersectObjects.push(e);
        }

        if (e.name.startsWith("window")) {
          e.material = new THREE.MeshStandardMaterial({
            color: 0xf5f5f5,
            transparent: true,
            opacity: 0.3,
            metalness: 1,
            roughness: 0,
            side: THREE.DoubleSide,
          });
        }

        if (e.name.startsWith("table")) {
          this.allTables.push(e);
        }
      });

      // this.allTables.forEach((e) => {
      //   e.visible = false;
      // });

      // this.allTables.forEach((e) => {
      //   if (e.name === "table_2") {
      //     e.visible = true;
      //   }
      // });

      // this.cube = new THREE.Mesh(
      //   new THREE.BoxGeometry(0.5, 0.5, 0.5),
      //   new THREE.MeshStandardMaterial({ metalness: 1, roughness: 0.2 })
      // );
      // this.cube.rotation.y = Math.PI * 1.25;
      // this.scene.add(this.cube);

      this.scene.add(this.tableTest.scene);

      // //? object inside cube
      // this.setUpLights();
      this.debugActive();

      //? camera animation

      // gsap.to(this.camera.position, {
      //   x: -0.0574511857685335,
      //   y: 1.5960710560001234,
      //   z: 2.5519760440282733,
      //   duration: 3,
      //   delay: 0.5,
      //   ease: "back.out(.5)",
      //   onComplete: () => {
      //     // this.controls.autoRotate = true;
      //     // this.controls.autoRotateSpeed = 3;
      //   },
      // });
    });
  }
  setUpLights() {
    //? lighting
    this.ambientLight = new THREE.AmbientLight(0xf5f5f5, 3);
    // this.scene.add(this.ambientLight);

    this.directionalLight = new THREE.DirectionalLight(0xffffff, 20);
    this.directionalLight.castShadow = true;
    this.directionalLight.shadow.mapSize.width = 128;
    this.directionalLight.shadow.mapSize.height = 128;

    this.directionalLight.shadow.camera.near = 10;
    this.directionalLight.shadow.camera.far = 20;
    this.directionalLight.position.set(-4.75, 9.88, 10);
    this.directionalLight.shadow.bias = -0.001; // prevents shadow acne
    this.directionalLight.shadow.radius = 4;
    this.directionalLightHelper = new THREE.CameraHelper(
      this.directionalLight.shadow.camera
    );

    this.scene.add(this.directionalLight);
  }

  setUpLoadingScreen(video) {
    this.monitor = document.createElement("video");

    this.monitor.muted = true;
    this.monitor.controls = true;
    this.monitor.playsInline = true;
    // this.monitor.autoplay = true;
    this.monitor.loop = true;
    this.monitor.currentTime = 1;
    this.monitor.allowsFullscreen = false;
    this.monitor.preload = "metadata";

    this.monitor.controlsList = "nofullscreen";
    this.monitor.src = video;
    document.querySelector("body").append(this.monitor);

    this.monitor.style.position = "fixed";
    this.monitor.style.top = 0;
    this.monitor.style.right = 0;
    this.monitor.style.zIndex = 0;
    this.monitor.style.maxWidth = "5px";
    this.monitor.style.maxHeight = "5px";
    this.monitor.style.opacity = 0;
    this.monitor.style.pointerEvents = "none";

    this.monitorTexture = new THREE.VideoTexture(this.monitor);
    this.monitorTexture.colorSpace = THREE.SRGBColorSpace;

    this.monitorTexture.flipY = false;

    return new THREE.MeshBasicMaterial({
      map: this.monitorTexture,
    });
  }

  debugActive() {
    if (this.experience.debug.active) {
      this.worldFolder = this.experience.debug.gui.addFolder("world-Debug");

      if (this.directionalLight) {
        this.worldFolder
          .add(this.directionalLight.position, "x")
          .min(-10)
          .max(10)
          .step(0.01);

        this.worldFolder
          .add(this.directionalLight.position, "y")
          .min(-10)
          .max(40)
          .step(0.01);

        this.worldFolder
          .add(this.directionalLight.position, "z")
          .min(-10)
          .max(10)
          .step(0.01);
      }
      if (this.skybox) {
        this.worldFolder
          .add(this.skybox.position, "y")
          .min(0)
          .max(2)
          .step(0.001);
      }
    }
  }

  update() {
    if (this.debugSettings.objectActive) {
    }

    //? updating points inside the scene

    if (this.rayCaster) {
      this.rayCaster.setFromCamera(this.pointer, this.camera);
      this.intersects = this.rayCaster.intersectObjects(this.intersectObjects);

      if (this.intersects.length) {
        document.body.style.cursor = "pointer";
        this.currentIntersect = this.intersects[0];

        if (this.currentIntersect.object.name.startsWith("click_apartment-2")) {
          gsap.to(this.currentIntersect.object.material, {
            opacity: 0.3,
            duration: 0.15,
            ease: "ease-out",
          });
          if (this.clicked) {
            // gsap.to(this.camera.position, {
            //   x: -7.223,
            //   y: 15.7914,
            //   z: -3.95,
            //   duration: 1.25,
            //   // ease: "power1.in",
            // });

            // gsap.to(this.camera.rotation, {
            //   x: -1.57,
            //   y: -1.706,
            //   z: -0.01,
            //   duration: 1.25,
            //   //  ease: "power1.in",
            // });
            gsap.to(this.controls.target, {
              x: -7.24,
              y: 0.9,
              z: -3.96,
              duration: 2.5,
              // ease: "power1.in",
            });
            // this.controls.target.set(-7.24894, 0.7, -3.968);
          }
        }

        if (this.currentIntersect.object.name.startsWith("click_apartment-1")) {
          gsap.to(this.currentIntersect.object.material, {
            opacity: 0.3,
            duration: 0.15,
            ease: "ease-out",
          });
        }

        //? drawer
      } else if (!this.intersects.length) {
        this.currentIntersect = null;

        document.body.style.cursor = "auto";

        if (this.apartmentOne) {
          gsap.to(this.apartmentOne.material, {
            opacity: 0,
            duration: 0.15,
            ease: "power1.out",
          });
        }
        if (this.apartmentTwo) {
          gsap.to(this.apartmentTwo.material, {
            opacity: 0,
            duration: 0.15,
            ease: "power1.out",
          });
        }
      }
    }

    this.clicked = false;
  }
}
