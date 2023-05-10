import * as THREE from "three";
import Experience from "./Experience.js";
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { GlitchPass } from 'three/addons/postprocessing/GlitchPass.js';

export default class Postpro {
    constructor() {
        this.experience = new Experience();
        this.sizes = this.experience.sizes;
        this.scene = this.experience.scene;
        this.canvas = this.experience.canvas;

        this.composer = new EffectComposer(this.experience.renderer);
        this.composer.addPass(new RenderPass(this.scene, this.experience.camera));
    
        const dotScreenPass = new ShaderPass(DotScreenShader);
        dotScreenPass.uniforms.scale.value = 4;
        this.composer.addPass(dotScreenPass);
    
        this.resize();

    }


    resize() {
        this.composer.setSize(window.innerWidth, window.innerHeight);
    }
  

    update() {

    }
}