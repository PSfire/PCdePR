import Experience from "../Experience.js"


import Room from "./Room.js";
import Floor from "./Floor.js";
import Controls from "./Controls.js";
import Environment from "./Environment.js";
import { EventEmitter } from "events";


export default class World {
    constructor(){
        this.experience = new Experience();
        this.sizes = this.experience.sizes;
        this.scene = this.experience.scene;
        this.canvas = this.experience.canvas;
        this.camera = this.experience.camera;
        this.resources = this.experience.resources;

        this.resources.on("ready", () => {
            
            this.environment = new Environment();
            this.floor = new Floor();
            this.PR = new Room();
            // this.controls = new Controls();


        });
    }

    resize(){}

    update(){
        if (this.PR) {
            this.PR.update();
        }
        if (this.controls) {
            this.controls.update();
        }
    }
        
}