import * as THREE from "three";
import Experience from "../Experience.js"
import GSAP from "gsap";


export default class Room {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.renderer = this.experience.renderer;
        this.camera = this.experience.camera;
        this.PR = this.resources.items.PR;
        this.actualPR = this.PR.scene;

        this.actualPR.position.z += 1;

  
        this.lerp = {
            current: 0,
            target: 0,
            ease: 0.1,
        };

        this.setPostProcessing();
        this.setModel();
        this.setAnimation();
        this.onmouseMove();
        
    }


    setModel(){
    
        this.actualPR.children.forEach((child) => {
            child.castShadow = true;
            child.receiveShadow = true;
            child.material.roughness = 0;
            child.material.metalness = 0.5;
            child.material.exposure = 5;


            if (child instanceof THREE.Group) {
                child.children.forEach((groupchild) => {
                    groupchild.castShadow = true;
                    groupchild.receiveShadow = true;
                  
                });
           
            }

            this.scene.add(this.actualPR);

        });

  
    }

    setPostProcessing() {

    }


    setAnimation() {
        this.mixer = new THREE.AnimationMixer(this.actualPR);

    }
 
    onmouseMove() {
        window.addEventListener("mousemove", (e) => {
            this.rotation =
                ((e.clientX - window.innerWidth / 2) * 2) / window.innerWidth;
                // console.log(e.clientX, this.rotation);
            this.lerp.target = this.rotation;
        });
    }

    resize() {}

    update() {

        this.lerp.current = GSAP.utils.interpolate(
            this.lerp.current,
            this.lerp.target,
            this.lerp.ease
        );

        this.actualPR.rotation.y = this.lerp.current;

        this.mixer.update(this.time.delta * 0.0009);
    }

}
