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

    this.cameraTargetOne;

    //? html
    this.buttonsCon = document.querySelector(".buttons-con");

    this.changeFloor = document.querySelector(".changeFloor");

    //? bloom

    this.bloomModels = [];

    //? elements
    this.allOverlays = [];

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
        for (const child of this.buttonsCon.children) {
          child.classList.remove("active");
        }
      }
      if (e.target.classList.contains("table_1")) {
        this.hideOverlays();
        this.allOverlays.forEach((e) => {
          if (e.name === "click_apartment-1") {
            gsap.to(e.material, {
              opacity: 0.45,
              duration: 1,
              yoyo: true,
              // ease: "power1",
              repeat: -1,
            });

            // this.controls.enabled = false;

            // gsap.to(this.camera.position, {
            //   x: -8.240661191766751,
            //   // y: 11,
            //   z: -10.7,
            //   duration: 1.5,
            //   ease: "power2.inOut",
            // });

            // gsap.to(this.camera.rotation, {
            //   x: -Math.PI / 2,
            //   y: 0,
            //   z: 0,
            //   duration: 1.5,
            //   ease: "power2.inOut",
            // });

            // -8.240661191766751 24.994768461445943 -10.748515006545466

            // gsap.to(this.controls.target, {
            //   x: this.cameraTargetOne.position.x,
            //   y: 11,
            //   z: this.cameraTargetOne.position.z,
            //   duration: 1,
            //   onComplete: () => {
            //     this.controls.enabled = true;
            //   },
            // });
          }
        });

        e.target.classList.add("active");
      }

      if (e.target.classList.contains("table_2")) {
        this.hideOverlays();

        this.allOverlays.forEach((e) => {
          if (e.name === "click_apartment-2") {
            gsap.to(e.material, {
              opacity: 0.45,
              duration: 1,
              yoyo: true,
              repeat: -1,
            });

            // console.log(this.cameraTargetTwo);
            // this.controls.enabled = false;

            // gsap.to(this.controls.target, {
            //   x: this.cameraTargetTwo.position.x,
            //   y: this.cameraTargetTwo.position.y,
            //   z: this.cameraTargetTwo.position.z,
            //   duration: 1,
            // });
          }
        });
        e.target.classList.add("active");
      }

      if (e.target.classList.contains("table_3")) {
        this.hideOverlays();

        this.allOverlays.forEach((e) => {
          if (e.name === "click_apartment-3") {
            gsap.to(e.material, {
              opacity: 0.45,
              duration: 1,
              yoyo: true,
              repeat: -1,
            });

            gsap.to(this.controls.target, {
              x: this.cameraTargetThree.position.x,
              y: this.cameraTargetThree.position.y,
              z: this.cameraTargetThree.position.z,
              duration: 1,
            });
          }
        });
        e.target.classList.add("active");
      }

      if (e.target.classList.contains("table_4")) {
        this.hideOverlays();

        this.allOverlays.forEach((e) => {
          if (e.name === "click_apartment-4") {
            gsap.to(e.material, {
              opacity: 0.45,
              duration: 1,
              yoyo: true,
              repeat: -1,
            });

            gsap.to(this.controls.target, {
              x: this.cameraTargetFour.position.x,
              y: this.cameraTargetFour.position.y,
              z: this.cameraTargetFour.position.z,
              duration: 1,
            });
          }
        });
        e.target.classList.add("active");
      }

      if (e.target.classList.contains("table_5")) {
        this.hideOverlays();

        this.allOverlays.forEach((e) => {
          if (e.name === "click_apartment-5") {
            gsap.to(e.material, {
              opacity: 0.45,
              duration: 1,
              yoyo: true,

              repeat: -1,
            });

            gsap.to(this.controls.target, {
              x: this.cameraTargetFive.position.x,
              y: this.cameraTargetFive.position.y,
              z: this.cameraTargetFive.position.z,
              duration: 1,
            });
          }
        });
        e.target.classList.add("active");
      }

      if (e.target.classList.contains("table_6")) {
        this.hideOverlays();

        this.allOverlays.forEach((e) => {
          if (e.name === "click_apartment-6") {
            gsap.to(e.material, {
              opacity: 0.45,
              duration: 1,
              yoyo: true,

              repeat: -1,
            });

            gsap.to(this.controls.target, {
              x: this.cameraTargetSix.position.x,
              y: this.cameraTargetSix.position.y,
              z: this.cameraTargetSix.position.z,
              duration: 1,
            });
          }
        });
        e.target.classList.add("active");
      }

      if (e.target.classList.contains("table_7")) {
        this.hideOverlays();

        this.allOverlays.forEach((e) => {
          if (e.name === "click_apartment-7") {
            gsap.to(e.material, {
              opacity: 0.45,
              duration: 1,
              yoyo: true,

              repeat: -1,
            });

            gsap.to(this.controls.target, {
              x: this.cameraTargetSeven.position.x,
              y: this.cameraTargetSeven.position.y,
              z: this.cameraTargetSeven.position.z,
              duration: 1,
            });
          }
        });
        e.target.classList.add("active");
      }
    });

    this.changeFloor.addEventListener("click", (e) => {
      e.preventDefault();
      // if (this.floorJoined.visible) {
      //   this.floorJoined.visible = false;
      //   this.floorPlan.visible = true;
      // } else {
      //   this.floorJoined.visible = true;
      //   this.floorPlan.visible = false;
      // }
    });
  }

  setUpScene() {
    this.resources.on("resourcesReady", () => {
      this.environmentTexture = this.resources.items.environmentTexture;
      this.environmentTexture.SRGBColorSpace = THREE.SRGBColorSpace;
      this.scene.environment = this.environmentTexture;

      this.tableTest = this.resources.items.tableTest;
      this.tableTest.scene.traverse((e) => {
        if (e.name === "camera_starts") {
          this.controls.target.set(e.position.x, e.position.y, e.position.z);
        }
        if (e.name.startsWith("camera_target-1")) {
          this.cameraTargetOne = e;
        }
        if (e.name.startsWith("camera_target-2")) {
          this.cameraTargetTwo = e;
        }
        if (e.name.startsWith("camera_target-3")) {
          this.cameraTargetThree = e;
        }
        if (e.name.startsWith("camera_target-4")) {
          this.cameraTargetFour = e;
        }
        if (e.name.startsWith("camera_target-5")) {
          this.cameraTargetFive = e;
        }
        if (e.name.startsWith("camera_target-6")) {
          this.cameraTargetSix = e;
        }
        if (e.name.startsWith("camera_target-7")) {
          this.cameraTargetSeven = e;
        }

        if (e.type === "Mesh") {
          // e.castShadow = true;
          // e.receiveShadow = true;

          if (e.name.startsWith("floormap")) {
            this.floorPlan = e;
          }
        }

        if (e.name.startsWith("click_apartment-1")) {
          e.material = new THREE.MeshBasicMaterial({
            color: 0x00ff00,
            transparent: true,
            opacity: 0,
          });

          this.allOverlays.push(e);
        }

        if (e.name.startsWith("click_apartment-2")) {
          e.material = new THREE.MeshBasicMaterial({
            color: 0xff0000,
            transparent: true,
            opacity: 0,
          });

          this.allOverlays.push(e);
        }

        if (e.name.startsWith("click_apartment-3")) {
          e.material = new THREE.MeshBasicMaterial({
            color: 0x0000ff,
            transparent: true,
            opacity: 0,
          });

          this.allOverlays.push(e);
        }

        if (e.name.startsWith("click_apartment-4")) {
          e.material = new THREE.MeshBasicMaterial({
            color: 0xfeee91,
            transparent: true,
            opacity: 0,
          });

          this.allOverlays.push(e);
        }

        if (e.name.startsWith("click_apartment-5")) {
          e.material = new THREE.MeshBasicMaterial({
            color: 0xe2852e,
            transparent: true,
            opacity: 0,
          });

          this.allOverlays.push(e);
        }
        if (e.name.startsWith("click_apartment-6")) {
          e.material = new THREE.MeshBasicMaterial({
            color: 0x62109f,
            transparent: true,
            opacity: 0,
          });
          this.allOverlays.push(e);
        }

        if (e.name.startsWith("click_apartment-7")) {
          e.material = new THREE.MeshBasicMaterial({
            color: 0xff33a8,
            transparent: true,
            opacity: 0,
          });
          this.allOverlays.push(e);
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
      });

      this.scene.add(this.tableTest.scene);

      this.debugActive();
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

  hideOverlays() {
    // this.allOverlays.forEach((e) => {
    //   e.material.opacity = 0;
    // });

    this.allOverlays.forEach((e) => {
      gsap.killTweensOf(e.material);
      e.material.opacity = 0;
      e.material.opacity = 0;
    });
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

        // if (this.currentIntersect.object.name.startsWith("click_apartment-2")) {
        //   gsap.to(this.currentIntersect.object.material, {
        //     opacity: 0.3,
        //     duration: 0.15,
        //     ease: "ease-out",
        //   });
        //   if (this.clicked) {
        //     // gsap.to(this.camera.position, {
        //     //   x: -7.223,
        //     //   y: 15.7914,
        //     //   z: -3.95,
        //     //   duration: 1.25,
        //     //   // ease: "power1.in",
        //     // });

        //     // gsap.to(this.camera.rotation, {
        //     //   x: -1.57,
        //     //   y: -1.706,
        //     //   z: -0.01,
        //     //   duration: 1.25,
        //     //   //  ease: "power1.in",
        //     // });
        //     gsap.to(this.controls.target, {
        //       x: -7.24,
        //       y: 0.9,
        //       z: -3.96,
        //       duration: 2.5,
        //       // ease: "power1.in",
        //     });
        //     // this.controls.target.set(-7.24894, 0.7, -3.968);
        //   }
        // }

        // if (this.currentIntersect.object.name.startsWith("click_apartment-1")) {
        //   gsap.to(this.currentIntersect.object.material, {
        //     opacity: 0.3,
        //     duration: 0.15,
        //     ease: "ease-out",
        //   });
        // }

        //? drawer
      } else if (!this.intersects.length) {
        this.currentIntersect = null;

        document.body.style.cursor = "auto";

        // if (this.apartmentOne) {
        //   gsap.to(this.apartmentOne.material, {
        //     opacity: 0,
        //     duration: 0.15,
        //     ease: "power1.out",
        //   });
        // }
        // if (this.apartmentTwo) {
        //   gsap.to(this.apartmentTwo.material, {
        //     opacity: 0,
        //     duration: 0.15,
        //     ease: "power1.out",
        //   });
        // }
      }
    }

    this.clicked = false;
  }
}
